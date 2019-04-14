import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { ApolloProvider } from "react-apollo";
import createApolloClient from "./graphql/apollo";
import AppNavigator from "./navigation/AppNavigator";
import AppContextProvider from "./config/AppContextProvider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require("./assets/images/shuttlecock.png"),
        require("./assets/images/player.png"),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "MerriweatherSans-Regular": require("./assets/fonts/MerriweatherSans-Regular.ttf"),
        "MerriweatherSans-Bold": require("./assets/fonts/MerriweatherSans-Bold.ttf"),
        "MerriweatherSans-Light": require("./assets/fonts/MerriweatherSans-Light.ttf"),
        "FjallaOne-Regular": require("./assets/fonts/FjallaOne-Regular.ttf"),
      }),
    ]);

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete, skipLoadingScreen } = this.state;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <AppContextProvider>
        <ApolloProvider client={createApolloClient()}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </ApolloProvider>
      </AppContextProvider>
    );
  }
}
