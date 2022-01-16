import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";

import googleIcon from "assets/icons/logo-google.svg";

import Spinner from "components/Spinner/Spinner";

import { validEmailRegex } from "utils/Regex";
import { postSignUpApi } from "requests/account";
import { setIsLogin } from "store/actions/account";

const SignUp = (props) => {
   const [signUpDetails, setSignUpDetails] = useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({});

   const handleFormValidation = () => {
      let errors = {};

      if (!signUpDetails.fullName) {
         errors.fullName = "Please fill up this field";
      }

      if (!signUpDetails.email) {
         errors.email = "Please fill up this field";
      } else if (!validEmailRegex.test(signUpDetails.email)) {
         errors.email = "Please fill valid email";
      }

      if (!signUpDetails.password) {
         errors.password = "Please fill up this field";
      } else if (signUpDetails.password.length <= 8) {
         errors.password = "Please enter 8 digit password";
      }

      if (!signUpDetails.confirmPassword) {
         errors.confirmPassword = "Please fill up this field";
      } else if (signUpDetails.password !== signUpDetails.confirmPassword) {
         errors.confirmPassword = "Please enter correct confirm passoword";
      }

      return errors;
   };

   const handleChange = (e) => {
      setErrors({ ...errors, [e.target.name]: "" });
      setSignUpDetails({
         ...signUpDetails,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmitSignUp = async () => {
      const errorResult = handleFormValidation();

      if (!_.isEmpty(errorResult)) {
         return setErrors(errorResult);
      }

      setIsLoading(true);
      const result = await props.postSignUpApi({
         fullName: signUpDetails.fullName,
         email: signUpDetails.email,
         password: signUpDetails.password,
      });
      setIsLoading(false);

      if (!result.error) {
         toast.success(result.message);
         props.setIsLogin(result.data);
      } else {
         toast.error(result.message);
      }
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <div className="flex justify-center items-center mt-10 xl:mt-0 xl xl:h-screen px-4 xl:px-0 pb-8">
         <div>
            <div className="text-lg font-medium">Sign up with meFiles</div>
            <div className="space-y-2 mt-2">
               <div>
                  <label className="text-tiny font-medium" htmlFor="fullName">
                     Your Name
                  </label>
                  <input
                     name="fullName"
                     value={signUpDetails.fullName}
                     onChange={handleChange}
                     className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-black"
                     type="text"
                     placeholder="Enter Your Name"
                  />
                  {errors.fullName && (
                     <div className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                     </div>
                  )}
               </div>
               <div>
                  <label className="text-tiny font-medium" htmlFor="fullName">
                     Email
                  </label>
                  <input
                     name="email"
                     value={signUpDetails.email}
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
               <div className="space-y-2 xl:space-y-0 xl:flex xl:items-start xl:space-x-3">
                  <div>
                     <label
                        className="text-tiny font-medium"
                        htmlFor="fullName"
                     >
                        Password
                     </label>
                     <input
                        name="password"
                        value={signUpDetails.password}
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
                  <div>
                     <label
                        className="text-tiny font-medium"
                        htmlFor="fullName"
                     >
                        Confirm Password
                     </label>
                     <input
                        name="confirmPassword"
                        value={signUpDetails.confirmPassword}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-black"
                        type="text"
                        placeholder="Enter Confirm Password"
                     />
                     {errors.confirmPassword && (
                        <div className="text-red-500 text-sm mt-1">
                           {errors.confirmPassword}
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className="space-y-3 mt-8">
               <button
                  onClick={handleSubmitSignUp}
                  className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold py-2 rounded-lg w-full flex items-center justify-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
               >
                  Sign up
               </button>
               <button className="flex justify-center py-2 space-x-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <img className="w-6 h-6" src={googleIcon} alt="" />
                  <span className="font-medium">Sign up with Google</span>
               </button>
            </div>
            <div className="text-center mt-7 text-gray-500">
               Already have an account?&nbsp;
               <Link to="/login">
                  <span className="font-medium text-black cursor-pointer">
                     Log in
                  </span>
               </Link>
            </div>
         </div>
         <Toaster />
      </div>
   );
};

SignUp.propTypes = {
   postSignUpApi: PropTypes.func,
   setIsLogin: PropTypes.func,
};

const mapDispatchToProps = {
   postSignUpApi,
   setIsLogin,
};

export default connect(null, mapDispatchToProps)(SignUp);
