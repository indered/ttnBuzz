import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import "./buzz-style.css";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: theme.spacing(3, 2)
  },
  like: {
    margin: theme.spacing(2),
    "&:hover": {
      color: "rgb(53, 117, 107)"
    }
  },
  likeBlue: {
    margin: theme.spacing(2),
    color: "#23677c",
    "&:hover": {
      color: "rgb(53, 117, 107)"
    }
  },
  dislike: {
    margin: theme.spacing(2),
    "&:hover": {
      color: "#cf8018"
    }
  },
  dislikeBlue: {
    margin: theme.spacing(2),
    color: "#cf8018",
    "&:hover": {
      color: "#cf8018"
    }
  },

  card: {
    maxWidth: "90%",
    margin: "10px 0",
    position: "relative"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    color: "grey"
  },
  avatar: {
    backgroundColor: red[500]
  },
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

export default function BuzzCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  function handleLike() {
    const isLiked = props.buzz.reactions.filter(
      reaction =>
        reaction.reactedBy.id === props.user._id && reaction.type === "like"
    );

    if (!isLiked.length) props.reactBuzz(props.buzz._id, "like");
    else props.unreactBuzz(props.buzz._id);
  }
  function handleDislike() {
    const isDisiked = props.buzz.reactions.filter(
      reaction =>
        reaction.reactedBy.id === props.user._id && reaction.type === "dislike"
    );

    if (!isDisiked.length) props.reactBuzz(props.buzz._id, "dislike");
    else props.unreactBuzz(props.buzz._id);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="Recipe"
            alt="profile-image"
            src={props.buzz.postedBy.picture}
            className={[classes.avatar, "buzzAvatar"].join(" ")}
          />
        }
        action={(() => {
          if (props.buzz.postedBy._id == props.user._id)
            return (
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon
                    onClick={() => props.deleteBuzz(props.buzz._id)}
                  />
                </IconButton>
              </Tooltip>
            );
        })()}
        title={(() => (
          <h4 className="name-on-card"> {props.buzz.postedBy.username}</h4>
        ))()}
        subheader={(() => {
          return <Moment date={props.buzz.createdAt} durationFromNow />;
        })()}
      />
      {(() => {
        if (props.buzz.picture)
          return (
            <CardMedia
              className={classes.media}
              image={props.buzz.picture}
              title={props.buzz.category}
            />
          );
      })()}

      <CardContent>
        <h3 className="buzztext">{props.buzz.text}</h3>
        <h6 className="category">{props.buzz.category}</h6>
      </CardContent>
      <CardActions disableSpacing>
        {(() => {
          const like = props.buzz.reactions.filter(reaction => {
            return (
              reaction.reactedBy.id === props.user._id &&
              reaction.type == "like"
            );
          });
          const likes = props.buzz.reactions.filter(
            reaction => reaction.type == "like"
          );

          if (like.length)
            return (
              <React.Fragment>
                <IconButton
                  onClick={handleLike}
                  className={clsx(classes.likeBlue, "fas fa-thumbs-up like")}
                />
                <span className="react-count"> {likes.length}</span>{" "}
              </React.Fragment>
            );
          else
            return (
              <React.Fragment>
                <IconButton
                  onClick={handleLike}
                  className={clsx(classes.like, "fas fa-thumbs-up like")}
                />
                <span className="react-count"> {likes.length}</span>
              </React.Fragment>
            );
        })()}

        {(() => {
          const dislike = props.buzz.reactions.filter(reaction => {
            return (
              reaction.reactedBy.id === props.user._id &&
              reaction.type == "dislike"
            );
          });

          const dislikes = props.buzz.reactions.filter(
            reaction => reaction.type == "dislike"
          );

          if (dislike.length)
            return (
              <React.Fragment>
                <IconButton
                  onClick={handleDislike}
                  className={clsx(
                    classes.dislikeBlue,
                    "fas fa-thumbs-down dislike"
                  )}
                />
                <span className="react-count"> {dislikes.length}</span>
              </React.Fragment>
            );
          else
            return (
              <React.Fragment>
                <IconButton
                  onClick={handleDislike}
                  className={clsx(
                    classes.dislike,
                    "fas fa-thumbs-down dislike"
                  )}
                />
                <span className="react-count"> {dislikes.length}</span>
              </React.Fragment>
            );
        })()}

        <IconButton
          className={clsx(classes.expand, "fas fa-comment-alt comment", {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.buzz.comments.map(comment => {
            return (
              <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                  {comment.commentedBy.name}
                </Typography>
                <Typography component="p">{comment.text} </Typography>
              </Paper>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
