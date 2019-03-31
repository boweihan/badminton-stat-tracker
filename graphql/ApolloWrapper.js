import React from "react";
import { ApolloProvider } from "react-apollo";
import { withAppContext } from "../config/withAppContext";
import createApolloClient from "./apollo";

export default function ApolloWrapper(BaseComponent) {
  class ApolloComponent extends React.Component {
    render() {
      const { context } = this.props;
      const { user: { jwt } } = context;
      return (
        <ApolloProvider client={createApolloClient(jwt)}>
          <BaseComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
  return withAppContext(ApolloComponent);
}
