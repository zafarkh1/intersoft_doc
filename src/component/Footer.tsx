import {
  IconFacebook,
  IconInstagram,
  IconTelegram,
} from "../assets/icons/icons";
import Logo from "../assets/images/logo_footer.png";

const items = [
  {
    id: 1,
    icon: <IconInstagram className="size-[18px] fill-primary" />,
  },
  {
    id: 2,
    icon: <IconTelegram className="size-[18px] fill-primary" />,
  },
  {
    id: 3,
    icon: <IconFacebook className="size-[18px] fill-primary" />,
  },
];

const Footer = () => {
  return (
    <footer className="myContainer lg:mb-8 mb-7">
      <div className="shadow-md shadow-black/10 rounded-2xl lg:py-4 lg:px-14 border border-[#F5F5F5]">
        {/* Footer links */}
        <div className="flex justify-between items-center pb-4 border-b border-borderColor">
          {/* Logo */}
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {items.map((item) => (
              <span
                key={item.id}
                className="p-4 border border-[#F1F3F5] rounded-full"
              >
                {item.icon}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm pt-4 text-[#757373]">
          <p>© Intersoft 2024. Все права защищены </p>

          <div className="flex items-center gap-4">
            <p>Политика конфиденциальности</p>
            <p>Пользовательское соглашение</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
