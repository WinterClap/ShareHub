import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./header";

test("Container has correct animation", () => {
  render(<Header></Header>);
  expect(screen.findByRole("div")).toBeTruthy();
});
