import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css'; // Import the default styles for Rodal
import './styles/modal.css';
import Suggestions from './SuggestionsDomain';

const EvaluationModal = ({ visible, hide, data }) => {
    return (
        <Rodal visible={visible} onClose={hide} customStyles={{ fontSize : "12px" , height: '60%', width: '60%' }}>
                <h2>Kết quả đánh giá</h2>
                <table className="evaluation-table">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Entropy <i style={{ fontSize : "9px"}}>{`(*)`}</i>
                            </th>
                            <th>Phần trăm chữ số</th>
                            <th>Độ dài domain</th>
                            <th>Số tự đặt biệt</th>
                            <th>Kết quả <i style={{ fontSize : "9px"}}>{`(*)`}</i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{fontSize:'14px'}}>{data.url}</td>
                            <td style={{fontSize:'14px'}}>{data.entropy}</td>
                            <td style={{fontSize:'14px'}}>{data.percentageDigits}</td>
                            <td style={{fontSize:'14px'}}>{data.domainLength}</td>
                            <td style={{fontSize:'14px'}}>{data.specialChars}</td>
                            <td style={{fontSize:'14px'}}>{data.result}</td>
                        </tr>
                    </tbody>
                </table>
                <i>*Entropy là một thước đo mức độ ngẫu nhiên hoặc phức tạp của chuỗi ký tự.</i>
                <br/>
                <i>*Kết quả dự đoán từ model ngôn ngữ có tính chất kham khảo</i>
                {
                    data.result === "Có tín nhiệm thấp" ? <Suggestions /> : ""
                }
                
        </Rodal>
    );
};

export default EvaluationModal;