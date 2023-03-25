import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p>
                Chào mừng đến với trang blog của ThanhHV - nơi chia sẻ kiến thức
                và kinh nghiệm về lập trình! Trang web này được tạo ra với mục
                đích giúp các lập trình viên, sinh viên và những người đam mê
                công nghệ có thêm những kiến thức cần thiết để phát triển kỹ
                năng lập trình của mình. Với những bài viết chất lượng và phong
                phú về các chủ đề liên quan đến lập trình, chúng tôi mong muốn
                mang lại cho độc giả những thông tin hữu ích và thú vị nhất!
              </p>

              <p>
                <a
                  href="https://me.momo.vn/qr-page/P2P/thanhhv317998/JxboZ6PX1MrBagw"
                  target="_blank"
                >
                  Buy me a coffee
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
