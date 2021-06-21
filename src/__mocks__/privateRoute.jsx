import React from "react";
import { Redirect, Route } from "react-router";
export const PrivateRouteMocked = ({ component: Component, ...rest }) => {
  const { currentUser } = { ...rest };
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props}></Component> : <Redirect to="/signin"> </Redirect>;
      }}
    ></Route>
  );
};
