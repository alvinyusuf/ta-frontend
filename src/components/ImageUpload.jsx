import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUpload({ onFileSelected }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        if (onFileSelected) onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const clearImage = () => {
    setPreview(null);
    if (onFileSelected) onFileSelected(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
        isDragActive ? "bg-blue-100 border-blue-400" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative inline-block mx-auto max-h-64">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg max-h-64"
            style={{ display: "block" }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearImage();
            }}
            className="absolute text-white top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-400 hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md"
            aria-label="Hapus gambar"
          >
            &times;
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Drag & drop image here, or click to select</p>
      )}
    </div>
  );
}
