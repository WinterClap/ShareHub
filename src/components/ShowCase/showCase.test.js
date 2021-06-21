import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { ShowCase } from "./showCase";
const { container } = render(<ShowCase></ShowCase>);

describe("<ShowCase />", () => {
  test("should render component", () => {
    expect(container).toBeTruthy();
  });
});
