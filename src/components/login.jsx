import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { UserLogin } from "../core/services/auth.service";
import { cacheUserSession, getTokenExpiry } from "../core/utils";
import Button from "./button";

const Login = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    UserLogin(loginData)
      .then((res) => {
        console.log(res.data);
        setBtnLoading(false);
        const accessToken = res?.data.accessToken;
        const expiryDate = getTokenExpiry(accessToken);
        cacheUserSession(
          res?.data.accessToken,
          res?.data.user.role,
          expiryDate
        );
        window.location.href =
          res?.data.user.role === "customer" ? "/dashboard" : "/chef-dashboard";
      })
      .catch((err) => {
        console.log(err);
        setBtnLoading(false);
        if (err.response && err.response.status === 401) {
          setErrors({ submit: "Invalid email or password" });
        } else {
          setBtnLoading(false);
          setErrors({ submit: "An error occurred. Please try again." });
        }
      });
  };

  return (
    <div className="bg-white py-8 sm:py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
          <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
            Log In to <span className="text-orange-600">Chef Sy</span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
                <UserIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <LockClosedIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <Button
              type={"submit"}
              isLoading={btnLoading}
              text={"Login"}
              className="w-full bg-green-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base"
            />
            {errors.submit && (
              <p className="text-red-500 text-xs sm:text-sm text-center">
                {errors.submit}
              </p>
            )}
          </form>
          <p className="text-center text-gray-600 text-sm sm:text-base mt-4 sm:mt-6">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-orange-600 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
