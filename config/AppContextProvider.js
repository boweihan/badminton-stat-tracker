import React from "react";
import AppContext from "./AppContext";

export default class AppContextProvider extends React.Component {
  state = {
    user: {
      id: null,
      name: null,
      jwt: null,
    },
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          user,
          setUser: newUser => {
            this.setState({
              user: newUser,
            });
          },
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}
