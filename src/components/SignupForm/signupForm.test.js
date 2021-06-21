import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SignUpMocked } from "../../__mocks__/signupForm";
import { BrowserRouter as Router } from "react-router-dom";

const handleSubmit = (email, password, confirmPass) => {
  if (password === confirmPass) {
    return { email: `${email}`, password: `${password}`, confirmPass: `${confirmPass}` };
  } else {
    return { error: "Passwords don't match" };
  }
};
describe("Test 'Signup' component", () => {
  test("Test render", () => {
    const { container } = render(
      <Router>
        <SignUpMocked />
      </Router>
    );

    expect(screen.getByText("Login")).toHaveAttribute("href", "/signin");
    expect(container).toBeInTheDocument();
  });
  test("testing inputs values to be responsive to changes", () => {
    const { container } = render(
      <Router>
        <SignUpMocked />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    const inputConfirmPassword = screen.getByPlaceholderText("Confirm password");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
      fireEvent.change(inputPassword, { target: { value: "password" } });
      fireEvent.change(inputConfirmPassword, { target: { value: "password" } });
    });
    expect(inputEmail.value).toBe("asd@gmail.com");
    expect(inputPassword.value).toBe("password");
    expect(inputConfirmPassword.value).toBe("password");
  });
  test("testing button functionality while submitting the form", () => {
    let handleSubmitObject;
    const { container } = render(
      <Router>
        <SignUpMocked handleSubmit={handleSubmit} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    const inputConfirmPassword = screen.getByPlaceholderText("Confirm password");
    const button = screen.getByText("Login");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
      fireEvent.change(inputPassword, { target: { value: "asdasdasd" } });
      fireEvent.change(inputConfirmPassword, { target: { value: "asdasdasd" } });

      fireEvent.click(button);
      handleSubmitObject = handleSubmit(inputEmail.value, inputPassword.value, inputConfirmPassword.value);
    });
    expect(handleSubmitObject).toStrictEqual({
      email: `${inputEmail.value}`,
      password: `${inputPassword.value}`,
      confirmPass: `${inputConfirmPassword.value}`,
    });
  });
  test("testing button functionality while submitting the form", () => {
    let handleSubmitObject;
    const { container } = render(
      <Router>
        <SignUpMocked handleSubmit={handleSubmit} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    const inputConfirmPassword = screen.getByPlaceholderText("Confirm password");
    const button = screen.getByText("Login");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "asd@gmail.com" } });
      fireEvent.change(inputPassword, { target: { value: "these are not" } });
      fireEvent.change(inputConfirmPassword, { target: { value: "valid" } });

      fireEvent.click(button);
      handleSubmitObject = handleSubmit(inputEmail.value, inputPassword.value, inputConfirmPassword.value);
    });
    expect(handleSubmitObject).toStrictEqual({ error: "Passwords don't match" });
  });
  test("testing inputs have 'required' attribute", () => {
    const { container } = render(
      <Router>
        <SignUpMocked handleSubmit={handleSubmit} />
      </Router>
    );
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Password");
    const inputConfirmPassword = screen.getByPlaceholderText("Confirm password");
    expect(inputEmail).toHaveAttribute("required");
    expect(inputPassword).toHaveAttribute("required");
    expect(inputConfirmPassword).toHaveAttribute("required");
  });
});
