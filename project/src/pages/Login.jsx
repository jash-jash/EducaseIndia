import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import InputContainer from "./../components/InputContainer";
import React from "react";
function Login() {
  const [errorObj, setErrorObj] = useState({});
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const validationConfig = {
    email: [],
    password: [
      {
        length: 6,
        message: "Your password must contain atleast 6 characters",
      },
    ],
  };

  function validate(userObj) {
    // advance form validation
    const errorsData = {};
    Object.entries(loginObj).forEach(function ([key, value]) {
      validationConfig[key].some(function (rule) {
        if (rule.required && value.length === 0) {
          errorsData[key] = rule.message;
          return true;
        }
        if (key === "password" && rule.length && value.length < 6) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrorObj(errorsData);
    return errorsData;
  }

  useEffect(
    function () {
      if (loginObj.email && loginObj.password) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    },
    [loginObj]
  );

  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(validate(loginObj)).length) {
      return;
    } else {
      setLoginObj({
        email: "",
        password: "",
      });
      navigate("/home");
    }
  }

  return (
    <>
      <form
        className="flex flex-col px-5 py-10 min-h-screen max-w-[375px] m-auto bg-[#F7F8F9] font-rubik border border-[#CBCBCB]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[28px] font-bold font-rubik">
          Signin to your PopX account
        </h2>
        <p className="text-[18px] mt-[14px] text-[#1d222699] font-rubik">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
        <InputContainer
          name="email"
          placeholderText="Enter email address"
          required={true}
          type="email"
          value={loginObj.email}
          setUserObj={setLoginObj}
          label="Email Address"
          errorObj={errorObj}
          setErrorObj={setErrorObj}
          marginTop="33px"
        />
        <InputContainer
          name="password"
          placeholderText="Enter password"
          required={true}
          type="password"
          value={loginObj.password}
          setUserObj={setLoginObj}
          label="Password"
          errorObj={errorObj}
          setErrorObj={setErrorObj}
          marginTop="23px"
        />
        <button
          disabled={isDisabled}
          className={`text-white text-[16px] font-medium py-3.5 rounded-md mt-[14px] cursor-pointer ${
            isDisabled ? "bg-[#cbcbcb]" : "bg-[#6C25FF]"
          }`}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;