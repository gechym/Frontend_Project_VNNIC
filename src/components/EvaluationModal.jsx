import React from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css"; // Import the default styles for Rodal
import "./styles/modal.css";
import Suggestions from "./SuggestionsDomain";

const EvaluationModal = ({ visible, hide, data }) => {
  const [size, setSize] = React.useState("auto");
  console.log(data)
  React.useEffect(() => {
    if (data.result === "Có tín nhiệm thấp") {
      setSize("auto");
    }

    if (data.result === "Bình thường") {
      setSize("40%");
    }
  });

  return (
    <Rodal
      onKeyDown={(e) => {
        if (e.key === "esc") hide();
      }}
      visible={visible}
      onClose={hide}
      customStyles={{
        fontSize: "12px",
        height: size,
        maxHeight: "80%",
        width: "60%",
      }}
    >
      <span style={{ fontSize: "20px" }}>Kết quả đánh giá: </span>
      {data.urlLegit ? <>
        <span
          style={{
            fontSize: "18px",
            color: "red",
          }}
        >
          Nghi vấn giả mạo
        </span>
      </> :
        <>
          <span
            style={{
              fontSize: "18px",
              color: data.result === "Có tín nhiệm thấp" ? "red" : "black",
            }}
          >
            {data.result}
          </span>
        </>}
      {data.urlLegit ? <>
        <br />
        <i style={{ fontSize: "14px", margin: "5px" }}>Domain uy tín: <a href={`https://${data.urlLegit}  `} target="_blank" rel="noopener noreferrer">{data.urlLegit}</a> </i>
      </> :
        <>
        </>}
      <br />
      <table className="evaluation-table">
        <thead>
          <tr>
            <th>URL</th>
            <th>
              Entropy <i style={{ fontSize: "9px" }}>{`(*)`}</i>
            </th>
            <th>Phần trăm chữ số</th>
            <th>Độ dài domain</th>
            <th>Số tự đặt biệt</th>
            <th>Thể loại</th>
            <th>Từ khóa</th>
            <th>
              Kết quả <i style={{ fontSize: "9px" }}>{`(*)`}</i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: "14px" }}>{data.url}</td>
            <td style={{ fontSize: "14px" }}>{data.entropy}</td>
            <td style={{ fontSize: "14px" }}>{data.percentageDigits}</td>
            <td style={{ fontSize: "14px" }}>{data.domainLength}</td>
            <td style={{ fontSize: "14px" }}>{data.specialChars}</td>
            <td style={{ fontSize: "14px" }}>{data.typeDomain}</td>
            <td style={{ fontSize: "14px" }}>{data.wordSensitive}</td>
            {data.urlLegit ? <>
              <td
                style={{
                  fontSize: "14px",
                  color: "red",
                }}
              >
                Nghi vấn giả mạo
              </td>
            </> :
              <>
                <td
                  style={{
                    fontSize: "14px",
                    color: data.result === "Có tín nhiệm thấp" ? "red" : "black",
                  }}
                >
                  {data.result}
                </td>
              </>}
          </tr>
        </tbody>
      </table>

      <i>
        *Entropy là một thước đo mức độ ngẫu nhiên hoặc phức tạp của chuỗi ký
        tự.
      </i>
      <br />
      <i>*Kết quả dự đoán từ model ngôn ngữ có tính chất kham khảo</i>
      {data.result === "Có tín nhiệm thấp" ? <Suggestions /> : ""}
    </Rodal>
  );
};

export default EvaluationModal;
