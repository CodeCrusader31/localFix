// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Car } from "lucide-react";
// import ServiceCard from "@/components/ServiceCard";


// export default function CategoryPage(){
//     const { category } = useParams();
//     const[providers,setProviders] = useState([]);
//     const[loading, setLoading] = useState(true);

//     useEffect(() => {
//         if(category){
//             fetch(`/api/ServiceProviders?serviceCategory=${category}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setProviders(data);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//         }
//     },[category])


//     if(loading){
//         return <p className="p-6">Loading {category} services...</p>
//     }


//     return (
//         <div className='p-6'>
//             <h1 className="text-2xl font-bold mb-6 capitalize">
//                 {category} Services
//             </h1>
//             {providers.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {providers.map((providers) => (
//                         <ServiceCard key={providers._id} provider = {providers}/>
//                     ))}
//                 </div>
//             ):
//             <p className="text-gray-600">No {category}s available right now.</p>}
//         </div>
//     )
// }

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import ServiceCard from "@/components/ServiceCard";

export default function ProvidersPage() {
  const { category } = useParams();
  const { user, loading: userLoading } = useAppContext(); // ✅ from context
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = () => {
    if (!user?.id) return;
    setLoading(true);

    let url = `/api/ServiceProviders/nearby?category=${category}&radius=5000&userId=${user.id}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
       // console.log("API Response:", data);
        setProviders(data.providers || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Providers Error:", err);
        setProviders([]);
        setLoading(false);
      });
  };
  //console.log(user)
  useEffect(() => {
    if (user?.id) fetchProviders();
  }, [user, category]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Find {category.charAt(0).toUpperCase() + category.slice(1)}s Near You
      </h1>

      {loading || userLoading ? (
        <p>Loading {category} services...</p>
      ) : providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((p) => (
            <ServiceCard key={p._id} provider={p} />
          ))}
        </div>
      ) : (
        <p>No {category}s found nearby.</p>
      )}
    </div>
  );
}
