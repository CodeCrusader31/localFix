import Link from "next/link";
import Footer from "@/components/footer";

export const metadata = {
  title: "About | LocalFix",
  description:
    "LocalFix connects customers with verified local service providers across India—built for quality, reliability, and a better booking experience.",
};

const ABOUT_TEXT =
  "LocalFix is a trusted platform connecting customers with verified local service providers across India. We ensure quality, reliability, and customer satisfaction.";

const FEATURES = [
  "Verified service providers",
  "Transparent pricing",
  "Customer reviews and ratings",
  "Quick booking",
  "24/7 customer support",
  "Service guarantee",
];

const WORKING_PROCESS = [
  "Select your service",
  "Choose a provider",
  "Book appointment",
  "Get service done",
  "Make payment",
  "Provide feedback",
];

const CITIES_COVERED = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
];

const SERVICES_ON_PLATFORM = [
  "plumbing",
  "electrical",
  "carpentry",
  "painting",
  "cleaning",
  "appliance repair",
  "AC repair",
  "car mechanic",
  "home renovation",
  "pest control",
  "moving services",
  "gardening",
  "computer repair",
];

function FeatureCard({ icon, title }) {
  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
          <span className="text-2xl" aria-hidden="true">
            {icon}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Built to make local services simpler, faster, and more trustworthy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 opacity-40 blur-sm" />
            <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-indigo-200 opacity-40 blur-sm" />

            <div className="relative z-10 p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-medium">
                <span aria-hidden="true">🏠</span>
                Trusted Local Services, Made Simple
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                About LocalFix
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl leading-relaxed">
                {ABOUT_TEXT}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-95 transition-opacity"
                >
                  Explore Services
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 font-medium hover:bg-indigo-50 transition-colors"
                >
                  Ask the LocalFix Assistant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What you get</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Everything designed around a smooth booking experience and
              dependable service outcomes.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="✅" title={FEATURES[0]} />
            <FeatureCard icon="💸" title={FEATURES[1]} />
            <FeatureCard icon="⭐" title={FEATURES[2]} />
            <FeatureCard icon="⚡" title={FEATURES[3]} />
            <FeatureCard icon="🌙" title={FEATURES[4]} />
            <FeatureCard icon="🛡️" title={FEATURES[5]} />
          </div>

          <div className="mt-12 bg-white/80 border border-indigo-100 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">
              Services you can book
            </h3>
            <p className="mt-2 text-gray-600">
              Browse popular local services and book verified professionals in
              your city.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {SERVICES_ON_PLATFORM.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border border-indigo-100 font-medium text-sm"
                >
                  <span aria-hidden="true" className="mr-2">
                    ✨
                  </span>
                  {service
                    .split(" ")
                    .map((w) =>
                      w.length ? w[0].toUpperCase() + w.slice(1) : w
                    )
                    .join(" ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            How LocalFix Works
          </h2>
          <p className="mt-3 text-gray-600 text-center max-w-2xl mx-auto">
            A simple flow that helps you find the right professional and get
            the job done—end to end.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKING_PROCESS.map((step, idx) => (
              <div
                key={step}
                className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {idx === 0 && "Tell us what you need, and we’ll help match you."}
                  {idx === 1 && "We surface verified providers that fit your request."}
                  {idx === 2 && "Confirm time and place for a hassle-free appointment."}
                  {idx === 3 && "Track progress and ensure the service is completed."}
                  {idx === 4 && "Pay securely after the work is delivered."}
                  {idx === 5 && "Share feedback to keep quality high for everyone."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-indigo-100 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900">
              Cities we cover
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              LocalFix currently supports service requests across major Indian
              cities, with more rolling out regularly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {CITIES_COVERED.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border border-indigo-100 font-medium text-sm"
                >
                  <span aria-hidden="true">📍</span>
                  {city}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                Can’t find your city? Keep checking—coverage expands often.
              </div>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Browse Available Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

