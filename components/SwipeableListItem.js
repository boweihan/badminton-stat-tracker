import React from "react";
import { GestureHandler } from "expo";
import ListItem from "./ListItem";
import DeleteSeason from "../graphql/mutation/DeleteSeason";

class SwipeableListItem extends React.Component {
  renderLeftActions = (progress, dragX) => {
    const { itemId } = this.props;
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return <DeleteSeason trans={trans} deletedId={itemId} />;
  };

  render() {
    return (
      <GestureHandler.Swipeable
        renderLeftActions={this.renderLeftActions}
        overshootLeft={false}
      >
        <ListItem {...this.props} />
      </GestureHandler.Swipeable>
    );
  }
}

export default SwipeableListItem;
