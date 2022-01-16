import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";

import googleIcon from "assets/icons/logo-google.svg";

import Spinner from "components/Spinner/Spinner";

import { validEmailRegex } from "utils/Regex";
import { postLoginApi } from "requests/account";

const Login = (props) => {
   const [loginDetails, setLoginDetails] = useState({
      email: "",
      password: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({});

   const handleFormValidation = () => {
      let errors = {};

      if (!loginDetails.email) {
         errors.email = "Please fill up this field";
      } else if (!validEmailRegex.test(loginDetails.email)) {
         errors.email = "Please fill valid email";
      }

      if (!loginDetails.password) {
         errors.password = "Please fill up this field";
      } else if (loginDetails.password.length < 8) {
         errors.password = "Please enter 8 digit password";
      }
      return errors;
   };

   const handleChange = (e) => {
      setErrors({ ...errors, [e.target.name]: "" });
      setLoginDetails({
         ...loginDetails,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmitLogin = async () => {
      const errorResult = handleFormValidation();

      if (!_.isEmpty(errorResult)) {
         return setErrors(errorResult);
      }

      setIsLoading(true);
      const result = await props.postLoginApi(loginDetails);
      setIsLoading(false);

      if (!result.error) {
         toast.success(result.message);
      } else {
         toast.error(result.message);
      }
   };

   if (isLoading) {
      return <Spinner />;
   }

   console.log(isLoading);

   return (
      <div className="flex justify-center items-center mt-10 xl:mt-0 xl:h-screen">
         <div className="px-4">
            <div className="text-lg font-medium">Log in with meFiles</div>
            <div className="space-y-2 mt-2">
               <div>
                  <label className="text-tiny font-medium" htmlFor="fullName">
                     Email
                  </label>
                  <input
                     name="email"
                     value={loginDetails.email}
                     onChange={handleChange}
                     className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-black"
                     type="email"
                     placeholder="Enter Your Email"
                  />
                  {errors.email && (
                     <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                     </div>
                  )}
               </div>
               <div>
                  <label className="text-tiny font-medium" htmlFor="fullName">
                     Password
                  </label>
                  <input
                     name="password"
                     value={loginDetails.password}
                     onChange={handleChange}
                     className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-black"
                     type="password"
                     placeholder="Enter Your Password"
                  />
                  {errors.password && (
                     <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                     </div>
                  )}
               </div>
            </div>
            <div className="space-y-3 mt-8">
               <button
                  onClick={handleSubmitLogin}
                  className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold py-2 rounded-lg w-full flex items-center justify-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
               >
                  Sign in
               </button>
               <button className="flex justify-center py-2 space-x-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <img className="w-6 h-6" src={googleIcon} alt="" />
                  <span className="font-medium">Sign in with Google</span>
               </button>
            </div>
            <div className="text-center mt-7 text-gray-500">
               Don&apos;t have an account?&nbsp;
               <Link to="/signup">
                  <span className="font-medium text-black cursor-pointer">
                     Sign up for free
                  </span>
               </Link>
            </div>
         </div>
         <Toaster />
      </div>
   );
};

Login.propTypes = {
   postLoginApi: PropTypes.func,
};

const mapDispatchToProps = {
   postLoginApi,
};

export default connect(null, mapDispatchToProps)(Login);
