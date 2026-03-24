"use client"

import { initializeFabric } from "@/fabric/fabric-utils"
import { useEditorStore } from "@/store"
import { useEffect, useRef } from "react"

export default function Canvas (){

  //firstly we decalre all the things we need and set them to null reference

  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const fabricCanvasRef = useRef(null)

  // we need one more ref that will allow us to know if we hae initiialized our canvas or not
  const initAttemptedRef = useRef(false)

  const { setCanvas } = useEditorStore()

  // now we take a useEffect
  // the first thing we will do is to cleanup the canvas

  useEffect(() =>{
    //cleanUp the canvas
    
    const cleanUpCanvas = () => {
      // check if there is a current fabric where we are, so we cna dispose it

      if (fabricCanvasRef.current){
        try{
          fabricCanvasRef.current.dispose()
        } catch (e){
          console.error('error disposing Canvas', e)
        }

        fabricCanvasRef.current = null
        // remember to set the canvas to null also
        setCanvas(null)
      }
    }

    //call the clean up function
    cleanUpCanvas()
    //reseet the init flah
    initAttemptedRef.current = false
  
    //Now we init out new canvas

    const initCanvas = async() => {
        if(typeof window === "undefined" || !canvasRef.current || initAttemptedRef.current){
            return
        }

        initAttemptedRef.current = true

        try{
        // the fabric/design itself has its own canvas
        const fabricCanvas = await initializeFabric(canvasRef.current, canvasContainerRef.current)

        if(!fabricCanvas){
            console.error('failed to initializa fabric.js canvas')

            return
        }

        //otherwise, it means that the initialization worked
        fabricCanvasRef.current = fabricCanvas
        setCanvas(fabricCanvas)

        console.log('Canvas init is done and set in store')

        //TODO: apply custom styled for the controls
        //TODO: set up event listeniers
        } catch (e) {
        console.error('failed to init canvas', e )
        }
    }
    const timer = setTimeout(() => {
      initCanvas();
    }, 50);

    return () => {
      clearTimeout(timer);
      cleanUpCanvas();
    };

  }, [])


  return (
    <div
      className="relative w-full h-[600px] overflow-auto"
      ref={canvasContainerRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
  
}
