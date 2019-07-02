import React, { Component } from "react";
import { connect } from "react-redux";
import { getYourComplaints } from "../../../actions/complaint-actions";
import ComplaintModal from "./complaint-modal";
import "./complaint-style.css";
class YourComplaints extends Component {
  state = { skip: 0 };

  getMoreComplaints = () => {
    if (this.state.skip !== this.props.count)
      this.setState(
        {
          skip: this.state.skip + 1
        },
        () => this.props.getYourComplaints(this.state.skip * 5, 5)
      );
  };

  getPreviousComplaints = () => {
    this.setState(
      {
        skip: this.state.skip - 1
      },
      () => this.props.getYourComplaints(this.state.skip * 5, 5)
    );
  };

  componentDidMount() {
    this.props.getYourComplaints(0, 5);
  }

  render() {
    return this.props.complaints.length ? (
      <div className="table-container">
        <div className="your-comp-title">
          Your Complaints
          {(this.state.skip + 1) * 5 < this.props.count && (
            <button
              className="fas fa-chevron-right"
              onClick={this.getMoreComplaints}
            />
          )}
          {(() => {
            if (this.state.skip)
              return (
                <button
                  className="fas fa-chevron-left"
                  onClick={this.getPreviousComplaints}
                />
              );
          })()}
        </div>

        <table className="your-complaints-table">
          <tbody>
            <tr>
              <th className="department">Department</th>
              <th className="cid"> Issue ID</th>
              <th className="issue-title">Issue Title</th>
              <th className="assigned-to">Assigned To</th>
              <th className="status">Status </th>
            </tr>
            {this.props.complaints.map(c => {
              return (
                <tr key={c._id}>
                  <td className="department">{c.department}</td>
                  <td className="cid">
                    <ComplaintModal
                      issueTitle={c.issueTitle}
                      cid={c._id}
                      concern={c.concern}
                      department={c.department}
                      createdAt={c.createdAt}
                      picture={c.picture}
                      assignedTo={c.assignedTo.username}
                      status={c.status}
                    />
                  </td>
                  <td className="issue-title">{c.issueTitle}</td>
                  <td className="assigned-to">{c.assignedTo.username}</td>

                  {c.status === "Open" && (
                    <td className="status-open">{c.status}</td>
                  )}

                  {c.status === "In progress" && (
                    <td className="status-progress">{c.status}</td>
                  )}

                  {c.status === "Closed" && (
                    <td className="status-closed">{c.status}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <React.Fragment />
    );
  }
}

const mapStateToProps = state => {
  return {
    complaints: state.complaint.complaints,
    allYourComplaintsFetched: state.complaint.allYourComplaintsFetched,
    count: state.complaint.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getYourComplaints: (skip, limit) => dispatch(getYourComplaints(skip, limit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourComplaints);
