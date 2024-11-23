import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";
import { IconDropdownDownSmall } from "../../assets/icons/icons";
import { useFormModalStore } from "../hook/useFormModalStore";
import axios from "axios";
import Cookies from "js-cookie";

const Form = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");

  const [currentLang, setCurrentLang] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );
  const { onOpen, isOpen } = useFormModalStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const newLang = localStorage.getItem("i18nextLng");
      if (newLang && newLang !== currentLang) {
        setCurrentLang(newLang);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [currentLang]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let isValid = true;

    // Validation for Category
    if (!selectedValue) {
      setCategoryError(t("form.categoryError"));
      isValid = false;
    } else {
      setCategoryError("");
    }

    // Validation for Comment/Description
    if (!comment) {
      setDescriptionError(t("form.descriptionError"));
      isValid = false;
    } else {
      setDescriptionError("");
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t("form.emailDescription")); // Message for empty email
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(t("form.invalidEmail")); // Message for invalid email
      isValid = false;
    } else {
      setEmailError("");
    }

    // Phone Validation
    if (!phone) {
      setTelError(t("form.phoneError"));
      isValid = false;
    } else {
      setTelError("");
    }

    if (!isValid) return;

    // Proceed with API call
    const selectedProject = localStorage.getItem("selectedCategory");
    if (!selectedProject) {
      console.error("Project not found in localStorage.");
      navigate("/choose");
      return;
    }

    const cleanedProject = selectedProject.replace(/^"|"$/g, "");
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Access token not found. Please log in first.");
      navigate("/login");
      return;
    }

    const apiUrl = `http://192.168.31.247:8002/${currentLang}/api/v1/intersoft/projects/${cleanedProject}/user-question-create/`;

    const formData = {
      question_category: selectedValue,
      description: comment,
      email,
      phone,
      language: currentLang,
    };

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        onOpen();

        // Clear inputs
        setSelectedValue("");
        setComment("");
        setEmail("");
        setPhone("");
      } else {
        console.error("Error:", response.data);
        alert(t("form.errorMessage"));
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(t("form.networkErrorMessage"));
    }
  };

  return (
    <form
      className="md:mt-6 mt-5 md:mb-36 mb-4 space-y-9"
      onSubmit={(e) => handleSubmit(e)}
    >
      {/* Subject */}
      <div className="relative">
        <label htmlFor="content" className="font-medium text-xl">
          {t("form.subject")}*
        </label>
        <select
          name="content"
          id="content"
          className="border border-[#B0B0B0] rounded-lg md:p-4 py-[14px] px-4 w-full mt-2 appearance-none outline-none 
              cursor-pointer md:text-xl text-base"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="" disabled>
            {t("form.selectTopic")}
          </option>
          <option value="test">{t("form.testOption")}</option>
          <option value="test">{t("form.testOption")}</option>
          <option value="test">{t("form.testOption")}</option>
          <option value="test">{t("form.testOption")}</option>
        </select>
        <div className="absolute inset-y-0 top-8 right-6 flex items-center pointer-events-none">
          <IconDropdownDownSmall className="size-4" />
        </div>
        {categoryError && <p className="text-red-500">{categoryError}</p>}
      </div>

      {/* Comment */}
      <div className="relative">
        <label htmlFor="msg" className="font-medium text-xl">
          {t("form.comment")}*
        </label>
        <textarea
          placeholder={t("form.describeQuestion")}
          name="msg"
          id="msg"
          rows={4}
          value={comment}
          className="border border-[#B0B0B0] rounded-lg md:p-4 py-[14px] px-4 w-full mt-2 outline-none min-h-32 max-h-64 
              resize-none md:text-xl text-base"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
      </div>

      <div className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-24 gap-4">
        <div className="md:w-1/2 w-full">
          <label htmlFor="email" className="text-xl">
            E-mail*
          </label>
          <input
            type="email"
            value={email}
            id="email"
            className="border border-[#B0B0B0] rounded-lg md:p-4 py-[14px] px-4 w-full mt-2 outline-none md:text-xl text-base"
            placeholder="имяфамилия@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <p className="text-[#757373] mt-2 md:text-lg text-sm">
            {t("form.emailDescription")}
          </p>
        </div>

        <div>
          <label htmlFor="tel" className="text-xl">
            {t("form.phoneNumber")}*
          </label>
          <PhoneInput
            placeholder="+998 91 234 56 77"
            containerStyle={{
              marginTop: "0.5rem",
              border: "1px solid #B0B0B0",
              width: "100%",
              borderRadius: ".5rem",
              paddingBlock: "16px",
            }}
            inputStyle={{
              fontSize: "1.25em",
              height: "100%",
              outline: "none",
              border: "none",
            }}
            dropdownStyle={{
              width: "37.0625rem",
              borderRadius: ".5rem",
              border: ".0625rem solid #D0D5DD",
              backgroundColor: "white",
            }}
            buttonStyle={{
              border: "none",
              background: "none",
              cursor: "default",
            }}
            country={"uz"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
          {telError && <p className="text-red-500">{telError}</p>}
          <p className="text-[#757373] mt-2 md:text-lg text-sm">
            {t("form.phoneDescription")}
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="lg:px-12 px-6 lg:py-[18px] py-2 mt-3 lg:text-lg font-semibold rounded-md text-white w-fit"
        style={{
          background: "linear-gradient(90deg, #092880 0%, #03051B 100%)",
        }}
      >
        {t("form.submit")}
      </button>
    </form>
  );
};

export default Form;
