import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserIcon, CakeIcon } from "@heroicons/react/24/solid";
import { UserSignUp } from "../core/services/auth.service";
import Button from "./button";

const SignUp = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.role) newErrors.role = "Please select a role";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const signUpData = {
      username: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };
    UserSignUp(signUpData)
      .then((res) => {
        setBtnLoading(false);
        console.log(res.data);
        window.location.href =
          res?.data.user.role === "customer" ? "/dashboard" : "/chef-dashboard";
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
        if (err.response && err.response.status === 409) {
          setErrors({ submit: "Email already exists" });
        } else {
          setErrors({ submit: "Signup failed. Please try again." });
        }
      });
  };

  return (
    <section className="bg-white py-8 sm:py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6 sm:p-8">
          <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Join <span className="text-orange-600">Chef Sy</span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                placeholder="Enter your email"
              />
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
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sign up as
              </label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                    className="form-radio text-orange-600"
                  />
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Customer
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="chef"
                    checked={formData.role === "chef"}
                    onChange={handleChange}
                    className="form-radio text-orange-600"
                  />
                  <CakeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Chef
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.role}
                </p>
              )}
            </div>
            <Button
              type={"submit"}
              isLoading={btnLoading}
              text={"Signup"}
              className="w-full bg-black text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base"
            />

            {errors.submit && (
              <p className="text-red-500 text-xs sm:text-sm text-center">
                {errors.submit}
              </p>
            )}
          </form>
          <p className="text-center text-gray-600 text-sm sm:text-base mt-4 sm:mt-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-orange-600 hover:underline">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
