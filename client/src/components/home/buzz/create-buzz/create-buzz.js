import React from "react";
import "../buzz-style.css";
import { postBuzz } from "../../../../actions/buzz-actions";
import posed from "react-pose";
import "./create-buzz-style.css";
import { connect } from "react-redux";
import SimpleSelect from "./category-select";

class CreateBuzz extends React.Component {
  state = {
    buzz: {
      text: "",
      category: "Activity"
    },

    picture: {}
  };

  toggleSubmit = () => {
    this.setState({
      buzz: {
        text: "",
        category: "Activity"
      },

      picture: {}
    });
    this.refs.attachment.value = "";
  };

  handleCategory = category => {
    let buzz = { ...this.state.buzz };
    buzz.category = category;
    this.setState({
      buzz: buzz
    });
  };

  handleChange = e => {
    let buzz = { ...this.state.buzz };
    buzz[e.target.name] = e.target.value;
    this.setState({
      buzz: buzz
    });
  };

  attachmentHandler = e => {
    this.setState({
      picture: e.target.files[0]
    });
  };

  handleSubmit = (e, buzz) => {
    e.preventDefault();
    if (this.state.picture.name) {
      const image = new FormData();

      image.append("image", this.state.picture);
      this.props.postBuzz(buzz, image);
    } else {
      this.props.postBuzz(buzz, false);
    }

    this.toggleSubmit();
  };
  render() {
    return (
      <div className="form">
        <div id="formTitle">
          <i className="fab fa-twitter" />
          Create Buzz
        </div>
        <form
          id="create-buzz"
          onSubmit={e => this.handleSubmit(e, this.state.buzz)}
          encType="multipart/form-data"
        >
          <textarea
            rows="3"
            cols="50"
            className="fields"
            placeholder="Share your thoughts..."
            required
            onChange={this.handleChange}
            value={this.state.buzz.text}
            name="text"
            type="text"
            maxLength={200}
          />
          <div id="lower-form">
            <SimpleSelect
              category={this.state.buzz.category}
              handleCategory={this.handleCategory}
            />

            <input
              className="attachment"
              name="attachment"
              type="file"
              accept="image/*"
              ref="attachment"
              onChange={e => this.attachmentHandler(e)}
            />

            {(() => {
              if (!this.props.loadingWhilePosting)
                return (
                  <ShareButton
                    className={["fas", "fa-paper-plane"].join(" ")}
                    type="submit"
                    form="create-buzz"
                  />
                );
              else return <div className="border" />;
            })()}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingWhilePosting: state.buzz.loadingWhilePosting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBuzz: (buzz, image) => dispatch(postBuzz(buzz, image))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBuzz);

const ShareButton = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.8 },
  hoverable: true,

  hover: {
    scale: 1.2
  }
});
