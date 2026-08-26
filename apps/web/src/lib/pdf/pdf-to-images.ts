import type { PDFPageImage } from "@repo/types/types";

let workerInitialized = false;

export async function pdfToImages(
  file: File,
  scale = 1.5,
): Promise<PDFPageImage[]> {
  // Dynamic import so this module is never evaluated on the server.
  // DOMMatrix and other DOM APIs used by pdfjs-dist only exist in the browser.
  const pdfjsLib = await import("pdfjs-dist");

  if (!workerInitialized) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
    workerInitialized = true;
  }

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  const pages: PDFPageImage[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not create canvas context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport,
      canvas,
    }).promise;

    pages.push({
      pageNumber,
      width: viewport.width,
      height: viewport.height,
      dataUrl: canvas.toDataURL("image/png"),
    });

    canvas.remove();
  }

  return pages;
}