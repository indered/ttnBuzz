import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import "./resolve-style.css";
import moment from "moment";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

export default function SimpleModal(props) {
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Button onClick={handleOpen}>
        <p className="id-btn">{props.cid}</p>
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <button
            className="modal-close-btn fas fa-times"
            onClick={handleClose}
          />
          <h5 className="issue-title-on-modal"> {props.issueTitle}</h5>

          <h6 className="concern-on-modal"> {props.concern}</h6>

          {props.picture && (
            <img
              src={props.picture}
              className="complaint-img"
              alt="compliant"
            />
          )}
          <p className="status-on-modal">Status: {props.status}</p>
          <p className="to-on-modal">Posted By: {props.postedBy}</p>
          <p className="date-on-modal">
            {moment(props.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
      </Modal>
    </div>
  );
}
