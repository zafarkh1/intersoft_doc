import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo_footer.png";
import LoginBg from "../assets/images/login_bg.png";
import { useAuth } from "../component/provider/AuthContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.31.247:8002/ru/api/v1/users/login/",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        if (response.data.access) {
          Cookies.set("access_token", response.data.access, {
            expires: 0.5 * (1 / 24),
          });
        }

        if (response.data.refresh) {
          Cookies.set("refresh_token", response.data.refresh, { expires: 7 });
        }

        setAuthenticated(true);
        navigate("/choose");
      }
    } catch (error: any) {
      setError("Invalid login or password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="lg:h-screen lg:px-8 py-8 mx-auto flex lg:flex-row flex-col lg:items-stretch items-center">
      <div className="lg:w-1/2 relative lg:px-0 px-10">
        {/* Logo */}
        <Link to="/" className="">
          <img src={Logo} alt="logo" />
        </Link>

        {/* Form content */}
        <div className="lg:mt-0 mt-20 lg:absolute top-1/2 left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-fit">
          <h1 className="heading5 font-semibold text-center">Войти</h1>
          <p className="lg:mt-3 text-[#757373] text-center">
            Войдите в свой профиль что-бы продолжить{" "}
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Form */}
          <form className="mt-4" onSubmit={handleSubmit}>
            <label htmlFor="username" className="text-sm">
              Войти
            </label>
            <input
              type="text"
              id="username"
              placeholder="Введите логин"
              className="border border-[#B0B0B0] rounded-xl p-3 w-full outline-none mt-[6px] lg:mb-5 mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="text-sm">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              className="border border-[#B0B0B0] rounded-xl p-3 w-full outline-none mt-[6px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white rounded-xl p-3 w-full mt-5"
            >
              Войти
            </button>
          </form>
        </div>
      </div>

      {/* Image */}
      <div className="lg:w-1/2 lg:block hidden">
        <img src={LoginBg} alt="login_bg" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
