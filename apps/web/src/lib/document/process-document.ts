import { pdfToImages } from "@/lib/pdf/pdf-to-images";
import type { DocumentPage } from "@repo/types/types";

const IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

async function imageToPage(file: File): Promise<DocumentPage> {
  const dataUrl = await fileToDataURL(file);

  const dimensions = await getImageDimensions(dataUrl);

  return {
    pageNumber: 1,
    width: dimensions.width,
    height: dimensions.height,
    dataUrl,
  };
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read file"));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

function getImageDimensions(
  dataUrl: string,
): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    image.src = dataUrl;
  });
}

export async function processDocument(
  file: File,
): Promise<DocumentPage[]> {
  if (file.type === "application/pdf") {
    return pdfToImages(file);
  }

  if (IMAGE_TYPES.includes(file.type)) {
    return [await imageToPage(file)];
  }

  throw new Error(
    `Unsupported file type: ${file.type}`,
  );
}