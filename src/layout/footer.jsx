function Footer() {
  return (
    <footer>
      <div id="footer">
        <div className="footer-container">
          <section className="social-media">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <a className="social-logo" href="https:/vnnic.vn">
                  <img src="/themes/img/logo.png" alt="" />
                </a>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="footer-info-items">
                  <div className="footer-info-title">
                    TRUNG TÂM INTERNET VIỆT NAM
                  </div>
                  <span className="footer-info-lighter"
                    >Địa chỉ:
                    <span className="footer-info"> 18 Nguyễn Du, Hà Nội</span></span
                  >
                  <span className="footer-info-lighter"
                    >Điện thoại:
                    <span className="footer-info"> +84-24-35564944</span>
                  </span>
                  <span className="footer-info-lighter"
                    >Email:
                    <span className="footer-info-mark"
                      >domain-support@vnnic.vn
                    </span></span>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="footer-social">
                  <br />
                  <span className="footer-info-lighter">Kết nối với chúng tôi</span>
                  <div className="social-icons">
                    <a target="_blank" href="https://www.facebook.com/myVNNIC/"
                      ><i className="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
                    <a
                      target="_blank"
                      href="https://www.youtube.com/channel/UCLvuvINvucsfLAPrasmz9Cw"
                      ><i className="fa-brands fa-youtube" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  )
}

export default Footer
