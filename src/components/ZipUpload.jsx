// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

// export default function ZipUpload({ onFileSelected }) {
//   const [fileName, setFileName] = useState(null);

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         setFileName(file.name);
//         if (onFileSelected) onFileSelected(file);
//       }
//     },
//     [onFileSelected]
//   );

//   const clearZip = () => {
//     setFileName(null);
//     if (onFileSelected) onFileSelected(null);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/zip": [".zip"] },
//     multiple: false,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
//         isDragActive ? "bg-blue-100 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <input {...getInputProps()} />
//       {fileName ? (
//         <div className="flex items-center justify-center gap-4">
//           <span className="font-medium text-accent">{fileName}</span>
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               clearZip();
//             }}
//             className="text-white bg-red-400 hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md"
//             aria-label="Hapus file"
//           >
//             &times;
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-500">Drag & drop ZIP file here, or click to select</p>
//       )}
//     </div>
//   );
// }

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ZipUpload({ onFileSelected }) {
  const [fileName, setFileName] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        if (onFileSelected) onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const clearZip = () => {
    setFileName(null);
    if (onFileSelected) onFileSelected(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/zip": [".zip"] },
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

      {fileName ? (
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-16">
            <img
              src="/zip-96.png"
              alt="ZIP Icon"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearZip();
              }}
              className="absolute -top-2 -right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow"
              aria-label="Hapus file"
            >
              &times;
            </button>
          </div>
          <span className="font-medium text-accent text-sm text-wrap break-all text-center max-w-[200px]">
            {fileName}
          </span>
        </div>
      ) : (
        <p className="text-gray-500">Drag & drop ZIP file here, or click to select</p>
      )}
    </div>
  );
}
