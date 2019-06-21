import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";

const useStyles = makeStyles({
  avatar: {
    margin: 30,
    width: 150,
    height: 150,
    position: "absolute",
    top: "40%"
  }
});

function Profile(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Avatar
        alt="profile-image"
        src={props.user.picture}
        className={[classes.avatar, "avatar"].join(" ")}
      />
      <h1 className="username">{props.user.username}</h1>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);
