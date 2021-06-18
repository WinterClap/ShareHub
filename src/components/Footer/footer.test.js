import "@testing-library/jest-dom/extend-expect";
import { Footer } from "./footer";

test("Renders footer correctly", () => {
  render(<Footer></Footer>);
  expect(screen.getByTitle("FooterBox")).toBeInTheDocument();
});
