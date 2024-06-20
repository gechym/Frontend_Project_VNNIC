import React from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css"; // Import the default styles for Rodal
import "./styles/modal.css";
import axios from "axios";
import Suggestions from "./SuggestionsDomain";

const EvaluationFileModalLogged = ({ visible, hide, dataList }) => {
  const [size, setSize] = React.useState("auto");
  const [isChecked, setIsChecked] = React.useState(false);
  React.useEffect(() => {
    // Your useEffect logic here
  }, [dataList]);

  const status = isChecked ? "Cần xem xét lại" : "Bình thường";

  const handleChecked = (index) => (e) => {
    const newDataList = [...dataList];
    newDataList[index].status = e.target.checked
      ? "Cần xem xét lại"
      : "Bình thường";
    setDataList(newDataList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/saveEvaluationData", dataList);
      alert("Data successfully submitted!");
      hide(); // Hide the modal on successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
  };

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
      <form onSubmit={handleSubmit}>
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
                <th>Cần xem xét lại</th>
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
                  <td>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      value="Bình thường"
                      onChange={handleChecked}
                    />
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
        <button type="submit">Lưu đánh giá</button>
      </form>
    </Rodal>
  );
};

export default EvaluationFileModalLogged;
