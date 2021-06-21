import "@testing-library/jest-dom/extend-expect";
import { fireEvent, queryByText, render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Footer } from "../Footer/footer.jsx";
import { NotFoundPage } from "./notFoundPage.jsx";

const Setup = () => {
  return (
    <>
      <Route exact path="/footer" component={Footer} />
      <Route path="/nonexisting" component={NotFoundPage} />
    </>
  );
};

describe("<NotFoundPage />", () => {
  test("Renders the Footer component normally", () => {
    const { queryByText, getByTitle, getByTestId } = render(
      <Router>
        <Setup />
        <Link to="/footer" data-testid="FooterLink"></Link>
        <Link to="/nonexisting" data-testid="NotFoundLink"></Link>
      </Router>
    );

    fireEvent.click(getByTestId("FooterLink"));

    expect(getByTitle("Flaticon")).toBeInTheDocument();
    expect(queryByText("Go back")).not.toBeInTheDocument();
  });
  test("Renders the NotFoundPage component normally", () => {
    const { queryByText, queryByTitle, getByTestId } = render(
      <Router>
        <Setup />
        <Link to="/footer" data-testid="FooterLink"></Link>
        <Link to="/nonexisting" data-testid="NotFoundLink"></Link>
      </Router>
    );

    fireEvent.click(getByTestId("NotFoundLink"));

    expect(queryByTitle("Flaticon")).not.toBeInTheDocument();
    expect(queryByText("Go back")).toBeInTheDocument();
  });
});
