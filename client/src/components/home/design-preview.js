"use client";

import { useEffect, useRef, useState } from "react";

const PREVIEW_SIZE = 300;

function DesignPreview({ design }) {
  const [canvasId] = useState(`canvas-${design._id}-${Date.now()}`);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (
          fabricCanvasRef.current &&
          typeof fabricCanvasRef.current.dispose === "function"
        ) {
          try {
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current = null;
          } catch (e) {
            console.error("Error while disposing canvas");
          }
        }

        const fabric = await import("fabric");
        const canvasElement = document.getElementById(canvasId);

        if (!canvasElement) return;

        const designPreviewCanvas = new fabric.StaticCanvas(canvasId, {
          width: PREVIEW_SIZE,
          height: PREVIEW_SIZE,
          renderOnAddRemove: true,
        });

        fabricCanvasRef.current = designPreviewCanvas;

        let canvasData;

        try {
          canvasData =
            typeof design.canvasData === "string"
              ? JSON.parse(design.canvasData)
              : design.canvasData;
        } catch (innerErr) {
          console.error("Error parsing canvas data");

          return;
        }

        if (
          canvasData === undefined ||
          canvasData === null ||
          canvasData?.objects?.length === 0
        ) {
          designPreviewCanvas.backgroundColor = "#ffffff";
          designPreviewCanvas.requestRenderAll();
          return;
        }

        designPreviewCanvas.backgroundColor = canvasData.background || "#ffffff";

        await designPreviewCanvas.loadFromJSON(canvasData);

        const sourceWidth = Number(design?.width) || PREVIEW_SIZE;
        const sourceHeight = Number(design?.height) || PREVIEW_SIZE;
        const scale = Math.min(
          PREVIEW_SIZE / sourceWidth,
          PREVIEW_SIZE / sourceHeight
        );
        const offsetX = (PREVIEW_SIZE - sourceWidth * scale) / 2;
        const offsetY = (PREVIEW_SIZE - sourceHeight * scale) / 2;

        designPreviewCanvas.setViewportTransform([
          scale,
          0,
          0,
          scale,
          offsetX,
          offsetY,
        ]);

        designPreviewCanvas.getObjects().forEach((object) => {
          object.setCoords();
        });

        if (canvasData.background) {
          designPreviewCanvas.backgroundColor = canvasData.background;
        }

        designPreviewCanvas.renderAll();
      } catch (e) {
        console.error("Error rendering design preview data", e);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (
        fabricCanvasRef.current &&
        typeof fabricCanvasRef.current.dispose === "function"
      ) {
        try {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        } catch (e) {
          console.error("Error while disposing canvas");
        }
      }
    };
  }, [canvasId, design]);

  return (
    <canvas
      id={canvasId}
      width={PREVIEW_SIZE}
      height={PREVIEW_SIZE}
      className="h-full w-full object-contain"
    />
  );
}

export default DesignPreview;
