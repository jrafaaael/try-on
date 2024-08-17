// I use `.jpeg` format because it allows me to set quality
export function convertImageToJPEG({
  input,
  filename,
  quality = 1,
}: {
  input: string;
  filename: string;
  quality?: number;
}): Promise<File> {
  return new Promise((resolve, _reject) => {
    const img = new Image();

    img.addEventListener(
      "load",
      async () => {
        const canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
        const ctx = canvas.getContext("2d");

        ctx?.drawImage(img, 0, 0);

        const newName = filename.replace(/\.[^/.]+$/, "") + ".jpeg";
        const blob = await canvas.convertToBlob({
          type: "image/jpeg",
          quality,
        });
        const file = new File([blob], newName, { type: "image/jpeg" });

        resolve(file);
      },
      { once: true }
    );

    img.src = input;
  });
}
