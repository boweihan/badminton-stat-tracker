import React from "react";
import AppContext from "./AppContext";

export default class AppContextProvider extends React.Component {
  state = {
    user: {
      id: null,
      name: null,
      jwt: null,
    },
    client: null,
  };

  render() {
    const { user, client } = this.state;
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          user,
          client,
          setUser: newUser => {
            this.setState({
              user: newUser,
            });
          },
          setClient: newClient => {
            this.setState({
              client: newClient,
            });
          },
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}
