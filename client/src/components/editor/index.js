
"use client";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/store";
import { getUserDesignById } from "@/services/design-service";

export default function MainEditor() {
  const params = useParams()
  const router = useRouter()
  const designId = params?.slug

  const [isLoading, setIsLoading] = useState(!!designId)
  const [loadAttempted, setLoadAttempted] = useState(false)
  const [error, setError] = useState(null)

  // set the design Id
  const {canvas, setDesignId, resetStore, setName} = useEditorStore()

  //add UseEffect so all these methods can take effect

  useEffect(() => {
    //reset the store
    resetStore()

    //set the design id if it is present
    if(designId) setDesignId(designId)

    //we can also do a clean up

    return() => {
      resetStore()
    }
  }, [])

  //

  //anytime the designId changes we have to setLoadAttempted to false and error to null
  useEffect(() => {
    setLoadAttempted(false)
    setError(null)
  }, [designId]) //it is based on the changing od designId

  //it is possible that the Design is loaded and the canvas is not ready from the canvas

  useEffect(() => {
    if (isLoading && !canvas && designId){
      const timer = setTimeout (() => {
        if(isLoading){
          console.log('Canvas init timeout')
          setIsLoading(false)
        }
      }, 5000)
      return ()=>clearTimeout(timer)
    }
  }, [isLoading, canvas, designId])

  //Now if canvas is now available we log that it is available
  useEffect(() => {
   if(canvas){
    console.log('Canvas is now available in editor')
   }
  }, [canvas]) //it is based on the changing od designId


  // Now here we have to load the design and render it on the canvas, so we will create a function called loadDesign which will take the designId and canvas as parameters and will return a promise, we will call this function inside a useEffect which will be based on the designId and canvas, so anytime the designId or canvas changes we will call this function, and inside this function we will make an API call to get the design data and then we will use the fabric.js methods to render the design on the canvas, if there is an error we will set the error state and if it is successful we will set the isLoading to false


    // Now here we have to load the design and render it
  const loadDesign = useCallback(async () => {
    //if the canvas is not present, and we already tried we will return
    if(!canvas || !designId || loadAttempted) return

    try {
      //otherwier we should try to load
      setIsLoading(true)
      //then load attemoted will be true
      setLoadAttempted(true)
      const response = await getUserDesignById(designId)
      
      const design = response.data
      //data is coming from the console, you can see that everything we logged is called data

      if (design) {
        //TODO: update name
        setName(design.name);

        //set the design ID just incase we need it after getting the data
        setDesignId(designId);

        try {
          //if there is a canvasData, like if we have saved some design, show it
          //otherwise say there is no data
          if (design.canvasData) {
            //first clear the canvas to cleanUp if there is any left data lingering somewhere
            canvas.clear();
            //if there is width and height fromt he canvaData, then set the dimensions
            //canvas.setDimensions is coming from fabric.js
            if (design.width && design.height) {
              canvas.setDimensions({
                width: design.width,
                height: design.height,
              });
            }
            //then parse the canvasData, but it has to be a JSON if it is a string, 
            // because in the fabric.js needs ca to be JSON to load all the objects in the design
            const canvasData =
              typeof design.canvasData === "string"
                ? JSON.parse(design.canvasData)
                : design.canvasData;

            // if there are objects on the canvas, we check
            const hasObjects =
              canvasData.objects && canvasData.objects.length > 0;

            //set the background details
            if (canvasData.background) {
              canvas.backgroundColor = canvasData.background;
            } else {
              canvas.backgroundColor = "#ffffff";
            }

            //if no present object, return, render now and true
            if (!hasObjects) {
              canvas.renderAll();
              return true;
            }

            //otherwise, means it has objects, then loadfromJSON the canvasData
            //then after that requestRenderAll
            canvas
              .loadFromJSON(design.canvasData)
              .then((canvas) => canvas.requestRenderAll());
          } else {
            //else, we say there is no data, so we juts show a blank canvas
            console.log("no canvas data");
            //first clear the canvas for any remnant data that might be lingering somewhere
            canvas.clear();
            //set the width, based on the width saved in the databas
            canvas.setWidth(design.width);
            //set the height, based on the height saved in the databas
            canvas.setHeight(design.height);
            //set the background color, based on the background color saved in the databas
            canvas.backgroundColor = "#ffffff";
            //then call renderAll, coming from fabric.js, which we will be callign everytime we want to rerender data or update what we have on the canvas
            canvas.renderAll();
          }
        } catch (e) {
          //otherwise say there is error loading data
          console.error(("Error loading canvas", e));
          setError("Error loading canvas");
        } finally {
          setIsLoading(false);
        }
      }

    } catch (e) {
      //log and set wrror and set isloading false
      console.error("Failed to load design", e);
      setError("failed to load design");
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]); //all what we need

  //we can then take a useEffect to load things when they are ready
  useEffect(() => {
    //if esignIg and canvas are available, and we habent tried to load, we laod the design
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designId) {
      //otherwise, if designId is not present, we redirect the user to the homepage
      router.replace("/");
    }
  }, [canvas, designId, loadDesign, loadAttempted, router]); // all what we need

 

  return <div className="flex flex-col h-screen overflow-hidden">
    <Header/>
    <div className="flex flex-1 overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-hidden bg-[#f0f0f0] flex items-center justify-center" >
          <Canvas/>
        </main>
      </div>
    </div>
</div>
}