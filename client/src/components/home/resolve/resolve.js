import React, { Component } from "react";
import {
  getAdminComplaints,
  changeResolveStatus
} from "../../../actions/complaint-actions";
import { connect } from "react-redux";
import "./resolve-style.css";
import ComplaintModal from "./complaint-modal";

class Resolve extends Component {
  state = {
    skip: 0
  };

  getMoreComplaints = () => {
    if (this.state.skip !== this.props.count)
      this.setState(
        {
          skip: this.state.skip + 1
        },
        () => this.props.getAdminComplaints(this.state.skip * 5, 5)
      );
  };

  getPreviousComplaints = () => {
    this.setState(
      {
        skip: this.state.skip - 1
      },
      () => this.props.getAdminComplaints(this.state.skip * 5, 5)
    );
  };

  componentDidMount() {
    this.props.getAdminComplaints(0, 5);
  }

  handleChange = (cId, e) => {
    this.props.changeResolveStatus(cId, e.target.value);
  };

  render() {
    if (this.props.user.isAdmin === false) {
      this.props.history.push("/home/Buzz");
      return <React.Fragment />;
    } else if (this.props.complaints.length)
      return (
        <div className="body-content admin-table-container">
          <div className="admin-comp-title">
            User Complaints
            {(this.state.skip + 1) * 5 < this.props.count && (
              <button
                className="fas fa-chevron-right right-pg"
                onClick={this.getMoreComplaints}
              />
            )}
            {(() => {
              if (this.state.skip)
                return (
                  <button
                    className="fas fa-chevron-left left-pg"
                    onClick={this.getPreviousComplaints}
                  />
                );
            })()}
          </div>
          <table className="admin-complaints-table">
            <tbody>
              <tr>
                <th className="department">Department</th>
                <th className="issue-id">Issue ID</th>
                <th className="issue-title">Issue Title</th>
                <th className="posted-by">Posted By </th>
                <th className="status">Status</th>
              </tr>
              {this.props.complaints.map(c => {
                return (
                  <tr key={c._id}>
                    <td className="department">{c.department}</td>
                    <td className="issue-id">
                      <ComplaintModal
                        issueTitle={c.issueTitle}
                        cid={c._id}
                        concern={c.concern}
                        department={c.department}
                        createdAt={c.createdAt}
                        picture={c.picture}
                        postedBy={c.postedBy.username}
                        status={c.status}
                      />
                    </td>
                    <td className="issue-title">{c.issueTitle}</td>
                    <td className="posted-by">{c.postedBy.username}</td>
                    <td className="status">
                      <select
                        required
                        className="select-menu resolve-status-select"
                        name="status"
                        value={c.status}
                        onChange={e => this.handleChange(c._id, e)}
                      >
                        <option className="options option-open" value="Open">
                          Open
                        </option>
                        )}
                        <option
                          className="options option-progress"
                          value="In progress"
                        >
                          In Progress
                        </option>
                        <option
                          className="options option-closed"
                          value="Closed"
                        >
                          Closed
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    else
      return (
        <h5 id="no-resolve-complaints">You have no complaints to resolve!</h5>
      );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    complaints: state.resolve.complaints,
    allAdminComplaintsFetched: state.resolve.allAdminComplaintsFetched,
    count: state.resolve.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAdminComplaints: (skip, limit) =>
      dispatch(getAdminComplaints(skip, limit)),
    changeResolveStatus: (complaintId, status) =>
      dispatch(changeResolveStatus(complaintId, status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resolve);
