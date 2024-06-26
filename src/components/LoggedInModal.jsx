import React from "react";
import Rodal from "rodal";
import axios from "axios";
import "rodal/lib/rodal.css"; // Import the default styles for Rodal
import "./styles/modal.css";

const LoggedInModal = ({ visible, hide, dataList }) => {
  const [size, setSize] = React.useState("auto");

  const API_BASE_URL = "http://127.0.0.1:8000";

  React.useEffect(() => {}, [dataList]);

  const initializeStatus = (dataList) => {
    return dataList.map((data) => ({
      ...data,
      status: data.status || "Bình thường",
    }));
  };

  //bien luu du lieu sau khi add status field vao dataList
  const [localDataList, setLocalDataList] = React.useState(
    initializeStatus(dataList)
  );

  React.useEffect(() => {
    setLocalDataList(initializeStatus(dataList));
  }, [dataList]);

  const handleChecked = (index) => (e) => {
    const newDataList = [...localDataList];
    newDataList[index].status = e.target.checked
      ? "Cần xem xét lại"
      : "Bình thường";
    setLocalDataList(newDataList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/saveEvaluationData`, { evaluations: localDataList });
      alert("Data successfully submitted!");
      hide();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
    //console.log(localDataList);
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
      <h2>Kết quả đánh giá</h2>
      <i>*Kết quả dự đoán từ model ngôn ngữ có tính chất kham khảo</i>
      <form onSubmit={handleSubmit}>
        <div style={{ overflow: "scroll", width: "100%", height: "450px" }}>
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
                      onChange={handleChecked(index)}
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
        <button
          type="submit"
          style={{
            backgroundColor: "#F37032",
            outline: "none",
            height: "40px",
            width: "100px",
            fontSize: "14px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          Lưu đánh giá
        </button>
      </form>
    </Rodal>
  );
};

export default LoggedInModal;
