import React from "react";
import { AuthSession } from "expo";
import {
  View,
  Alert,
  AsyncStorage,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import jwtDecoder from "jwt-decode";
import gql from "graphql-tag";
import { withAppContext } from "../../config/withAppContext";
import Auth0Constants from "../../constants/Auth0";
import createApolloClient from "../../graphql/apollo";
import shuttlecock from "../../assets/images/shuttlecock.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    padding: 10,
    fontSize: 30,
    fontWeight: "500",
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

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
    const client = createApolloClient(encodedToken);
    // add the player via graphQL mutation after authenticating
    try {
      await client.mutate({
        mutation: gql`
          mutation($username: String, $userid: String) {
            insert_player(objects: [{ name: $username, id: $userid }]) {
              affected_rows
            }
          }
        `,
        variables: {
          username: decodedToken.nickname,
          userid: decodedToken.sub,
        },
      });
    } catch (e) {
      // we already added the user
      // should upsert here instead
    }
    navigation.navigate("Main");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Badminton Stat Tracker</Text>
        <Text style={styles.text}>Click to Enter</Text>
        <TouchableOpacity onPress={this.loginWithAuth0}>
          <Image style={styles.image} source={shuttlecock} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withAppContext(LoginScreen);
