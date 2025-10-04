

// pages/login.js
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Head from "next/head";
// import Link from "next/link";
// import { useAppContext } from "@/context/AppContext";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     usernameOrEmail: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { login } = useAppContext();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token and user data
//         login(data.user, data.token);
        
//         // Redirect based on role
//         if (data.user.role === 'serviceProvider') {
//           console.log("Redirecting to provider dashboard");
//           router.push('/provider/dashboard');
//         } else if (data.user.role === 'serviceNeeder') {
//           console.log("Redirecting to customer dashboard");
//           router.push('/customer/dashboard');
//         } else if (data.user.role === 'admin') {
//           router.push('/admin/dashboard');
//         } else {
//           router.push('/');
//         }
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <Head>
//         <title>Login | LocalFix</title>
//         <meta name="description" content="Login to your LocalFix account" />
//       </Head>

//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 overflow-hidden">
//           <div className="bg-blue-600 py-4 px-6">
//             <h1 className="text-center text-2xl font-bold text-white">
//               LocalFix
//             </h1>
//             <h2 className="mt-2 text-center text-xl font-semibold text-white">
//               Sign in to your account
//             </h2>
//           </div>
          
//           <div className="px-8 py-6">
//             <p className="mt-2 text-center text-sm text-gray-600 mb-6">
//               Or{" "}
//               <Link
//                 href="/register"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 create a new account
//               </Link>
//             </p>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                   {error}
//                 </div>
//               )}

//               <div className="rounded-md shadow-sm -space-y-px">
//                 <div>
//                   <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
//                     Username or Email
//                   </label>
//                   <input
//                     id="usernameOrEmail"
//                     name="usernameOrEmail"
//                     type="text"
//                     required
//                     className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                     placeholder="Enter your username or email"
//                     value={formData.usernameOrEmail}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-2 block text-sm text-gray-900"
//                   >
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <Link
//                     href="/forgot-password"
//                     className="font-medium text-blue-600 hover:text-blue-500"
//                   >
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                   {isLoading ? "Signing in..." : "Sign in"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/login/page.js (if you’re using App Router)
// OR
// pages/login.js (if you’re still using Pages Router)
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useAppContext,fetchMe } from "@/context/AppContext";

export default function Login() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAppContext(); // store user data in context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user data in context
      login(data.user);

      // ✅ Redirect based on role
      if (data.role === "provider") {
        router.push("/providers/dashboard");
      } else if (data.role === "customer") {
        router.push("/customers/dashboard");
      } else if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      setError(data.error || "Login failed");
    }
  } catch (error) {
    setError("An error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login | LocalFix</title>
        <meta name="description" content="Login to your LocalFix account" />
      </Head>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 overflow-hidden">
          <div className="bg-blue-600 py-4 px-6">
            <h1 className="text-center text-2xl font-bold text-white">
              LocalFix
            </h1>
            <h2 className="mt-2 text-center text-xl font-semibold text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="px-8 py-6">
            <p className="mt-2 text-center text-sm text-gray-600 mb-6">
              Or{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </Link>
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label
                    htmlFor="usernameOrEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username or Email
                  </label>
                  <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your username or email"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
