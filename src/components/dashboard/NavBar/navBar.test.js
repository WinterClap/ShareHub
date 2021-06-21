import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { DashboardNavBarMocked } from "../../../__mocks__/navBar";
import { Route, Link, BrowserRouter as Router, useHistory } from "react-router-dom";
import TestPic from "../../../assets/addIco.svg";

const getUserImageUrl = jest.fn();

const currentUser = { email: "test@test.com" };
const Home = () => <h1 data-testid="homePage">Home</h1>;
const ParentComponent = ({ currentUser }) => {
  return (
    <Router>
      <Route exact path="/home" component={Home} />
      <DashboardNavBarMocked userImageUrl={TestPic} currentUser={currentUser} getUserImageUrl={getUserImageUrl} />
    </Router>
  );
};
describe("<NavBar />", () => {
  test("should render the user email", () => {
    const { container, getByText } = render(<ParentComponent currentUser={currentUser}></ParentComponent>);
    expect(container.firstChild).toBeInTheDocument();
    expect(getByText("test@test.com")).toBeInTheDocument();
  });
  test("should activate handleLogout function when Logout button is clicked", () => {
    const { getByText, getByTestId } = render(<ParentComponent currentUser={currentUser}></ParentComponent>);
    fireEvent.click(getByTestId("logoutButton"));
    expect(getByText("Home")).toBeInTheDocument();
  });
});
