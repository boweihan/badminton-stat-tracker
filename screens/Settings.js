import React from "react";
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import ListItem from "../components/ListItem";
import Auth0Constants from "../constants/Auth0";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  };

  logout = async () => {
    const { navigation } = this.props;
    await AsyncStorage.getItem(Auth0Constants.asyncStorageKey);
    navigation.navigate("Auth");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <ListItem title="Logout" />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
