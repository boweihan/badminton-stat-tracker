import React from "react";
import { BarIndicator } from "react-native-indicators";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Loading = () => (
  <View style={styles.container}>
    <BarIndicator
      color={Colors.appBackground}
      count={5}
      size={60}
      style={{ flex: 0 }}
    />
  </View>
);

export default Loading;
