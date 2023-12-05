export default async function resizeImage(blobs) {
  const resizedImages = [];
  const maxSize = 500;
  
  for (const blob of blobs) {
    const img = document.createElement("img");
    const url = URL.createObjectURL(blob);
    img.src = url;

    await new Promise((resolve, reject) => {
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resizedImages.push(blob);
          resolve();
        }, blob.type);
      };
      img.onerror = reject;
    });
  }
  return resizedImages;
}
