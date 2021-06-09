import { render, screen } from "@testing-library/react";
import App from "./App";
/*
import { functions } from "/path"
test('Fetch data from firebase firestore', ) 

*/
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
