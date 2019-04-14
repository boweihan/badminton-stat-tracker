import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 10,
    right: 20,
  },
  button: {
    backgroundColor: Colors.appBackground,
    padding: 10,
    borderRadius: 40,
  },
});

const FixedIcon = ({ onPress }) => (
  <Button
    style={styles.container}
    buttonStyle={styles.button}
    onPress={onPress}
    icon={{ name: "plus", type: "font-awesome", color: "white" }}
  />
);

export default FixedIcon;
