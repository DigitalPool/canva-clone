import { fetchWithAuth } from "./base-service"

// for Design
export async function getUserDesigns(){
  return fetchWithAuth(`/v1/designs`, {
    //or you can skip the method becasue if not stated it will use GET by default 
    method: 'GET'
  })
}

// for the get by id
export async function getUserDesignById(designId){
  return fetchWithAuth(`/v1/designs/${designId}`)
}

// for saveDesign
export async function saveDesign(designData, designId = null){
    return fetchWithAuth(`/v1/designs`, {
    method: 'POST',
    body: {
      ...designData,
      designId
    }
  })
}

// for deleteDesign
export async function deleteDesign(designId){
  return fetchWithAuth(`/v1/designs/${designId}`, {
    method: 'DELETE'
  })
}


// save Canvas State

export async function saveCanvasState(
  canvas,
  designId = null,
  title = "Untitled Design"
) {
  if (!canvas) return false;

  try {
    const canvasData = canvas.toJSON(["id", "filters"]);

    const designData = {
      name: title,
      canvasData: JSON.stringify(canvasData),
      width: canvas.width,
      height: canvas.height,
    };

    return saveDesign(designData, designId);
  } catch (error) {
    console.error("Error saving canvas state:", error);
    throw error;
  }
}
