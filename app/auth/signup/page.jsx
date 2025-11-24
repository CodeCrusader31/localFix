

// // pages/register.js
// "use client";
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import toast from 'react-hot-toast';
// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: 'serviceNeeder',
//     profilePic: null,
//     // Service Needer fields
//     address: '',
//     pincode: '',
//     city: '',
//     district: '',
//     state: '',
//     country: '',
//     // Service Provider fields
//     serviceCategory: '',
//     experience: '',
//     skills: [],
//     availability: false,
//     serviceArea: '',
//     idProof: null
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
    
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else if (type === 'file') {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else if (type === 'select-multiple') {
//       const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//       setFormData(prev => ({ ...prev, [name]: selectedOptions }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Common validations
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
//     // Role-specific validations
//     if (formData.role === 'serviceNeeder') {
//       if (!formData.address.trim()) newErrors.address = 'Address is required';
//       if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
//       if (!formData.city.trim()) newErrors.city = 'City is required';
//       if (!formData.district.trim()) newErrors.district = 'District is required';
//       if (!formData.state.trim()) newErrors.state = 'State is required';
//       if (!formData.country.trim()) newErrors.country = 'Country is required';
//     } else {
//       if (!formData.serviceCategory.trim()) newErrors.serviceCategory = 'Service category is required';
//       if (!formData.experience) newErrors.experience = 'Experience is required';
//       if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
//       if (!formData.serviceArea.trim()) newErrors.serviceArea = 'Service area is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
//     setErrors({});
    
//     try {
//       // Create FormData to handle file uploads
//       const submitData = new FormData();
      
//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'profilePic' || key === 'idProof') {
//           if (formData[key]) submitData.append(key, formData[key]);
//         } else if (key === 'skills') {
//           formData[key].forEach(skill => submitData.append('skills', skill));
//         } else {
//           submitData.append(key, formData[key]);
//         }
//       });
      
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         body: submitData,
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         toast.success('Registration successful! Please log in.');
//         router.push('/auth/login');
//       } else {
//         setErrors({ submit: data.message || 'Registration failed' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'Network error. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <Head>
//         <title>Register | LocalFix</title>
//         <meta name="description" content="Register for LocalFix service platform" />
//       </Head>

//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Or{' '}
//           <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
//             sign in to your existing account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {errors.submit && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                 {errors.submit}
//               </div>
//             )}

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 I am a
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//               >
//                 <option value="serviceNeeder">Service Needer (Customer)</option>
//                 <option value="serviceProvider">Service Provider (Technician/Worker)</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
//               </div>

//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//               {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
//                 Profile Picture (Optional)
//               </label>
//               <input
//                 id="profilePic"
//                 name="profilePic"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>

//             {/* Conditionally render fields based on role */}
//             {formData.role === 'serviceNeeder' ? (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Location Information</h3>
                
//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                     Address
//                   </label>
//                   <textarea
//                     id="address"
//                     name="address"
//                     rows={3}
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                   {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                       Pincode
//                     </label>
//                     <input
//                       id="pincode"
//                       name="pincode"
//                       type="text"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                     {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
//                   </div>

//                   <div>
//                     <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                       City
//                     </label>
//                     <input
//                       id="city"
//                       name="city"
//                       type="text"
//                       value={formData.city}
//                       onChange={handleChange}
//                       className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                     {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="district" className="block text-sm font-medium text-gray-700">
//                       District
//                     </label>
//                     <input
//                       id="district"
//                       name="district"
//                       type="text"
//                       value={formData.district}
//                       onChange={handleChange}
//                       className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                     {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
//                   </div>

//                   <div>
//                     <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                       State
//                     </label>
//                     <input
//                       id="state"
//                       name="state"
//                       type="text"
//                       value={formData.state}
//                       onChange={handleChange}
//                       className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                     {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                     Country
//                   </label>
//                   <input
//                     id="country"
//                     name="country"
//                     type="text"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                   {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Service Provider Details</h3>
                
//                 <div>
//                   <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">
//                     Service Category
//                   </label>
//                   <select
//                     id="serviceCategory"
//                     name="serviceCategory"
//                     value={formData.serviceCategory}
//                     onChange={handleChange}
//                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                   >
//                     <option value="">Select a category</option>
//                     <option value="plumber">Plumber</option>
//                     <option value="electrician">Electrician</option>
//                     <option value="carpenter">Carpenter</option>
//                     <option value="painter">Painter</option>
//                     <option value="mechanic">Mechanic</option>
//                     <option value="technician">Technician</option>
//                     <option value="cleaner">Cleaner</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {errors.serviceCategory && <p className="mt-1 text-sm text-red-600">{errors.serviceCategory}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                     Experience (years)
//                   </label>
//                   <input
//                     id="experience"
//                     name="experience"
//                     type="number"
//                     min="0"
//                     value={formData.experience}
//                     onChange={handleChange}
//                     className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                   {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
//                     Skills
//                   </label>
//                   <select
//                     id="skills"
//                     name="skills"
//                     multiple
//                     value={formData.skills}
//                     onChange={handleChange}
//                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                     size="3"
//                   >
//                     <option value="installation">Installation</option>
//                     <option value="repair">Repair</option>
//                     <option value="maintenance">Maintenance</option>
//                     <option value="troubleshooting">Troubleshooting</option>
//                     <option value="assembly">Assembly</option>
//                     <option value="renovation">Renovation</option>
//                   </select>
//                   <p className="mt-1 text-sm text-gray-500">Hold down the Ctrl (Windows) or Command (Mac) key to select multiple options.</p>
//                   {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     id="availability"
//                     name="availability"
//                     type="checkbox"
//                     checked={formData.availability}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="availability" className="ml-2 block text-sm text-gray-900">
//                     Available for urgent jobs
//                   </label>
//                 </div>

//                 <div>
//                   <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700">
//                     Service Area (cities or pincodes you cover)
//                   </label>
//                   <input
//                     id="serviceArea"
//                     name="serviceArea"
//                     type="text"
//                     value={formData.serviceArea}
//                     onChange={handleChange}
//                     placeholder="e.g., 560001, 560002, Bangalore"
//                     className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                   {errors.serviceArea && <p className="mt-1 text-sm text-red-600">{errors.serviceArea}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">
//                     ID Proof or Certification (Optional)
//                   </label>
//                   <input
//                     id="idProof"
//                     name="idProof"
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={handleChange}
//                     className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                   <p className="mt-1 text-sm text-gray-500">Upload any certification or ID proof for verification</p>
//                 </div>
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Creating account...' : 'Create account'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// pages/register.js
"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'serviceNeeder',
    profilePic: null,
    // Common address fields for both roles
    address: '',
    pincode: '',
    city: '',
    district: '',
    state: '',
    country: '',
    // Service Provider fields
    serviceCategory: '',
    experience: '',
    skills: [],
    availability: false,
    serviceArea: '',
    idProof: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    // Address validations for both roles
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    // Service Provider specific validations
    if (formData.role === 'serviceProvider') {
      if (!formData.serviceCategory.trim()) newErrors.serviceCategory = 'Service category is required';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
      if (!formData.serviceArea.trim()) newErrors.serviceArea = 'Service area is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Create FormData to handle file uploads
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'profilePic' || key === 'idProof') {
          if (formData[key]) submitData.append(key, formData[key]);
        } else if (key === 'skills') {
          formData[key].forEach(skill => submitData.append('skills', skill));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: submitData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Registration successful! Please log in.');
        router.push('/auth/login');
      } else {
        setErrors({ submit: data.message || 'Registration failed' });
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Register | LocalFix</title>
        <meta name="description" content="Register for LocalFix service platform" />
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.submit}
              </div>
            )}

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="serviceNeeder">Service Needer (Customer)</option>
                <option value="serviceProvider">Service Provider (Technician/Worker)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
                Profile Picture (Optional)
              </label>
              <input
                id="profilePic"
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Location Information - Common for both roles */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Location Information
              </h3>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Street address, building, landmark"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                    District
                  </label>
                  <input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
              </div>
            </div>

            {/* Service Provider Specific Fields */}
            {formData.role === 'serviceProvider' && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900">Service Provider Details</h3>
                
                <div>
                  <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">
                    Service Category
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a category</option>
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="technician">Technician</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceCategory && <p className="mt-1 text-sm text-red-600">{errors.serviceCategory}</p>}
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience (years)
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <select
                    id="skills"
                    name="skills"
                    multiple
                    value={formData.skills}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    size="4"
                  >
                    <option value="installation">Installation</option>
                    <option value="repair">Repair</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="troubleshooting">Troubleshooting</option>
                    <option value="assembly">Assembly</option>
                    <option value="renovation">Renovation</option>
                    <option value="consultation">Consultation</option>
                    <option value="emergency">Emergency Services</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold down Ctrl (Windows) or Command (Mac) to select multiple options</p>
                  {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
                </div>

                <div className="flex items-center">
                  <input
                    id="availability"
                    name="availability"
                    type="checkbox"
                    checked={formData.availability}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="availability" className="ml-2 block text-sm text-gray-900">
                    Available for urgent jobs
                  </label>
                </div>

                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700">
                    Service Area (cities or pincodes you cover)
                  </label>
                  <input
                    id="serviceArea"
                    name="serviceArea"
                    type="text"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    placeholder="e.g., 560001, 560002, Bangalore"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.serviceArea && <p className="mt-1 text-sm text-red-600">{errors.serviceArea}</p>}
                </div>

                <div>
                  <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">
                    ID Proof or Certification (Optional)
                  </label>
                  <input
                    id="idProof"
                    name="idProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">Upload any certification or ID proof for verification</p>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}