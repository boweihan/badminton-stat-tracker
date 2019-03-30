import React from "react";
import { AuthSession } from "expo";
import { View, Button, Alert, AsyncStorage } from "react-native";
import jwtDecoder from "jwt-decode";
import { withAppContext } from "../../config/withAppContext";
import Auth0Constants from "../../constants/Auth0";

const toQueryString = params =>
  `?${Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&")}`;

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in",
  };

  loginWithAuth0 = async () => {
    const result = await AuthSession.startAsync({
      authUrl: `${Auth0Constants.domain}/authorize${toQueryString({
        client_id: Auth0Constants.clientId,
        response_type: "id_token",
        scope: "openid profile",
        audience: Auth0Constants.audience,
        redirect_uri: await AuthSession.getRedirectUrl(),
        nonce: "randomstring",
      })}`,
    });
    if (result.type === "success") {
      this.handleParams(result.params);
    }
  };

  handleParams = async responseObj => {
    // handle error
    if (responseObj.error) {
      Alert.alert(
        "Error",
        responseObj.error_description ||
          "something went wrong while logging in",
      );
      return;
    }
    // store session in storage and redirect back to the app
    const encodedToken = responseObj.id_token;
    const decodedToken = jwtDecoder(encodedToken);
    await AsyncStorage.setItem(
      Auth0Constants.asyncStorageKey,
      JSON.stringify({
        token: encodedToken,
        name: decodedToken.nickname,
        id: decodedToken.sub,
        exp: decodedToken.exp,
      }),
    );

    const { context, navigation } = this.props;
    context.setUser({
      id: decodedToken.sub,
      name: decodedToken.nickname,
      jwt: encodedToken,
    });
    navigation.navigate("Main");
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this.loginWithAuth0} />
      </View>
    );
  }
}

export default withAppContext(LoginScreen);
