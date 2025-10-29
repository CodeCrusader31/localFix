


from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from flask_cors import CORS
import requests
import re
import json

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb+srv://niteshwarkr2056:Nikku1414@cluster0.fv4q5yd.mongodb.net/localFix?retryWrites=true&w=majority")
db = client["localFix"]
users_collection = db["users"]

# Ollama Configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma3:1b"
OLLAMA_TIMEOUT = 15 

class LocalFixChatbot:
    def __init__(self):
        # 🛠️ Available services on your website
        self.website_services = [
            "plumbing", "electrical", "carpentry", "painting", "cleaning",
            "appliance repair", "AC repair", "car mechanic", "home renovation",
            "pest control", "moving services", "gardening", "computer repair"
        ]
        
        # ℹ️ Website information
        self.website_info = {
            "about": "LocalFix is a trusted platform connecting customers with verified local service providers across India. We ensure quality, reliability, and customer satisfaction.",
            "features": [
                "Verified service providers",
                "Transparent pricing",
                "Customer reviews and ratings",
                "Quick booking",
                "24/7 customer support",
                "Service guarantee"
            ],
            "working_process": [
                "Select your service",
                "Choose a provider",
                "Book appointment",
                "Get service done",
                "Make payment",
                "Provide feedback"
            ],
            "cities_covered": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"]
        }

    # def query_ollama(self, prompt, context=""):
    #     """Enhanced Ollama query with better context handling"""
    #     try:
    #         full_prompt = f"""
    #         {context}
            
    #         User Question: {prompt}
            
    #         Important: If this question is NOT about home services, repairs, maintenance, tools, or local service providers, 
    #         respond with exactly: "I don't have information regarding this, but if you need help with local services I am here to help you."
            
    #         Otherwise, provide helpful information about the topic.
    #         """
            
    #         response = requests.post(
    #             OLLAMA_URL,
    #             json={
    #                 "model": OLLAMA_MODEL, 
    #                 "prompt": full_prompt, 
    #                 "stream": False,
    #                 "options": {"temperature": 0.3}
    #             },
    #             timeout=30
    #         )
    #         data = response.json()
    #         return self._filter_response(data.get("response", ""))
    #     except Exception as e:
    #         print("❌ Ollama query error:", e)
    #         return "I'm currently unable to process your request. Please try again later."

    def query_ollama(self, prompt, context=""):
        """Enhanced Ollama query with timeout handling"""
        try:
            full_prompt = f"""
            {context}
        
            User Question: {prompt}
        
            Important: Keep responses concise and under 150 words. 
            If this is NOT about home services, respond with exactly: 
            "I don't have information regarding this, but if you need help with local services I am here to help you."
            """
        
            response = requests.post(
                OLLAMA_URL,
                json={
                    "model": OLLAMA_MODEL, 
                    "prompt": full_prompt, 
                    "stream": False,
                    "options": {
                        "temperature": 0.3,
                        "num_predict": 200,  # Limit response length
                        "top_k": 40
                    }
                },
                timeout=OLLAMA_TIMEOUT  # Use reduced timeout
            )
            data = response.json()
            return self._filter_response(data.get("response", ""))
        except requests.exceptions.Timeout:
            print("⏰ Ollama timeout - using fallback response")
            return self._get_fallback_response(prompt)
        except Exception as e:
            print("❌ Ollama query error:", e)
            return self._get_fallback_response(prompt)

    def _filter_response(self, response):
        """Filter responses to stay within website context"""
        # If response contains the exact phrase we want, keep it
        if "i don't have information regarding this" in response.lower():
            return response
        
        # For other cases, check if it's unrelated
        unrelated_keywords = [
            "pizza", "restaurant", "movie", "music", "sports", "politics", "weather",
            "stock", "celebrity", "game", "entertainment", "food", "recipe", "travel"
        ]
        
        if any(keyword in response.lower() for keyword in unrelated_keywords):
            return "I don't have information regarding this, but if you need help with local services I am here to help you."
        
        return response

    def extract_service_info(self, query):
        """Improved: Extract service type and location with more accuracy"""
        query = query.lower()

    # FIXED: Map to exact service categories as stored in database
        service_mapping = {
            'plumber': 'plumber', 'plumbing': 'plumber', 'pipe': 'plumber', 'leak': 'plumber',
            'electrician': 'electrician', 'electrical': 'electrician', 'fan': 'electrician', 'wiring': 'electrician', 'switch': 'electrician',
            'carpenter': 'carpenter', 'carpentry': 'carpenter', 'wood': 'carpenter', 'furniture': 'carpenter',
            'painter': 'painter', 'painting': 'painter', 'wall': 'painter',
            'clean': 'cleaner', 'cleaning': 'cleaner', 'maid': 'cleaner', 'housekeeping': 'cleaner',
            'ac': 'ac repair', 'cooler': 'ac repair', 'refrigerator': 'appliance repair',
            'tv': 'appliance repair', 'machine': 'appliance repair',
            'mechanic': 'car mechanic', 'car': 'car mechanic', 'bike': 'car mechanic',
            'computer': 'computer repair', 'laptop': 'computer repair', 'pc': 'computer repair'
        }

    # Detect service type
        service_type = None
        for key, value in service_mapping.items():
            if key in query:
                service_type = value
                break

        # FIXED: Detect location with more comprehensive Indian cities and states
        cities_pattern = r"(delhi|mumbai|bangalore|chennai|hyderabad|kolkata|pune|ahmedabad|jaipur|lucknow|indore|patna|bhopal|noida|gurgaon|chandigarh|bihar|up|uttar pradesh|maharashtra|karnataka|tamil nadu|west bengal|gujarat|rajasthan)"
        location_match = re.search(cities_pattern, query)
        location = location_match.group(1) if location_match else None

        print(f"🎯 Extracted Service: {service_type}, Location: {location}")
        return service_type, location


    def search_mongodb(self, query):
        """Improved: More flexible MongoDB search with proper location filtering"""
        query_lower = query.lower()
        print(f"🔍 Searching MongoDB for: '{query_lower}'")

        service_type, location = self.extract_service_info(query_lower)
    
        # Debug: Print what we're searching for
        print(f"🎯 Searching for: service='{service_type}', location='{location}'")

        try:
            # Build base query
            query_filter = {"role": "serviceProvider"}
        
            if service_type:
                query_filter["serviceCategory"] = {"$regex": service_type, "$options": "i"}
        
            print(f"📦 Initial MongoDB Filter: {query_filter}")

            # Get all providers matching service type
            providers = list(users_collection.find(query_filter).limit(20))
        
            if not providers:
                print("❌ No providers found for service type")
                return f"🔍 Sorry, no {service_type or 'service'} providers found. Please try a different service category."

            # FIXED: Filter by location if specified
            if location:
                # Filter providers by location (check both city and serviceArea fields)
                location_providers = []
                for provider in providers:
                    provider_city = provider.get('city', '').lower()
                    provider_service_area = provider.get('serviceArea', '').lower()
                
                    # Check if provider matches the requested location
                    if (location in provider_city or 
                        location in provider_service_area or
                        provider_city in location or
                        provider_service_area in location):
                        location_providers.append(provider)
            
                providers = location_providers
                print(f"📍 Filtered to {len(providers)} providers in {location}")

            if not providers:
                print("❌ No providers found in specified location")
                return f"🔍 Sorry, no {service_type or 'service'} providers found in {location}. Please try a nearby city or different location."

        # ✅ Build formatted response - only show providers that match the criteria
            response = f"🔧 **{len(providers)} {service_type.title() if service_type else 'Service'} Providers found"
            if location:
                response += f" in {location.title()}"
            else:
                response += " in your area"
            response += ":**\n\n"
        
            for i, provider in enumerate(providers, 1):
                name = provider.get('fullName', 'Unknown')
                service = provider.get('serviceCategory', 'General Service').title()
                city = provider.get('city', 'Location not specified')
                service_area = provider.get('serviceArea', '')
                exp = provider.get('experience', 'N/A')
                phone = provider.get('phone', 'Not available')
                avail = "✅ Available" if provider.get('availability', True) else "📅 Check Availability"

                response += f"**{i}. {name}** — {service}\n"
                # Show both city and service area if available
                location_display = city
                if service_area and service_area.lower() != city.lower():
                    location_display += f" ({service_area})"
                    response += f"📍 {location_display} | ⭐ {exp} yrs | 📞 {phone}\n{avail}\n\n"

            response += "💡 Tip: Contact them directly to confirm pricing & timings."
            return response

        except Exception as e:
            print(f"❌ MongoDB query error: {e}")
            return "⚠️ Error fetching provider data. Please try again later."

    def _handle_website_queries(self, query):
        """Handle queries about website content and services"""
        # Services offered
        if any(phrase in query for phrase in ["what services", "which services", "available services", "services you have"]):
            services_list = "\n".join([f"• {service.title()}" for service in self.website_services])
            return f"🔧 **Services Available on LocalFix:**\n{services_list}\n\nYou can book any of these services through our website or app!"

        # About LocalFix
        if any(phrase in query for phrase in ["what is localfix", "about localfix", "tell me about"]):
            features = "\n".join([f"• {feature}" for feature in self.website_info["features"]])
            return f"🏠 **About LocalFix:**\n{self.website_info['about']}\n\n**Key Features:**\n{features}"

        # How it works
        if any(phrase in query for phrase in ["how it works", "working process", "how to book"]):
            steps = "\n".join([f"{i+1}. {step}" for i, step in enumerate(self.website_info["working_process"])])
            return f"📋 **How LocalFix Works:**\n{steps}"

        # Cities covered
        if any(phrase in query for phrase in ["cities", "locations", "areas covered", "where available"]):
            cities = ", ".join(self.website_info["cities_covered"])
            return f"📍 **Cities We Serve:**\n{cities}\n\nWe're expanding to more cities regularly!"

        # Pricing
        if any(word in query for word in ["price", "cost", "charge", "rate", "how much"]):
            return "💰 **Pricing Information:**\nOur service providers offer competitive rates based on:\n• Service type and complexity\n• Location\n• Materials required\n• Time duration\n\nYou'll get exact quotes when you book a service!"

        # Contact/support
        if any(phrase in query for phrase in ["contact", "support", "help", "customer care"]):
            return "📞 **Customer Support:**\n• Phone: 1800-XXX-XXXX\n• Email: support@localfix.com\n• Live Chat: Available on website\n• Hours: 24/7 support"

        return None

    def _handle_feedback_query(self, query):
        """Handle feedback and review related queries"""
        # Extract provider name from query
        name_patterns = [
            r"for\s+([a-zA-Z\s]+)",
            r"of\s+([a-zA-Z\s]+)", 
            r"about\s+([a-zA-Z\s]+)",
            r"provider\s+([a-zA-Z\s]+)"
        ]
        
        provider_name = None
        for pattern in name_patterns:
            match = re.search(pattern, query)
            if match:
                provider_name = match.group(1).strip()
                break

        if provider_name:
            # Search for provider in database
            provider = users_collection.find_one({
                "fullName": {"$regex": provider_name, "$options": "i"},
                "role": "serviceProvider"
            })
            
            if provider:
                name = provider.get('fullName', 'Unknown')
                service = provider.get('serviceCategory', 'Service Provider').title()
                exp = provider.get('experience', 0)
                city = provider.get('city', 'Unknown location')
                rating = provider.get('rating', 'Not rated')
                
                response = f"⭐ **Feedback Summary for {name}:**\n"
                response += f"• Service: {service}\n"
                response += f"• Experience: {exp} years\n"
                response += f"• Location: {city}\n"
                response += f"• Rating: {rating}/5\n"
                response += f"• Customer Feedback: Professional and reliable service\n"
                
                # Add some simulated feedback based on rating
                if isinstance(rating, (int, float)):
                    if rating >= 4:
                        response += "📝 **Recent Reviews:**\n- 'Excellent work quality!'\n- 'Very professional and punctual'\n- 'Good value for money'"
                    elif rating >= 3:
                        response += "📝 **Recent Reviews:**\n- 'Satisfactory service'\n- 'Completed work as promised'\n- 'Reasonable pricing'"
                else:
                    response += "📝 This provider is new and collecting reviews."
                    
                return response
            else:
                return f"❌ I couldn't find provider '{provider_name}'. Please check the name and try again."

        # General feedback about LocalFix
        if "localfix" in query:
            return "⭐ **LocalFix Platform Feedback:**\nOur customers appreciate:\n• Quick service matching\n• Verified providers\n• Transparent pricing\n• 24/7 support\n• Service quality guarantee\n\nWe maintain 4.5+ star rating across platforms!"

        return "Please specify which provider's feedback you're looking for, like 'feedback for Raj Sharma'."

    def _is_general_question(self, query):
        """Check if the query is a general knowledge question"""
        general_patterns = [
            'what', 'how', 'why', 'when', 'where', 'which',
            'explain', 'describe', 'tell me about', 'what is', 'what are',
            'tools needed', 'tools required', 'equipment', 'materials',
            'advice', 'tips', 'guide', 'help with', 'how to', 'how do i',
            'can you explain', 'could you tell'
        ]
        
        search_patterns = [
            'find', 'search', 'look for', 'need', 'want', 'looking for',
            'list', 'show', 'get', 'provide', 'available', 'near me',
            'in delhi', 'in mumbai', 'in bangalore', 'in chennai'
        ]
        
        # If it has search patterns and no general question patterns, it's a search
        has_search_intent = any(pattern in query for pattern in search_patterns)
        has_general_intent = any(pattern in query for pattern in general_patterns)
        
        # More likely a general question if it starts with what/how/why etc.
        starts_with_general = any(query.startswith(pattern) for pattern in ['what', 'how', 'why', 'when', 'where'])
        
        return has_general_intent and not (has_search_intent and not starts_with_general)

    def _handle_general_question(self, query):
        """Handle general knowledge questions with Ollama"""
        context = """
        You are LocalFix assistant - a platform for home services and local service providers.
        Provide helpful, practical information about home services, repairs, tools, maintenance, and DIY tips.
        Be specific and give actionable advice.
        
        If the question is about home services, repairs, maintenance, tools, or related topics, provide detailed helpful information.
        
        If the question is completely unrelated to home services (like politics, sports, entertainment, food, weather, etc.), 
        respond with exactly this phrase: "I don't have information regarding this, but if you need help with local services I am here to help you."
        
        Only respond to topics related to: plumbing, electrical work, carpentry, painting, cleaning, appliance repair, 
        AC repair, car mechanics, home renovation, pest control, moving services, gardening, computer repair, and related home services.
        """
        
        ollama_response = self.query_ollama(query, context)
        
        # Check if the response indicates it's unrelated
        if self._is_unrelated_response(ollama_response):
            return "I don't have information regarding this, but if you need help with local services I am here to help you."
        
        return ollama_response

    def _is_unrelated_response(self, response):
        """Check if Ollama response indicates the topic is unrelated"""
        unrelated_indicators = [
            "i don't have information",
            "i can only help with",
            "i specialize in",
            "unrelated to",
            "not related to",
            "outside my expertise",
            "can only assist with",
            "localfix services"
        ]
        
        response_lower = response.lower()
        return any(indicator in response_lower for indicator in unrelated_indicators)

    def process_query(self, user_input):
        """Main method to process user queries"""
        user_input = user_input.lower().strip()
        print(f"🤖 Processing: '{user_input}'")

    # 🎯 First handle greetings and casual messages
        greeting_response = self._handle_greetings(user_input)
        if greeting_response:
            return greeting_response

    # 🎯 Then try website-specific information
        website_response = self._handle_website_queries(user_input)
        if website_response:
            return website_response

    # 🚫 Identify if this is a general question (should use Ollama)
        is_general_question = self._is_general_question(user_input)
    
        if is_general_question:
            print("💭 Identified as general question - using Ollama")
            return self._handle_general_question(user_input)
        else:
            print("🎯 Identified as search query - using MongoDB")
            mongo_result = self.search_mongodb(user_input)
            # Only return MongoDB result if it actually found providers for a specific search
            if "providers found" in mongo_result.lower() and not self._is_vague_query(user_input):
                return mongo_result
            else:
                # For vague queries, use Ollama instead
                return self._handle_general_question(user_input)

    def _handle_greetings(self, query):
        """Handle greetings and casual messages"""
        greetings = [
            'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
            'namaste', 'hi there', 'hello there', 'hey there'
        ]
    
        introductions = [
            'i am', 'i\'m', 'my name is', 'this is', 'myself'
        ]
    
    # Check for simple greetings
        if any(greeting in query for greeting in greetings) and len(query.split()) <= 4:
            return "Hello! 👋 I'm your LocalFix assistant. How can I help you with home services today?"
    
    # Check for introductions without service requests
        if any(intro in query for intro in introductions) and not self._has_service_intent(query):
            return "Nice to meet you! 😊 I'm here to help you find local service providers or answer questions about home services. What can I assist you with today?"
    
        return None

    def _has_service_intent(self, query):
        """Check if the query has service-related intent"""
        service_keywords = [
            'plumb', 'electric', 'carpent', 'paint', 'clean', 'repair',
            'mechanic', 'service', 'provider', 'need', 'want', 'looking for',
            'find', 'search', 'book', 'hire'
        ]
        return any(keyword in query for keyword in service_keywords)

    def _is_vague_query(self, query):
        """Check if the query is too vague for meaningful search"""
        vague_patterns = [
            # Very short queries
            len(query.split()) <= 3,
            # Just names/introductions without context
            any(pattern in query for pattern in ['i am', 'i\'m', 'my name']),
            # Generic greetings only
            all(word in ['hi', 'hello', 'hey', 'hii'] for word in query.split())
        ]
        return any(vague_patterns)

    def _is_unrelated_query(self, query):
        """Check if query is completely unrelated to our services"""
        unrelated_patterns = [
            r"\b(pizza|burger|food|restaurant)\b",
            r"\b(movie|film|cinema|netflix)\b", 
            r"\b(music|song|spotify)\b",
            r"\b(sports|cricket|football|game)\b",
            r"\b(politics|government|election)\b",
            r"\b(weather|climate|temperature)\b",
            r"\b(stock|share|market|investment)\b"
        ]
        
        return any(re.search(pattern, query.lower()) for pattern in unrelated_patterns)

# Initialize chatbot
chatbot = LocalFixChatbot()

# Flask Routes
@app.route("/")
def home():
    return render_template('index.html')

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message", "").strip()
        
        if not user_input:
            return jsonify({
                "response": "Please enter a message to get assistance.",
                "status": "error"
            }), 400
        
        # Process the query
        response = chatbot.process_query(user_input)
        
        return jsonify({
            "response": response,
            "status": "success"
        })
        
    except Exception as e:
        print("❌ Chat endpoint error:", e)
        return jsonify({
            "response": "I'm experiencing technical difficulties. Please try again in a moment.",
            "status": "error"
        }), 500

@app.route("/services", methods=["GET"])
def get_services():
    """Endpoint to get available service categories"""
    return jsonify({
        "services": chatbot.website_services,
        "status": "success"
    })

@app.route("/website-info", methods=["GET"])
def get_website_info():
    """Endpoint to get website information"""
    return jsonify({
        "about": chatbot.website_info["about"],
        "features": chatbot.website_info["features"],
        "cities": chatbot.website_info["cities_covered"],
        "status": "success"
    })

@app.route("/debug/providers", methods=["GET"])
def debug_providers():
    """Debug endpoint to see all service providers in database"""
    try:
        # Get all service providers
        providers = list(users_collection.find({"role": "serviceProvider"}))
        
        result = []
        for p in providers:
            provider_data = {
                "id": str(p.get("_id")),
                "fullName": p.get("fullName"),
                "serviceCategory": p.get("serviceCategory"),
                "city": p.get("city"),
                "experience": p.get("experience"),
                "phone": p.get("phone"),
                "availability": p.get("availability"),
                "skills": p.get("skills", [])
            }
            result.append(provider_data)
        
        return jsonify({
            "total_providers": len(providers),
            "providers": result,
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"})

if __name__ == "__main__":
    print("🚀 Enhanced LocalFix Chatbot Started!")
    print("📍 Available at: http://127.0.0.1:5000")
    print("🔗 MongoDB Connected:", db.name)
    print("🤖 Ollama Model:", OLLAMA_MODEL)
    app.run(debug=True, port=5000)