import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./homePage";

it("renders component", () => {
  const MockContainer = ({ children }) => <Router>{children}</Router>;
  const { getByTestId } = render(
    <MockContainer>
      <HomePage />
    </MockContainer>
  );
  expect(getByTestId("home-section")).toBeTruthy();
});
