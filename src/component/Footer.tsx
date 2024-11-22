import { Link } from "react-router-dom";
import {
  IconFacebook,
  IconInstagram,
  IconIntersoft,
  IconTelegram,
} from "../assets/icons/icons";
import Logo from "../assets/images/logo_footer.png";

const items = [
  {
    id: 1,
    icon: <IconInstagram className="md:size-[18px] size-[15px] fill-primary" />,
  },
  {
    id: 2,
    icon: <IconTelegram className="md:size-[18px] size-[15px] fill-primary" />,
  },
  {
    id: 3,
    icon: <IconFacebook className="md:size-[18px] size-[15px] fill-primary" />,
  },
];

const Footer = () => {
  return (
    <footer className="myContainer md:mb-8 mb-7">
      <div className="shadow-md shadow-black/10 rounded-2xl md:py-4 py-3 md:px-14 px-3 border border-[#F5F5F5]">
        {/* Footer links */}
        <div className="flex justify-between items-center pb-4 border-b border-borderColor">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="logo" className="md:inline-block hidden" />
            <IconIntersoft className="md:hidden inline-block size-8" />
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {items.map((item) => (
              <span
                key={item.id}
                className="md:p-4 p-[10px] border border-[#F1F3F5] rounded-full"
              >
                {item.icon}
              </span>
            ))}
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-3 text-sm pt-4 text-[#757373]">
          <p>© Intersoft 2024. Все права защищены </p>

          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p>Политика конфиденциальности</p>
            <p>Пользовательское соглашение</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
