import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PrivateRouteMocked } from "../../__mocks__/privateRoute";

const Setup = ({ children }) => {
  return <Router>{children}</Router>;
};
const MockDashboard = () => <h1>Dashboard</h1>;
const MyAccount = () => <h1>Account</h1>;
const Signin = () => <h1>Signin</h1>;
describe("<PrivateRoute />", () => {
  test("Protects the route by redirecting to /signin", () => {
    const { queryByText, queryByTestId } = render(
      <>
        <Setup>
          <Link data-testid="myaccountLink" to="/myaccount"></Link>
          <Link data-testid="dashboardLink" to="/dashboard"></Link>
          <PrivateRouteMocked exact path="/dashboard" component={MockDashboard} currentUser="user@user.com" />
          <PrivateRouteMocked exact path="/myaccount" component={MyAccount} />
          <Route exact path="/signin" component={Signin} />
        </Setup>
      </>
    );
    fireEvent.click(queryByTestId("myaccountLink"));
    expect(queryByText(/Account/)).not.toBeInTheDocument();
    expect(queryByText(/Signin/)).toBeInTheDocument();
  });
  test("Allows to enter to /dashboard having a currentUser", () => {
    const { queryByText, queryByTestId } = render(
      <>
        <Setup>
          <Link data-testid="myaccountLink" to="/myaccount"></Link>
          <Link data-testid="dashboardLink" to="/dashboard"></Link>
          <PrivateRouteMocked exact path="/dashboard" component={MockDashboard} currentUser="user@user.com" />
          <PrivateRouteMocked exact path="/myaccount" component={MyAccount} />
          <Route exact path="/signin" component={Signin} />
        </Setup>
      </>
    );
    fireEvent.click(queryByTestId("dashboardLink"));
    expect(queryByText(/Account/)).not.toBeInTheDocument();
    expect(queryByText(/Dashboard/)).toBeInTheDocument();
    expect(queryByText(/Signin/)).not.toBeInTheDocument();
  });
});
