// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { useAppContext } from "@/context/AppContext";

// export default function Navbar() {
//   const { role, logout,user } = useAppContext(); // role: "guest" | "serviceNeeder" | "serviceProvider"
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const toggleMobile = () => setMobileOpen(!mobileOpen);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/";
//   };

//   // Common Links for all roles
//   const commonLinks = [
//     { href: "/", label: "Home" },
//     { href: "/services", label: "Services" },
//     { href: "/blog", label: "Blog" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
//   ];

//   // Role-specific links
//   let roleLinks = [];
//   if (role === "serviceNeeder") {
//     roleLinks.push({ href: "/bookings", label: "My Bookings" });
//   } else if (role === "serviceProvider") {
//     roleLinks.push(
//       { href: "/serviceProvider/${id}/requests", label: "Service Requests" },
//       { href: "/dashboard", label: "Dashboard" }
//     );
//   }

// //   const generateRoleLinks = (role, userId) => {
// //   const roleConfig = {
// //     serviceNeeder: [
// //       { href: `/serviceNeeder/${userId}/bookings`, label: "My Bookings" },
// //       { href: `/serviceNeeder/${userId}/profile`, label: "Profile" },
// //     ],
// //     serviceProvider: [
// //       { href: `/serviceProvider/${userId}/requests`, label: "Service Requests" },
// //       { href: `/serviceProvider/${userId}/dashboard`, label: "Dashboard" },
// //       { href: `/serviceProvider/${userId}/profile`, label: "Profile" },
// //     ],
// //     admin: [
// //       { href: `/admin/${userId}/dashboard`, label: "Admin Dashboard" },
// //       { href: `/admin/${userId}/manage-users`, label: "Manage Users" },
// //     ],
// //   };

// //   return roleConfig[role] || [];
// // };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="flex items-center space-x-2">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">L</span>
//               </div>
//               <span className="text-2xl font-bold text-gray-800">LocalFix</span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {commonLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {roleLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {role === "guest" ? (
//               <>
//                 <Link
//                   href="/auth/login"
//                   className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/auth/signup"
//                   className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm transition-all duration-200"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMobile}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
//             >
//               {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden transition-all duration-300 ease-in-out ${
//           mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
//         }`}
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
//           {[...commonLinks, ...roleLinks].map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={toggleMobile}
//               className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               {link.label}
//             </Link>
//           ))}

//           {role === "guest" ? (
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <Link
//                 href="/auth/login"
//                 onClick={toggleMobile}
//                 className="w-full mb-2 px-4 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 block text-center"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/auth/signup"
//                 onClick={toggleMobile}
//                 className="w-full px-4 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm block text-center"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           ) : (
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <button
//                 onClick={() => {
//                   toggleMobile();
//                   handleLogout();
//                 }}
//                 className="w-full px-4 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 block text-center"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const { role, logout, user } = useAppContext(); // role: "guest" | "serviceNeeder" | "serviceProvider"
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  // Common Links for all roles
  const commonLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // ✅ Role-specific links (with dynamic user?.id)
  let roleLinks = [];
  if (role === "serviceNeeder" && user) {
    roleLinks.push(
      { href: `/serviceNeeder/${user.id}/bookings`, label: "My Bookings" },
      { href: `/serviceNeeder/${user.id}/profile`, label: "Profile" }
    );
  } else if (role === "serviceProvider" && user) {
    roleLinks.push(
      { href: `/serviceProvider/${user.id}/request`, label: "Service Requests" },
      { href: `/serviceProvider/${user.id}/dashboard`, label: "Dashboard" },
      { href: `/serviceProvider/${user.id}/profile`, label: "Profile" }
    );
  } else if (role === "admin" && user) {
    roleLinks.push(
      { href: `/admin/${user.id}/dashboard`, label: "Admin Dashboard" },
      { href: `/admin/${user.id}/manage-users`, label: "Manage Users" }
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">LocalFix</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {commonLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {roleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {role === "guest" ? (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {[...commonLinks, ...roleLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMobile}
              className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.label}
            </Link>
          ))}

          {role === "guest" ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                href="/auth/login"
                onClick={toggleMobile}
                className="w-full mb-2 px-4 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 block text-center"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={toggleMobile}
                className="w-full px-4 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm block text-center"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <button
                onClick={() => {
                  toggleMobile();
                  handleLogout();
                }}
                className="w-full px-4 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 block text-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
