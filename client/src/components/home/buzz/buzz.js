import React, { Component } from "react";
import CreateBuzz from "./create-buzz/create-buzz";
import { connect } from "react-redux";
import {
  getBuzz,
  deleteBuzz,
  reactBuzz,
  unreactBuzz,
  deleteComment,
  deleteBuzzFromStrore
} from "../../../actions/buzz-actions";
import BuzzCard from "./recent-buzz";
import "./buzz-style.css";

class Buzz extends Component {
  state = {
    skip: 0,
    limit: 5
  };

  handleLoadMore = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (
      scrollTop + clientHeight + 500 >= scrollHeight &&
      !this.props.allBuzzFetched
    ) {
      this.getMoreBuzz();
    }
  };

  componentDidMount() {
    this.props.getBuzz(0, 5);

    window.addEventListener("scroll", this.handleLoadMore);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleLoadMore);
    this.props.deleteBuzzFromStrore();
  }

  getMoreBuzz = () => {
    this.setState(
      {
        skip: this.state.skip + 1,
        limit: 5
      },
      () => this.props.getBuzz(this.state.skip * 5, this.state.limit)
    );
  };

  handleDelete = buzzId => {
    this.props.deleteBuzz(buzzId);
  };

  handleCommentDelete = (buzzId, commentId) => {
    this.props.deleteComment(buzzId, commentId);
  };

  handleReaction = (buzzId, reaction) => {
    this.props.reactBuzz(buzzId, reaction);
  };

  render() {
    return (
      <div className="body-content">
        <CreateBuzz />
        {(() => {
          if (this.props.buzzs.length)
            return (
              <div className="recentBuzz">
                <div className="recentBuzzHeading">
                  <i className="fas fa-rss buzz-icon" />
                  <span className="recent-text"> Recent Buzz</span>
                </div>

                {this.props.buzzs.map(buzz => {
                  return (
                    <BuzzCard
                      deleteBuzz={this.handleDelete}
                      reactBuzz={this.handleReaction}
                      unreactBuzz={this.props.unreactBuzz}
                      user={this.props.user}
                      buzz={buzz}
                      key={buzz._id}
                      handleCommentDelete={this.handleCommentDelete}
                    />
                  );
                })}

                {this.props.loadingWhileGetting && <div className="loader" />}
                {this.props.allBuzzFetched && (
                  <p className="no-more-content">No More Content!</p>
                )}
              </div>
            );
        })()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buzzs: state.buzz.buzzs,
    user: state.user,
    loadingWhileGetting: state.buzz.loadingWhileGetting,
    allBuzzFetched: state.buzz.allBuzzFetched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBuzz: (skip, limit) => dispatch(getBuzz(skip, limit)),
    deleteBuzz: id => dispatch(deleteBuzz(id)),
    reactBuzz: (buzzId, reaction) => dispatch(reactBuzz(buzzId, reaction)),
    unreactBuzz: buzzId => dispatch(unreactBuzz(buzzId)),
    deleteComment: (buzzId, commentId) =>
      dispatch(deleteComment(buzzId, commentId)),
    deleteBuzzFromStrore: () => dispatch(deleteBuzzFromStrore())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buzz);
