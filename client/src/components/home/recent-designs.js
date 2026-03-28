"use client";

import { getUserDesigns } from "@/services/design-service";
import { useEditorStore } from "@/store";
import { useEffect } from "react";
import DesignList from "./design-list";

function RecentDesigns() {
  const {
    userDesigns,
    userDesignsLoading,
    setUserDesigns,
    setUserDesignsLoading,
  } = useEditorStore();

  useEffect(() => {
    let isMounted = true;

    const fetchDesigns = async () => {
      setUserDesignsLoading(true);

      try {
        const result = await getUserDesigns();

        if (isMounted) {
          setUserDesigns(result?.success ? result.data : []);
        }
      } catch (error) {
        console.error("Failed to fetch recent designs:", error);
        if (isMounted) {
          setUserDesigns([]);
        }
      } finally {
        if (isMounted) {
          setUserDesignsLoading(false);
        }
      }
    };

    fetchDesigns();

    return () => {
      isMounted = false;
    };
  }, [setUserDesigns, setUserDesignsLoading]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <DesignList
        listOfDesigns={
          userDesigns && userDesigns.length > 0 ? userDesigns.slice(0, 4) : []
        }
        isLoading={userDesignsLoading}
        isModalView={false}
      />
    </div>
  );
}

export default RecentDesigns;
