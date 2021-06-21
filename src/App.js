import "./App.css";
import HomePage from "./components/HomePage/homePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignIn } from "./components/SignIn/signinForm";
import { SignUp } from "./components/SignupForm/signupForm";
import { Dashboard } from "./components/dashboard/index";
import { AuthProvider } from "./components/contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute/privateRoute";
import { NotFoundPage } from "./components/NotFoundPage/notFoundPage";
import { PasswordReset } from "./components/PasswordReset/PasswordReset";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <AuthProvider title="AuthProvider">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
            <Route path="/password-reset" component={PasswordReset} />
            <Route component={NotFoundPage}></Route>
          </Switch>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
