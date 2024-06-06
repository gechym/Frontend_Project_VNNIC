import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const DragAndDropFileUpload = ({ file, handleRemoveFile,setError, onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 200 * 1024) {
        // 200KB in bytes
        setError("Vui lòng tải lên tệp có kích thước nhỏ hơn 200KB")
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
          <>
            <p styl>Kéo thả hoặc chọn file</p><br/>
          </>
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
    border: "1px solid ",
    borderRadius: "4px",
    height: "160px",
    margin: "0px 340px",
    textAlign: "center",
    cursor: "pointer",
    color: "black",
    borderColor: '#979A9A',
    flexDirection: "column"
  },
  cancelBtn: {
    height: "30px",
    fontSize: "14px",
    fontFamily: "Arial",
    backgroundColor: "#FF6600",
    borderRadius: "8px",
    border: "none",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
};

export default DragAndDropFileUpload;
