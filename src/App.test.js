import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const AuthProvider = screen.queryByTitle("AuthProvider");
  expect(AuthProvider).toBeInTheDocument();
});
