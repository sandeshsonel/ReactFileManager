import React, { Component, lazy, Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "utils/history";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { persistor } from "store";

// import Spinner from "components/Spinner/Spinner";
import LinearProgress from "@mui/material/LinearProgress";

const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Main = lazy(() => import("pages/Main"));

class App extends Component {
   componentDidMount() {
      if (!this.props.isLogin) {
         history.push("/login");
      }
      let token = this.props.isLoginWithGoogle
         ? this.props.token.accessToken
         : this.props.token;
      if (token) {
         const decoded_token = jwtDecode(token);
         console.log({ decoded_token });
         let currentDate = new Date();
         if (decoded_token.exp * 1000 < currentDate.getTime()) {
            persistor.purge();
            localStorage.clear();
            history.push("/login");
         } else {
            history.push("/");
         }
      }
   }
   render() {
      const { isLogin } = this.props;
      return (
         <div className="font-inter max-w-lg mx-auto">
            <Router history={history}>
               <Suspense
                  fallback={
                     <LinearProgress className="absolute top-0 w-full" />
                  }
               >
                  {isLogin ? (
                     <Switch>
                        <Route path="/" component={Main} />
                     </Switch>
                  ) : (
                     <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Redirect from="/" to="/login" />
                     </Switch>
                  )}
               </Suspense>
            </Router>
         </div>
      );
   }
}

App.propTypes = {
   isLoginWithGoogle: PropTypes.bool,
   isLogin: PropTypes.bool,
   token: PropTypes.string,
};

const mapStateToProps = (state) => ({
   isLogin: state.account.isLogin,
   token: state.account.token,
   isLoginWithGoogle: state.account.isLoginWithGoogle,
});

export default connect(mapStateToProps)(App);
