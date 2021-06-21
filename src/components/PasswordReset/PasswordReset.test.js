import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { PasswordResetMocked } from "../../__mocks__/PasswordReset";
import { BrowserRouter as Router } from "react-router-dom";

const handleSubmit = (email) => {
  return { email: `${email}` };
};
describe("Test 'PasswordReset' component", () => {
  test("Test render", () => {
    const { container } = render(
      <Router>
        <PasswordResetMocked />
      </Router>
    );

    expect(screen.getByText("sign in")).toHaveAttribute("href", "/signin");
    expect(container).toBeInTheDocument();
  });
  test("testing inputs values to be responsive to changes", () => {
    const { container } = render(
      <Router>
        <PasswordResetMocked />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
    });
    expect(inputEmail.value).toBe("asd@gmail.com");
  });
  test("testing button functionality while submitting the form", () => {
    let submitObject;
    const { container } = render(
      <Router>
        <PasswordResetMocked handleSubmit={handleSubmit} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const button = screen.getByText(/Reset Password/i);
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
      fireEvent.click(button);
      submitObject = handleSubmit(inputEmail.value);
    });
    expect(submitObject).toStrictEqual({
      email: `${inputEmail.value}`,
    });
  });
  test("testing inputs have 'required' attribute", () => {
    const { container } = render(
      <Router>
        <PasswordResetMocked handleSubmit={handleSubmit} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    expect(inputEmail).toHaveAttribute("required");
  });
});
