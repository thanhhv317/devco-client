import React, { Component } from "react";
import { withAlert } from "react-alert";
import { domain } from "../../utils/config";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      comment: "",
    };
  }

  onChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  onSubmit = () => {
    const { alert, postId } = this.props;
    const { name, email, comment } = this.state;
    if (name === "" || email === "" || comment === "") {
      alert.show("Không được để trống!");
      return;
    }
    const checkEmailPattent = /[a-zA-Z-0-9\.\_]{1,}\@gmail\.com$/g;
    if (!checkEmailPattent.test(email)) {
      alert.error("Email không đúng");
      return;
    }
    const url = domain + `comments/create`;
    const data = {
      name,
      email,
      comment,
      postId,
    };
    const fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status) {
            alert.success("Bình luận của bạn đang chờ xét duyệt!");
            this.setState({
              name: "",
              email: "",
              comment: "",
            });
          }
        },
        (error) => {
          alert.error("Vui lòng thử  lại!");
        }
      );
  };

  render() {
    const { name, comment, email } = this.state;
    return (
      <div>
        <article>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <div className="section-row">
                  <div className="section-title">
                    <h2>Bình luận:</h2>
                    <p>
                      Địa chỉ email của bạn sẽ không được công bố. Các trường
                      bắt buộc được đánh dấu *
                    </p>
                  </div>
                  <form className="post-reply" id="form">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <span>Name *</span>
                          <input
                            className="input"
                            type="text"
                            name="name"
                            onChange={(e) => this.onChange(e)}
                            value={name}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <span>Email *</span>
                          <input
                            className="input"
                            type="email"
                            name="email"
                            onChange={(e) => this.onChange(e)}
                            value={email}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            className="input col-12"
                            name="comment"
                            placeholder="Message"
                            onChange={(e) => this.onChange(e)}
                            value={comment}
                          />
                        </div>
                        <button
                          type="button"
                          id="send-comment"
                          className="btn btn-primary primary-button"
                          onClick={this.onSubmit}
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </article>
        <br />
      </div>
    );
  }
}

export default withAlert()(Comment);
