import React from "react";
import EvaluationModal from "../components/EvaluationModal";
import "rodal/lib/rodal.css";
import DragAndDropFileUpload from "../components/DragandDropFileUpload";

function Header() {
  const [domain, setDomain] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState("Model PhoBert");
  
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [file, setFile] = React.useState(null);
  // const
  const HOST = "113.160.235.186";

  // handle fetch data
  const infer = async () => {
    if (!domain) {
      setError("Vui lòng nhập domain");
      return;
    }

    if (!domain.endsWith(".vn")) {
      setError("Hiện tại phạm vi dự án chỉ đánh giá tên miền .vn");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${HOST}:8000/api/infer`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: domain, model_name: selectedModel }),
      });
      console.log("nam nam");
      if (!response.ok) {
        setError("Domain không hợp lê, vui lòng thử lại");
      }
      const result = await response.json();
      setData({
        url: domain,
        entropy: result.data.entropy,
        percentageDigits: result.data.percentageDigits,
        domainLength: result.data.domainLength,
        specialChars: result.data.specialChars,
        result: result.data.result,
      });
      show();
    } catch (error) {
      setError("Có gì đó không đúng, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null)
  }
  const handleFileUpload = async (file) => {
    setFile(file)
    console.log("posting file...");
    console.log(file);
    
    // try {
    //  setLoading(true);
    //  formData.append("file", file);
    //  const formData = new FormData();
    //   const response = await fetch(`http://${HOST}:8000/api/infer`, {
    //     method: "post",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ file: formData, model_name: selectedModel }),
    //   });
    //   console.log("posted file!");
    //   setExcelData(response.json());
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
    setData(null);
    setDomain("");
  };
  return (
    <>
      <header>
        {data ? (
          <EvaluationModal visible={visible} hide={hide} data={data} />
        ) : null}
        <div id="homepage-header">
          <div id="menu-mobile" className="hidden-lg hidden-md">
            <div className="menu-mb__head">
              <div className="menu-mb__logo">
                <a href="https://www.vnnic.vn/">
                  <img
                    src="https://tenmien.vn/themes/img/sub_logo.png"
                    alt="sub_logo"
                  />
                </a>
              </div>
              <div className="menu-mb__close">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M11.1047 10.0008L19.7709 1.33445C20.0761 1.02933 20.0761 0.534647 19.7709 0.22957C19.4658 -0.0755077 18.9711 -0.0755467 18.6661 0.22957L9.99975 8.89588L1.33347 0.22957C1.02836 -0.0755467 0.533671 -0.0755467 0.228593 0.22957C-0.0764842 0.534687 -0.0765233 1.02937 0.228593 1.33445L8.89487 10.0007L0.228593 18.667C-0.0765233 18.9722 -0.0765233 19.4668 0.228593 19.7719C0.381132 19.9245 0.581093 20.0007 0.781053 20.0007C0.981014 20.0007 1.18094 19.9245 1.33351 19.7719L9.99975 11.1056L18.666 19.7719C18.8186 19.9245 19.0185 20.0007 19.2185 20.0007C19.4184 20.0007 19.6184 19.9245 19.7709 19.7719C20.0761 19.4668 20.0761 18.9721 19.7709 18.667L11.1047 10.0008Z"
                      fill="#C3C7CB"
                    ></path>
                  </g>
                  <defs>
                    <clippath id="clip0">
                      <rect width="20" height="20" fill="white"></rect>
                    </clippath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="menu-mb__body">
              <ul className="menu-mb__list">
                <li className="menu-mb__item main-item has-child">
                  <a title="Trang chủ" href="/">
                    Trang chủ
                  </a>
                </li>
                <li className="menu-mb__item main-item has-child">
                  <a title="Tên miền">Tên miền</a>
                  <span className="dropdown-icon">
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  </span>
                  <ul className="menu-mb__sub">
                    <li className="menu-mb__sub-item">
                      <a href="/dang-ky-ten-mien">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                        Đăng ký tên miền
                      </a>
                    </li>
                    <li className="menu-mb__sub-item">
                      <a href="/nha-dang-ky">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                        Nhà đăng ký
                      </a>
                    </li>
                    <li className="menu-mb__sub-item">
                      <a href="/quan-ly-ten-mien">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                        Quản lý tên miền
                      </a>
                    </li>
                    <li className="menu-mb__sub-item">
                      <a href="/tenmien/cam_nang_ten_mien_final.pdf">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                        Cẩm nang tên miền
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-mb__item main-item has-child highlight">
                  <a title="Chương trình đặc biệt">
                    Chương trình đặc biệt<span className="star">&#9733;</span>
                  </a>
                  <span className="dropdown-icon">
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  </span>
                  <ul className="menu-mb__sub">
                    <li className="menu-mb__sub-item">
                      <a href="https://guongmatso.tenmien.vn" target="_blank">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                        Chương trình id.vn
                      </a>
                    </li>
                    <li className="menu-mb__sub-item">
                      <a href="https://thuonghieuso.tenmien.vn" target="_blank">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                        Chương tình biz.vn
                      </a>
                    </li>
                    <li className="menu-mb__sub-item">
                      <a href="/tai-lieu-truyen-thong">
                        <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                        Tài liệu truyền thông
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-mb__item main-item has-child">
                  <a title="Blog" href="/blog">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="header-top" className="header-top__desktop">
            <div className="container header-top__desktop-space">
              <div className="row header-top__bound">
                <div className="col-sm-1 col-xs-1 hidden-lg hidden-md">
                  <a className="menu-bar">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.5 8.75C3.5 8.26675 3.89175 7.875 4.375 7.875H23.625C24.1082 7.875 24.5 8.26675 24.5 8.75C24.5 9.23325 24.1082 9.625 23.625 9.625H4.375C3.89175 9.625 3.5 9.23325 3.5 8.75Z"
                        fill="#041F3C"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.5 14C3.5 13.5168 3.89175 13.125 4.375 13.125H23.625C24.1082 13.125 24.5 13.5168 24.5 14C24.5 14.4832 24.1082 14.875 23.625 14.875H4.375C3.89175 14.875 3.5 14.4832 3.5 14Z"
                        fill="#041F3C"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.5 19.25C3.5 18.7668 3.89175 18.375 4.375 18.375H23.625C24.1082 18.375 24.5 18.7668 24.5 19.25C24.5 19.7332 24.1082 20.125 23.625 20.125H4.375C3.89175 20.125 3.5 19.7332 3.5 19.25Z"
                        fill="#041F3C"
                      ></path>
                    </svg>
                  </a>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                  <div className="header-top__left">
                    <div className="logo logo-desktop">
                      <a target="_blank" href="https://www.vnnic.vn/">
                        <img
                          src="https://tenmien.vn/themes/img/vnnic-logo-f.png"
                          alt="logo-vi"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-2 col-xs-2 header-top__right-space">
                  <div className="header-top__right">
                    <div className="content-nav header-top__right-bound">
                      <div className="dropdown tenmien">
                        <button
                          id="select-options"
                          className="dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          <a className="top-direction-button">Tên miền</a>
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a href="/dang-ky-ten-mien">Đăng ký tên miền</a>
                          </li>
                          <li>
                            <a href="/nha-dang-ky">Nhà đăng ký</a>
                          </li>
                          <li>
                            <a href="/quan-ly-ten-mien">Quản lý tên miền</a>
                          </li>
                          <li>
                            <a href="/tenmien/cam_nang_ten_mien_final.pdf">
                              Cẩm nang tên miền
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown top-direction-button highlight">
                        <button
                          id="select-options"
                          className="dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          <a className="top-direction-button highlight">
                            Chương trình đặc biệt
                            <span className="star">&#9733;</span>
                            <span className="caret"></span>
                          </a>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              href="https://guongmatso.tenmien.vn"
                              target="_blank"
                            >
                              Chương trình id.vn
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://thuonghieuso.tenmien.vn"
                              target="_blank"
                            >
                              Chương trình biz.vn
                            </a>
                          </li>
                          <li>
                            <a href="/tai-lieu-truyen-thong">
                              Tài liệu truyền thông
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a href="/blog" className="top-direction-button">
                        Blog
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="slide-home-index" className="slide-home">
            <div className="slide-home__item main-home__item">
              <div className="slide-home__content">
                <div className="container">
                  <div className="slide-home__title">
                    <div className="logo-in-slide">
                      <img
                        src="https://tenmien.vn/themes/img/logo_mascot.png"
                        alt="logo_in_slide"
                      />
                    </div>
                    <h1 className="main-quote">
                      Đánh giá <span className="spec-quote">tín nhiệm</span> tên
                      miền
                    </h1>
                  </div>
                  <div className="search-bar">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        maxLength="150"
                        placeholder="Nhập tiền miền bạn muốn đánh giá"
                        required="required"
                        id="label"
                        name="label"
                        value={domain}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") await infer();
                        }}
                        onChange={async (e) => {
                          setDomain(e.target.value);
                          setError(null);
                        }}
                      />
                      {/* <span className="submit-search">|</span>
                      <div className="input-group-append">
                        <select className="form-select" value={selectedModel} onChange={(e) => {setSelectedModel(e.target.value)}}>
                          <option value="Model PhoBert">Model PhoBert</option>
                          <option value="Model XML Roberta">Model XML Roberta</option>
                        </select>
                      </div> */}
                    </div>
                  </div>
                  <h4 style={{ color: "red" }}>{error ? error : ""}</h4>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "blue",
                      padding: "10px 0px",
                    }}
                  >
                    OR
                  </p>
                  <DragAndDropFileUpload file = {file} handleRemoveFile={handleRemoveFile} onFileUpload={handleFileUpload} />
                  <input
                    disabled={loading}
                    onClick={infer}
                    style={{
                      backgroundColor: "#F37032",
                      outline: "none",
                      margin: "10px 20px",
                      borderRadius: "5px",
                      color: "white",
                    }}
                    type="submit"
                    className="btn"
                    value="Đánh giá"
                  />
                </div>
              </div>
            </div>
            <div className="slide-home__item main-home__item header-card-space">
              <div className="slide-home__content header-card-group">
                <div className="header-card-item-space">
                  <a
                    className="header-card-item"
                    href="https://guongmatso.tenmien.vn"
                  >
                    <div className="header-card-item-image-space">
                      <img
                        className="header-card-item-image"
                        src="https://tenmien.vn/themes/img/id-biz-event/introducer_background.jpg"
                      />
                    </div>

                    <div className="header-card-item-text-space">
                      <div className="header-card-item-text">
                        <img
                          className="header-card-item-text-img"
                          src="https://tenmien.vn/themes/img/id-biz-event/producer_image_title_2.png"
                        />
                        <p className="header-card-item-text-content">
                          ĐỊNH DANH GƯƠNG MẶT SỐ
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="header-card-item-space">
                  <a
                    className="header-card-item"
                    href="https://thuonghieuso.tenmien.vn"
                  >
                    <div className="header-card-item-image-space">
                      <img
                        className="header-card-item-image"
                        src="https://tenmien.vn/themes/img/id-biz-event/introducer_content_image.jpg"
                      />
                    </div>

                    <div className="header-card-item-text-space">
                      <div className="header-card-item-text">
                        <img
                          className="header-card-item-text-img"
                          src="https://tenmien.vn/themes/img/id-biz-event/producer_image_title.png"
                        />
                        <p className="header-card-item-text-content">
                          ĐỊNH DANH THƯƠNG HIỆU SỐ
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
