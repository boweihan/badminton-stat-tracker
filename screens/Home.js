import React from "react";
import { ApolloProvider } from "react-apollo";
import createApolloClient from "../graphql/apollo";
import { withAppContext } from "../config/withAppContext";
import SeasonList from "../graphql/query/SeasonList";
import Loading from "../components/Loading";

class HomeScreen extends React.Component {
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
      return <Loading />;
    }
    return (
      <ApolloProvider client={client}>
        <SeasonList userId={user.id} username={user.name} />
      </ApolloProvider>
    );
  }
}

const EnhancedHomeScreen = withAppContext(HomeScreen);
EnhancedHomeScreen.navigationOptions = {
  title: "Home",
};
export default EnhancedHomeScreen;
