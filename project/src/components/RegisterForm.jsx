import { useState, useEffect } from "react";
import InputContainer from "./InputContainer";
import { useNavigate } from "react-router";
import React    from "react";
function RegisterForm() {
  const [userObj, setUserObj] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    agency: "",
  });

  const navigate = useNavigate();

  const [errorObj, setErrorObj] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  //form validation
  const validationConfig = {
    fullName: [
      { minLength: 4, message: "Please enter a name of atleast 4 characters" },
    ],
    phoneNumber: [
      {
        length: 10,
        message: "Your number should be of 10 digits",
      },
    ],
    email: [],
    password: [
      {
        length: 6,
        message: "Your password must contain atleast 6 characters",
      },
    ],
    companyName: [],
    agency: [],
  };
  function validate(userObj) {
    const errorsData = {};
    Object.entries(userObj).forEach(function ([key, value]) {
      validationConfig[key].some(function (rule) {
        if (key === "fullName" && rule.minLength && value.length < 4) {
          errorsData[key] = rule.message;
          return true;
        }

        if (key === "phoneNumber" && rule.length && value.length !== 10) {
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
      if (
        userObj.fullName &&
        userObj.phoneNumber &&
        userObj.email &&
        userObj.password &&
        userObj.agency
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    },
    [userObj]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(validate(userObj)).length) {
      return;
    } else {
      setUserObj({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        companyName: "",
        agency: "",
      });
      navigate("/home");
    }
  }

  return (
    <>
      <form
        className="py-10 px-5 flex flex-col justify-between min-h-screen max-w-[375px] m-auto bg-[#F7F8F9] font-rubik border border-[#CBCBCB]"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-[28px] font-semibold text-[#1d2226]">
            Create your PopX account
          </h1>

          <InputContainer
            name="fullName"
            placeholderText="Enter your full name"
            required={true}
            type="text"
            value={userObj.fullName}
            setUserObj={setUserObj}
            label="Full Name"
            errorObj={errorObj}
            setErrorObj={setErrorObj}
            marginTop="31px"
          />
          <InputContainer
            name="phoneNumber"
            placeholderText="Enter your phone number"
            required={true}
            type="text"
            value={userObj.phoneNumber}
            setUserObj={setUserObj}
            label="Phone number"
            errorObj={errorObj}
            setErrorObj={setErrorObj}
            marginTop="29px"
          />
          <InputContainer
            name="email"
            placeholderText="Enter your email"
            required={true}
            type="email"
            value={userObj.email}
            setUserObj={setUserObj}
            label="Email address"
            errorObj={errorObj}
            setErrorObj={setErrorObj}
            marginTop="29px"
          />
          <InputContainer
            name="password"
            placeholderText="Enter your password"
            required={true}
            type="password"
            value={userObj.password}
            setUserObj={setUserObj}
            label="Password"
            errorObj={errorObj}
            setErrorObj={setErrorObj}
            marginTop="29px"
          />
          <InputContainer
            name="companyName"
            placeholderText="Enter your company name"
            required={false}
            type="text"
            value={userObj.companyName}
            setUserObj={setUserObj}
            label="Company name"
            errorObj={errorObj}
            setErrorObj={setErrorObj}
            marginTop="29px"
          />

          <div className="mt-4.5">
            <p className="text-[13px] text-[#1D2226] mb-2.5">
              Are you an agency?
              <span className="text-[#dd4a3d] text-[13px]">*</span>
            </p>
            <input
              type="radio"
              id="yes"
              name="agency"
              value="yes"
              checked={userObj.agency === "yes"}
              className="align-middle accent-[#6C25FF] w-5.5 h-5.5 outline-none cursor-pointer"
              onChange={(e) =>
                setUserObj((prevState) => {
                  return {
                    ...prevState,
                    [e.target.name]: e.target.value.trimStart(),
                  };
                })
              }
            />
            <label htmlFor="yes" className="text-[14px] ml-3 text-[#1D2226]">
              Yes
            </label>
            <input
              type="radio"
              id="no"
              name="agency"
              value="no"
              className="ml-6 align-middle accent-[#6C25FF] w-5.5 h-5.5 outline-none cursor-pointer"
              required={true}
              checked={userObj.agency === "no"}
              onChange={(e) =>
                setUserObj((prevState) => {
                  return {
                    ...prevState,
                    [e.target.name]: e.target.value.trimStart(),
                  };
                })
              }
            />
            <label htmlFor="no" className="text-[14px] ml-3 text-[#1D2226]">
              No
            </label>
          </div>
        </div>
        <button
          disabled={isDisabled}
          className={`text-white text-[16px] font-medium py-3.5 rounded-md mt-[14px] cursor-pointer ${
            isDisabled ? "bg-[#cbcbcb]" : "bg-[#6C25FF]"
          }`}
        >
          Create Account
        </button>
      </form>
    </>
  );
}

export default RegisterForm;