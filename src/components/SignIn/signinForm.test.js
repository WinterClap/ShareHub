import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SignInMocked } from "../../__mocks__/signinForm";
import { BrowserRouter as Router } from "react-router-dom";

const login = (email, password) => {
  return { email: `${email}`, password: `${password}` };
};
describe("Test 'SignIn' component", () => {
  test("Test render", () => {
    const { container } = render(
      <Router>
        <SignInMocked />
      </Router>
    );

    expect(screen.getByText("Forgot password?")).toHaveAttribute("href", "/password-reset");
    expect(container).toBeInTheDocument();
  });
  test("testing inputs values to be responsive to changes", () => {
    const { container } = render(
      <Router>
        <SignInMocked />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
      fireEvent.change(inputPassword, { target: { value: "asdasdasd" } });
    });
    expect(inputEmail.value).toBe("asd@gmail.com");
    expect(inputPassword.value).toBe("asdasdasd");
  });
  test("testing button functionality while submitting the form", () => {
    let loginObject;
    const { container } = render(
      <Router>
        <SignInMocked handleSubmit={login} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    const button = screen.getByText("Login");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
      fireEvent.change(inputPassword, { target: { value: "asdasdasd" } });
      fireEvent.click(button);
      loginObject = login(inputEmail.value, inputPassword.value);
    });
    expect(loginObject).toStrictEqual({
      email: `${inputEmail.value}`,
      password: `${inputPassword.value}`,
    });
  });
  test("testing inputs have 'required' attribute", () => {
    const { container } = render(
      <Router>
        <SignInMocked handleSubmit={login} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    expect(inputEmail).toHaveAttribute("required");
    expect(inputPassword).toHaveAttribute("required");
  });
});
