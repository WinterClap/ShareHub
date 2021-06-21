import React from "react";
import { DashboardNavBar } from "./NavBar/navBar";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import { DashboardContent } from "./DashboardContent/dashboardContent";

import "../../App.css";
import { MyAccount } from "./MyAccount/myAccount";
import { PrivateRoute } from "../PrivateRoute/privateRoute";

const Container = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
  width: 100%;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;
export const Dashboard = () => {
  return (
    <>
      <Container>
        <DashboardNavBar></DashboardNavBar>
        <Switch>
          <PrivateRoute exact path="/dashboard/content" component={DashboardContent}></PrivateRoute>
          <PrivateRoute path="/dashboard/myaccount" component={MyAccount}></PrivateRoute>
        </Switch>
      </Container>
    </>
  );
};
