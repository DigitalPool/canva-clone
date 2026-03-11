


//this utility will help us initilize fabric, but receiving the canvas element and the container containing it
export const initializeFabric = async (canvasEl, containerEl) => {

  //then we use a try and catch block so we can catch any error that happened

  try {
    //now we will be inserting an instance of "Canvas" from fabricJs into our canvas element.
    const {Canvas, PencilBrush} = await import ("fabric")

    const canvas = new Canvas(canvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true,
    })

    //LEt us also intialize our pencil brush

    const brush = new PencilBrush(canvas)
    brush.color = "#000000";
    brush.width = 5;
    canvas.freeDrawingBrush = brush;

    //now we can return this canvas
    return canvas

  } catch (e) {
    console.error("failed to load fabric", e)
    return null
  }

}


export const centerCanvas = (canvas) => {
  if (!canvas || !canvas.wrapperEl) return;

  const canvasWrapper = canvas.wrapperEl;

  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = "absolute";
  canvasWrapper.style.top = "50%";
  canvasWrapper.style.left = "50%";
  canvasWrapper.style.transform = "translate(-50%, -50%)";
};