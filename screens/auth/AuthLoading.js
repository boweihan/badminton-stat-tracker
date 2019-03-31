import React from "react";
import { AsyncStorage, View, Text, StyleSheet } from "react-native";
import { BarIndicator } from "react-native-indicators";
import { withAppContext } from "../../config/withAppContext";
import Auth0Constants from "../../constants/Auth0";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
});

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { context, navigation } = this.props;

    const session = await AsyncStorage.getItem(Auth0Constants.asyncStorageKey);
    if (session) {
      const obj = JSON.parse(session);
      if (obj.exp > Math.floor(new Date().getTime() / 1000)) {
        context.setUser({ id: obj.id, name: obj.name, jwt: obj.token });
        navigation.navigate("Main");
      } else {
        navigation.navigate("Auth");
      }
    } else {
      navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <BarIndicator color="black" count={5} size={60} style={{ flex: 0 }} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
}

export default withAppContext(AuthLoadingScreen);
