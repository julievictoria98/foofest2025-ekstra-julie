"use client";
import { postVoluenteerInfo } from "../api";
import { useState } from "react";
function volunteerForm() {
  // const [emailError, setEmailError] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  function sendData(formData) {
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
    };
    postVoluenteerInfo(data);
  }

  const validateForm = (e) => {
    const inputElement = e.target;
    const inputName = inputElement.name;

    if (inputElement.value === "") {
      inputElement.style.outline = "2px solid red";
      setErrors((prevErros) => ({
        ...prevErros,
        [inputName]: inputName.includes("_")
          ? `Invalid ${inputName.replace("_", " ")}`
          : `Invalid ${inputName}.`,
      }));
    } else if ((inputName === "email") & !inputElement.value.includes("@")) {
      inputElement.style.outline = "2px solid red";
      setErrors({ email: "Invalid email" });
    } else if ((inputName === "email") & !inputElement.value.includes(".")) {
      inputElement.style.outline = "2px solid red";
      setErrors({ email: "Invalid email" });
    } else if ((inputName === "first_name") & (inputElement === "")) {
      setErrors({ first_name: "Invalid first name" });
    } else {
      inputElement.style.outline = "2px solid green";
      setErrors((prevErros) => ({
        ...prevErros,
        [inputName]: "",
      }));
    }
  };

  const focusMode = (e) => {
    const inputElement = e.target;
    const inputName = inputElement.name;

    setErrors((prevErros) => ({
      ...prevErros,
      [inputName]: "",
    }));
  };

  return (
    <section className="bg-primary p-8 -mx-mobile text-main-1 max-w-2xl sm:w-3/4 lg:-mx-desktop sm:self-center rounded-rounded-reg">
      <form action={sendData} className="flex flex-col gap-8 ">
        <fieldset>
          <legend className="font-rethink text-2xl mb-6">
            Contact information
          </legend>
          <div className="grid grid-cols-1 gap-4 align-baseline justify-end ">
            <div className="flex flex-col gap-1">
              <label for="first_name">First Name</label>
              <input
                onFocus={focusMode}
                onBlur={validateForm}
                type="text"
                name="first_name"
                placeholder="John"
                id="first_name"
                required
              ></input>
              <p className=" h-1 mb-1 text-xs text-feedback-error">
                {errors.first_name}
              </p>
            </div>
            <div className="flex flex-col">
              <label for="last_name">Last Name</label>
              <input
                onBlur={validateForm}
                onFocus={focusMode}
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Doe"
                required
              ></input>
              <p className=" h-1 text-xs text-feedback-error">
                {errors.last_name}
              </p>
            </div>
            <div className="flex flex-col">
              <label for="email">Email</label>
              <input
                onBlur={validateForm}
                onFocus={focusMode}
                type="email"
                id="email"
                name="email"
                placeholder="e.g. john@doe.com"
                pattern="[a-zA-Z0-9._+\-]+@[a-z0-9]+\.[a-z]{2,}"
                title="Please inter a valid email"
                required
              ></input>
              <p className=" h-1 text-xs text-feedback-error">{errors.email}</p>
            </div>
            <div className="flex flex-col">
              <label for="phone_number">Phone Number</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]{8}"
                placeholder="XXXX3095"
                id="phone_number"
                maxLength="8"
                minLength="8"
                required
              ></input>
            </div>
          </div>
        </fieldset>
        <button className="button grid place-self-start" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

export default volunteerForm;
