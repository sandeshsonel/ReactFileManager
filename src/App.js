import React, { Component, lazy, Suspense } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import Spinner from "components/Spinner/Spinner";
import LinearProgress from "@mui/material/LinearProgress";

const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Main = lazy(() => import("pages/Main"));

class App extends Component {
   componentDidMount() {
      if (!this.props.isLogin) {
         <Redirect to="/other_tab" />;
      }
   }
   render() {
      const { isLogin } = this.props;
      return (
         <div className="font-inter max-w-lg mx-auto">
            <Router>
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
   isLogin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   isLogin: state.account.isLogin,
});

export default connect(mapStateToProps)(App);
