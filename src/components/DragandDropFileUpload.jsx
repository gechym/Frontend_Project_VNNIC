// src/DragAndDropFileUpload.js

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDropFileUpload = ({ onFileUpload }) => {
  const [error, setError] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 200 * 1024) {
        // 200KB in bytes
        setError("File size exceeds 200KB. Please upload a smaller file.");
        console.log("File size exceeds 200KB. Please upload a smaller file.");
        return;
      }
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  dropzone: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    border: "2px solid black",
    borderRadius: "4px",
    height: "160px",
    margin: "0px 170px",
    textAlign: "center",
    cursor: "pointer",
    color: "black",
  },
};

export default DragAndDropFileUpload;