import React from "react";
import { AuthSession } from "expo";
import {
  View,
  Alert,
  AsyncStorage,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import jwtDecoder from "jwt-decode";
import gql from "graphql-tag";
import { withAppContext } from "../../config/withAppContext";
import Auth0Constants from "../../constants/Auth0";
import createApolloClient from "../../graphql/apollo";
import shuttle from "../../assets/images/shuttle.png";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ff8080",
    width: "100%",
    paddingBottom: 50,
  },
  header: {
    fontFamily: "FjallaOne-Regular",
    padding: 10,
    fontSize: 40,
    color: Colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  loginView: {
    flex: 1,
  },
  login: {
    margin: 30,
    backgroundColor: Colors.appBackground,
    paddingHorizontal: 30,
    shadowColor: Colors.borderBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  loginTitle: {
    fontFamily: "MerriweatherSans-Bold",
    paddingHorizontal: 10,
    fontSize: 24,
    color: Colors.white,
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
  loginWithAuth0 = async () => {
    const { navigation } = this.props;
    navigation.navigate("Main");
    // const result = await AuthSession.startAsync({
    //   authUrl: `${Auth0Constants.domain}/authorize${toQueryString({
    //     client_id: Auth0Constants.clientId,
    //     response_type: "id_token",
    //     scope: "openid profile",
    //     audience: Auth0Constants.audience,
    //     redirect_uri: await AuthSession.getRedirectUrl(),
    //     nonce: "randomstring",
    //   })}`,
    // });
    // if (result.type === "success") {
    //   this.handleParams(result.params);
    // }
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
    context.setClient({
      client,
    });
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
      console.log(e);
      // we already added the user
      // should upsert here instead
    }
    navigation.navigate("Main");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Welcome to</Text>
          <Image source={shuttle} style={styles.image} />
          <Text style={styles.header}>BST</Text>
        </View>
        <View style={styles.loginView}>
          <Button
            onPress={this.loginWithAuth0}
            buttonStyle={styles.login}
            titleStyle={styles.loginTitle}
            icon={<Icon name="arrow-forward" size={20} color={Colors.white} />}
            title="Enter"
          />
        </View>
      </View>
    );
  }
}

const LoginWithContext = withAppContext(LoginScreen);
LoginWithContext.navigationOptions = { header: null };
export default LoginWithContext;
