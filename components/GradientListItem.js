import React from "react";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
// import LinearGradient from "react-native-linear-gradient"; // Only if no expo

const GradientListItem = ({ title, subtitle }) => (
  <ListItem
    Component={TouchableScale}
    friction={90} //
    tension={100} // These props are passed to the parent component (here TouchableScale)
    activeScale={0.95} //
    linearGradientProps={{
      colors: ["#FF9800", "#F44336"],
      start: [1, 0],
      end: [0.2, 0],
    }}
    // ViewComponent={LinearGradient} // Only if no expo
    // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
    title={title}
    titleStyle={{ color: "white", fontWeight: "bold" }}
    subtitleStyle={{ color: "white" }}
    subtitle={subtitle}
    chevronColor="white"
    chevron
  />
);

export default GradientListItem;
