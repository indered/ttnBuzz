import React from "react";
import ComplaintBox from "./complaint-box";
import YourComplaints from "./your-complaints";

import { connect } from "react-redux";

function Complaints(props) {
  return (
    <div className="body-content">
      <ComplaintBox />
      <YourComplaints />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    notify: state.complaint.notify
  };
};

export default connect(mapStateToProps)(Complaints);
