import React from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css"; // Import the default styles for Rodal
import "./styles/modal.css";
import Suggestions from "./SuggestionsDomain";

const EvaluationFileModal = ({ visible, hide, dataList }) => {
  const [size, setSize] = React.useState("auto");
  React.useEffect(() => {
    // Your useEffect logic here
  }, [dataList]);

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
        overflow: "scroll",
      }}
    >
      <h2>Kết quả đánh giá</h2>
      <i>*Kết quả dự đoán từ model ngôn ngữ có tính chất kham khảo</i>
      <div style={{ overflow: "scroll", width: "100%", height: "600px" }}>
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
              <th>
                Kết quả <i style={{ fontSize: "9px" }}>{`(*)`}</i>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index}>
                <td style={{ fontSize: "14px" }}>{data.domain}</td>
                <td style={{ fontSize: "14px" }}>{data.entropy}</td>
                <td style={{ fontSize: "14px" }}>{data.percentageDigits}</td>
                <td style={{ fontSize: "14px" }}>{data.domainLength}</td>
                <td style={{ fontSize: "14px" }}>{data.specialChars}</td>
                <td
                  style={{
                    fontSize: "14px",
                    color:
                      data.result === "Có tín nhiệm thấp" ? "red" : "black",
                  }}
                >
                  {data.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <i>
        *Entropy là một thước đo mức độ ngẫu nhiên hoặc phức tạp của chuỗi ký
        tự.
      </i>
      <br />
    </Rodal>
  );
};

export default EvaluationFileModal;
