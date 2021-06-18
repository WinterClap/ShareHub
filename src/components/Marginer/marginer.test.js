import { render } from "@testing-library/react";
import { Marginer } from ".";

test("Renders vertical marginer correctly", () => {
  const { container } = render(<Marginer direction="vertical" margin={20} />);
  expect(container.firstChild).toHaveStyle(`height:20px`);
});

test("Renders horizontal marginer correctly", () => {
  const { container } = render(<Marginer margin={30} />);
  expect(container.firstChild).toHaveStyle(`width:30px`);
});
