import React from "react";
import AppContext from "./AppContext";

export const withAppContext = Component => props => (
  <AppContext.Consumer>
    {context => <Component {...props} context={context} />}
  </AppContext.Consumer>
);

export default withAppContext;
