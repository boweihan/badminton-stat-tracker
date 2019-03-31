import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import createApolloClient from "../externals/apollo";
import { withAppContext } from "../config/withAppContext";
import SeasonList from "./SeasonList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    client: null,
  };

  async componentDidMount() {
    const { context } = this.props;
    const { user } = context;
    const client = createApolloClient(user.token);
    this.setState({
      client,
    });
  }

  render() {
    const { client } = this.state;
    const { context } = this.props;
    const { user } = context;
    if (!client) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <ApolloProvider client={client}>
        <SeasonList userId={user.id} username={user.name} />
      </ApolloProvider>
    );
  }
}

export default withAppContext(HomeScreen);
