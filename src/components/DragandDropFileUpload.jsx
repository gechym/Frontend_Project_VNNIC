
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDropFileUpload = ({ file, handleRemoveFile, onFileUpload }) => {
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
        ) : file ? (
          file.name
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
        <button
          onClick={(e) => {
            var evt = e ? e : window.event;
            if (evt.stopPropagation) evt.stopPropagation();
            if (evt.cancelBubble != null) evt.cancelBubble = true;
            handleRemoveFile();
          }}
          style={{
            ...styles.cancelBtn,
            visibility: file ? "visible" : "hidden",
          }}
        >
          Bỏ chọn
        </button>
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
    margin: "0px 340px",
    textAlign: "center",
    cursor: "pointer",
    color: "black",
  },
  cancelBtn: {
    height: "30px",
    fontSize: "14px",
    fontFamily: "Arial",
    backgroundColor: "#FF6600",
    borderRadius: "8px",
    border: "none",
    margin: "20px 0px",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
};

export default DragAndDropFileUpload;