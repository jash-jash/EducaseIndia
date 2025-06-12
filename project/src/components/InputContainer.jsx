import React from "react";

function InputContainer({
  name,
  placeholderText,
  required,
  type,
  value,
  setUserObj,
  label,
  errorObj,
  setErrorObj,
  marginTop,
}) {
  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (value === "" || /^\d+$/.test(value)) {
        setErrorObj((prevState) => {
          return {
            ...prevState,
            [name]: "",
          };
        });
        setUserObj((prevState) => {
          return {
            ...prevState,
            [name]: value.trimStart(),
          };
        });
      }
    }
    else {
      setUserObj((prevState) => {
        return {
          ...prevState,
          [name]: value.trimStart(),
        };
      });
      setErrorObj((prevState) => {
        return {
          ...prevState,
          [name]: "",
        };
      });
    }
  }

  return (
    <>
      <div className="relative flex" style={{ marginTop: marginTop }}>
        <p className="text-[13px] text-[#6c25ff] font-rubik bg-[#F7F8F9] inline-block absolute -top-3 left-3 px-1">
          {label}
          {required && <span className="text-[#dd4a3d] text-[13px]">*</span>}
        </p>
        <input
          type={type}
          placeholder={placeholderText}
          className="border border-[#cbcbcb] rounded-md px-4 py-3 text-[14px] placeholder:text-[#919191] font-rubik outline-none text-[#1d2226] w-full"
          name={name}
          onChange={handleInputChange}
          value={value}
          required={required}
        />
        <p className="absolute text-[#dd4a3d] text-[12px] top-11 left-0">
          {errorObj[name]}
        </p>
      </div>
    </>
  );
}

export default InputContainer;