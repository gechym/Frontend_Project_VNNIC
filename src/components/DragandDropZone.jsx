import React, { useState } from "react";
import { useDrop } from "react-dropzone"; // Import library

const DragAndDropZone = ({ onFileLoad }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [{ getRootProps, getInputProps }] = useDrop(() => ({
    accept: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME types
      "application/vnd.ms-excel",
    ],
    onDragEnter: () => setIsDraggingOver(true),
    onDragLeave: () => setIsDraggingOver(false),
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 200000) {
        // Check file size in bytes
        alert("File size exceeds 200KB limit!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        onFileLoad(data); // Send data to server
      };
      reader.readAsArrayBuffer(file);
    },
  }));

  const dropzoneStyle = {
    width: 250,
    height: 150,
    border: "2px dashed #ccc",
    backgroundColor: isDraggingOver ? "#eee" : "#fff",
    padding: 20,
    borderRadius: 5,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDraggingOver ? (
        <p>Drop your Excel file here</p>
      ) : (
        <p>
          Drag and drop an Excel file (max 200KB) or <br />
          Click to select a file
        </p>
      )}
    </div>
  );
};

export default DragAndDropZone;
