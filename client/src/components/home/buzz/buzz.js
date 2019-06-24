import React, { Component } from "react";
import CreateBuzz from "./create-buzz/create-buzz";
import { connect } from "react-redux";
import {
  getBuzz,
  deleteBuzz,
  reactBuzz,
  unreactBuzz
} from "../../../actions/buzz-actions";
import BuzzCard from "./recent-buzz";

class Buzz extends Component {
  componentDidMount() {
    this.props.getBuzz();
  }

  handleDelete = buzzId => {
    this.props.deleteBuzz(buzzId);
  };

  handleReaction = (buzzId, reaction) => {
    this.props.reactBuzz(buzzId, reaction);
  };

  render() {
    console.log(this.props.buzzs);
    return (
      <div className="body-content">
        <CreateBuzz />

        {(() => {
          if (this.props.loadingWhileGetting) return <div className="loader" />;
          else if (this.props.buzzs.length)
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
                    />
                  );
                })}
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
    loadingWhileGetting: state.buzz.loadingWhileGetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBuzz: () => dispatch(getBuzz()),
    deleteBuzz: id => dispatch(deleteBuzz(id)),
    reactBuzz: (buzzId, reaction) => dispatch(reactBuzz(buzzId, reaction)),
    unreactBuzz: buzzId => dispatch(unreactBuzz(buzzId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buzz);
