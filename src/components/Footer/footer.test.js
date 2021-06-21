import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

test("Renders footer correctly", () => {
  render(<Footer></Footer>);
  expect(screen.getByTitle("Flaticon").textContent).toBe("Flaticon");
});
