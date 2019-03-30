import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import { withAppContext } from "../../config/withAppContext";
import Auth0Constants from "../../constants/Auth0";

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
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default withAppContext(AuthLoadingScreen);
