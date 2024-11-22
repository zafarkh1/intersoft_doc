import { useNavigate } from "react-router-dom";
import { IconDropdownDownSmall } from "../assets/icons/icons";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Contact = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const navigate = useNavigate();

  return (
    <section className="min-h-[600px]">
      <div className="md:mt-8 mt-6">
        <p className="text text-[#7A7A7A]">
          <span onClick={() => navigate("/")} className="cursor-pointer">
            Главная страница
          </span>{" "}
          /<span className="text-black"> Обратная связь</span>
        </p>
      </div>

      <div className="mt-20">
        <h2 className="md:text-3xl text-2xl font-semibold">
          Добро пожаловать!
        </h2>
        <p className="md:text-2xl text-xl md:mt-4 mt-2 text-[#757373]">
          Вы можете оставить свою заявку, наши специалисты вам обязательно
          помогут
        </p>

        {/*          Form      */}
        <form className="md:mt-6 mt-5 md:mb-36 mb-4 space-y-9">
          {/*    Тема   */}
          <div className="relative">
            <label htmlFor="content" className="font-medium text-xl">
              Тема*
            </label>
            <select
              name="content"
              id="content"
              className="border border-[#B0B0B0] rounded-lg md:p-4 py-[14px] px-4 w-full mt-2 appearance-none outline-none 
              cursor-pointer md:text-xl text-base"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="" className="" disabled>
                Выберите тему
              </option>
              <option value="test">Test</option>
              <option value="test">Test</option>
              <option value="test">Test</option>
              <option value="test">Test</option>
            </select>
            <div className="absolute inset-y-0 top-8 right-6 flex items-center pointer-events-none">
              <IconDropdownDownSmall className="size-4" />
            </div>
          </div>

          {/*    Комментарий   */}
          <div className="relative">
            <label htmlFor="msg" className="font-medium text-xl">
              Комментарий*
            </label>
            <textarea
              placeholder="Опишите, пожалуйста, ваш вопрос подробно"
              name="msg"
              id="msg"
              rows={4}
              className="border border-[#B0B0B0] rounded-lg md:p-4 py-[14px] px-4 w-full mt-2 outline-none min-h-32 max-h-64 
              resize-none md:text-xl text-base"
            ></textarea>
          </div>

          <div className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-24 gap-4">
            <div className="md:w-1/2 w-full">
              <label htmlFor="email" className="text-xl">
                E-mail*
              </label>
              <input
                type="email"
                id="email"
                className="border border-[#B0B0B0] rounded-lg md:p-4 py-[14px] px-4 w-full mt-2 outline-none md:text-xl text-base"
                placeholder="имяфамилия@gmail.com"
              />
              <p className="text-[#757373] mt-2 md:text-lg text-sm">
                Чтобы мы могли сообщить вам о выполнении заявки, а вы — написать
                нам в случае возникновения вопросов по обращению
              </p>
            </div>

            <div>
              <label htmlFor="tel" className="text-xl">
                Номер телефона*
              </label>
              <PhoneInput
                onFocus={(e) => e.preventDefault()} // Prevent focus behavior
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
                  cursor: "default", // Remove hover cursor
                }}
                country={"uz"}
                // value={phone}
                // onChange={setPhone}
              />

              <p className="text-[#757373] mt-2 md:text-lg text-sm">
                Чтобы мы могли оперативно связаться с вами, если с почтой
                возникнут сложности
              </p>
            </div>
          </div>

          <button
            className="lg:px-12 px-6 lg:py-[18px] py-2 mt-3 lg:text-lg font-semibold rounded-md text-white w-fit"
            style={{
              background: "linear-gradient(90deg, #092880 0%, #03051B 100%)",
            }}
            onClick={() => navigate("/contact")}
          >
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
