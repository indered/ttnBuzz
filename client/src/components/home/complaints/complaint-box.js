import React, { Component } from "react";
import "./complaint-style.css";
import { connect } from "react-redux";
import { postComplaint } from "../../../actions/complaint-actions";

class ComplaintBox extends Component {
  state = {
    complaint: {
      department: ["Administration", "HR", "IT"],
      issueTitle: "",
      concern: ""
    },
    picture: {}
  };

  componentDidMount() {
    const userDepartment = this.props.user.department;
    const departments = this.state.complaint.department.filter(
      d => d !== userDepartment
    );
    this.setState({
      complaint: {
        department: departments[0]
      }
    });
  }

  attachmentHandler = e => {
    this.setState({
      picture: e.target.files[0]
    });
  };

  handleSubmit = (e, complaint) => {
    e.preventDefault();

    if (this.state.picture.name) {
      const image = new FormData();

      image.append("image", this.state.picture);
      this.props.postComplaint(complaint, image);
    } else {
      this.props.postComplaint(complaint, false);
    }
    this.toggleSubmit();
  };

  handleChange = event => {
    let complaint = { ...this.state.complaint };
    complaint[event.target.name] = event.target.value;

    this.setState({
      complaint: complaint
    });
  };

  toggleSubmit = () => {
    this.setState({
      complaint: {
        department: this.state.complaint.department,
        issueTitle: "",
        concern: ""
      },

      picture: {}
    });
    this.refs.attachmentComp.value = "";
  };

  render() {
    return (
      <div className="complaint-comp">
        <div id="complaintBoxTitle">
          <i className="fas fa-bug" />
          Complaint Box
        </div>

        <form
          id="complaintBox"
          onSubmit={e => this.handleSubmit(e, this.state.complaint)}
          encType="multipart/form-data"
        >
          <label className="complaint-box-label">Department:</label>
          <select
            required
            className="select-menu department-select"
            name="department"
            value={this.state.complaint.department}
            onChange={this.handleChange}
          >
            {this.props.user.department !== "Administration" && (
              <option className="options" value="Administration">
                Administration
              </option>
            )}
            {this.props.user.department !== "IT" && (
              <option className="options" name="department" value="IT">
                IT
              </option>
            )}
            {this.props.user.department !== "HR" && (
              <option className="options" name="department" value="HR">
                HR
              </option>
            )}
          </select>
          <label className="complaint-box-label">Issue Title:</label>
          <input
            onChange={this.handleChange}
            name="issueTitle"
            required
            value={this.state.complaint.issueTitle}
            placeholder="Enter the issue title..."
            className="w3-input issueTitle"
            type="text"
            maxLength={100}
          />
          <label className="complaint-box-label">Your Concern:</label>
          <textarea
            rows="2"
            cols="50"
            value={this.state.complaint.concern}
            className="concern"
            placeholder="tell us your concern..."
            required
            onChange={this.handleChange}
            name="concern"
            maxLength={300}
            type="text"
          />

          <input
            className="attachment-comp"
            name="picture"
            type="file"
            accept="image/*"
            ref="attachmentComp"
            onChange={e => this.attachmentHandler(e)}
          />

          {(() => {
            if (!this.props.loadingWhilePosting)
              return (
                <button type="submit" className="complaint-submit-btn">
                  Submit
                </button>
              );
            else return <div className="border" />;
          })()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    complaints: state.complaint.complaints,
    loadingWhilePosting: state.complaint.loadingWhilePosting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postComplaint: (complaint, image) =>
      dispatch(postComplaint(complaint, image))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplaintBox);
