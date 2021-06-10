import "./App.css";
import HomePage from "./components/homePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignIn } from "./components/signinForm";
import { SignUp } from "./components/signupForm";
import { Dashboard } from "./components/dashboard/index";
import { AuthProvider } from "./components/contexts/AuthContext";
import { PrivateRoute } from "./components/privateRoute";
import { NotFoundPage } from "./components/notFoundPage";
import { PasswordReset } from "./components/PasswordReset";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
            <Route path="/signin">
              <SignIn></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
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
