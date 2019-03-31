import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    margin: 10,
    borderWidth: 10,
    borderColor: Colors.appBackground,
  },
  button: {
    backgroundColor: Colors.darkGreen,
  },
  icon: {
    paddingRight: 5,
  },
});

const FixedIcon = ({ text, onPress }) => (
  <Button
    raised
    title={text}
    style={styles.container}
    buttonStyle={styles.button}
    onPress={onPress}
    icon={{ name: "plus", type: "font-awesome", color: "white" }}
  />
);

export default FixedIcon;
