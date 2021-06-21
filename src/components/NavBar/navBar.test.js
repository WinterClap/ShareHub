import { fireEvent, render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NavBar } from "./navBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
describe("links and redirects links working properly", () => {
  test("Renders NavBar component", () => {
    const RouterMock = ({ children }) => <Router>{children}</Router>;
    const { getByText } = render(
      <RouterMock>
        <NavBar />
      </RouterMock>
    );
    expect(getByText("Dashboard")).toBeInTheDocument();
    expect(getByText("Sign in")).toBeInTheDocument();
  });
  test("when user clicks on 'Sign in link' it should be redirected to 'sign in' page ", async () => {
    const RouterMock = ({ children }) => <Router>{children}</Router>;
    const { container, getByTestId, getByText } = render(
      <RouterMock>
        <NavBar />
        <Route exact path="/signin">
          Signin
        </Route>
      </RouterMock>
    );
    expect(getByTestId("homeLink")).toHaveAttribute("href", "/");
    expect(getByText("Dashboard")).toHaveAttribute("href", "/dashboard/content");
    expect(getByText("Sign in")).toHaveAttribute("href", "/signin");
    act(() => {
      fireEvent.click(getByText("Sign in"));
    });
    expect(container).toHaveTextContent(/Signin/);
  });

  test("when user clicks on 'Dashboard link' it should be redirected to 'dashboard' route/component", async () => {
    const RouterMock = ({ children }) => <Router>{children}</Router>;
    const { container, getByText } = render(
      <RouterMock>
        <NavBar />
        <Switch>
          <Route exact path="/dashboard/content">
            Dashboard
          </Route>
          <Route path="/signin">Signin</Route>
        </Switch>
      </RouterMock>
    );
    act(() => {
      fireEvent.click(getByText("Dashboard"));
    });
    expect(container).toHaveTextContent(/Dashboard/);
  });
});
