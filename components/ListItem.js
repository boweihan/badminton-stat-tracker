import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "#f2f2f2",
  },
});

const CustomListItem = ({ title, subtitle }) => (
  <ListItem
    // leftAvatar={{ source: { uri: l.avatar_url } }}
    style={styles.listItem}
    title={title}
    subtitle={subtitle}
    titleStyle={{ fontWeight: "bold" }}
    subtitleStyle={{}}
    chevronColor="white"
    chevron
  />
);

export default CustomListItem;
