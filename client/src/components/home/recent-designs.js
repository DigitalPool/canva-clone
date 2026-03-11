"use client";

import { getUserDesigns } from "@/services/design-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

// import { useEditorStore } from "@/store";
// import DesignList from "./design-list";
function RecentDesigns() {
  const [userDesigns, setUserDesigns] = useState([]);
  const router = useRouter()
  
  async function fetchUserDesigns() {
    const result = await getUserDesigns()
    if (result.success) setUserDesigns(result?.data)
    console.log(result, 'result')
  }

  useEffect(() => {
    fetchUserDesigns()
  },[])

  // const designs = Array(6).fill(null).map((_, i)) => ({
  //   id: i,
  //   title: `Design ${i + 1}`,
  //   thumbnail: "/placeholder-design.svg"
  // })

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {
            !(userDesigns.length) && <h1>Create your first designs to see them here</h1>
          }
          {
            userDesigns.map((design) => (
              <div key={design._id} className="group cursor-pointer">
                <div onClick={()=>router.push(`/editor/${design?._id}`)} className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow"></div>
                <p className="font-bold text-sm truncate">{design.name}</p>
              </div>
            ))
          }
          </div>
    </div>
  );
}

export default RecentDesigns;
