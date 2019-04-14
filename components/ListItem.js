import React from "react";
import { StyleSheet, Image } from "react-native";
import { ListItem } from "react-native-elements";
import icon from "../assets/images/icon.png";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
    shadowColor: Colors.borderBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  titleStyle: {
    fontFamily: "MerriweatherSans-Regular",
  },
  image: {
    width: 50,
    height: 50,
  },
});

const CustomListItem = ({ title, subtitle, onPress }) => (
  <ListItem
    leftElement={<Image source={icon} style={styles.image} />}
    onPress={onPress}
    style={styles.listItem}
    title={title}
    subtitle={subtitle || "no description"}
    titleStyle={styles.titleStyle}
    chevronColor="white"
    chevron
  />
);

export default CustomListItem;
