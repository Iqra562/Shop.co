import React, { useRef, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

export default function FileUpload({max_image =10}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDisabled,setIsDisabled] = useState(false)
  const [images, setImages] = useState([]);
  const MAX_IMAGES = max_image;

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

 const handleFiles = (files) => {
  const imageFiles = files.filter((file) =>
    file.type.startsWith("image/")
  );

  const remainingSlots = MAX_IMAGES - images.length;

   const limitedFiles = imageFiles.slice(0, remainingSlots);

  const previewImages = limitedFiles.map((file) => ({
      id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
  }));

  setImages((prev) => [...prev, ...previewImages]);

   if (images.length + limitedFiles.length >= MAX_IMAGES) {
    setIsDisabled(true);
  }
};

const removeImage = (id) => {
  setImages((prev) => {
    const target = prev.find((img) => img.id === id);
    if (target) URL.revokeObjectURL(target.preview);

    const updated = prev.filter((img) => img.id !== id);
    if (updated.length < MAX_IMAGES) setIsDisabled(false);
    return updated;
  });
};
   const removeAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setIsDisabled(false)   

    setImages([]);
  };

   useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <div className="w-full">
      <label className="text-gray-400 text-sm font-medium mb-4">Images</label>

      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border border-dashed rounded-xl flex flex-col items-center justify-center text-center ${isDisabled ? `cursor-not-allowed` :`cursor-pointer `} transition-all h-64 mt-2
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <div className="mb-4 text-4xl">📁</div>

        <p className="text-lg font-semibold text-gray-800">
          Drop or select files
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Drag files here, or{" "}
          <span className="text-blue-500 underline">browse</span> your device.

        </p>
        <p className="text-gray-400 font-medium text-sm">Only {max_image} product image can be selected</p>

        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
          disabled={isDisabled}
        />
      </div>

      {images.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-semibold text-gray-600">
            Selected Images ({images.length})
          </p>

          <button
            onClick={removeAll}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            Remove All
          </button>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((img, index) => (
            <div key={img.id} className="relative group w-20">
              <img
                src={img.preview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />

              <button
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 py-1 rounded-full  transition"
              >
                <RxCross2 className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
