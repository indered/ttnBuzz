import React, { Component } from "react";
import { connect } from "react-redux";
import { commentBuzz } from "../../../actions/buzz-actions";

class Comment extends Component {
  state = {
    comment: {
      text: ""
    }
  };

  handleSubmit = (e, comment) => {
    e.preventDefault();
    this.props.commentBuzz(this.props.buzzId, comment);
    this.toggleSubmit();
  };

  toggleSubmit = () => {
    this.setState({
      comment: {
        text: ""
      }
    });
  };

  handleChange = event => {
    let comment = { ...this.state.comment };
    comment.text = event.target.value;

    this.setState({
      comment: comment
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e, this.state.comment)}>
          <input
            onChange={this.handleChange}
            name="text"
            required
            value={this.state.comment.text}
            placeholder="Comment..."
            className="w3-input Comment"
            type="text"
            maxLength={100}
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    commentBuzz: (buzzId, comment) => dispatch(commentBuzz(buzzId, comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
