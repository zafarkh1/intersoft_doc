import { Link } from "react-router-dom";
import {
  IconFacebook,
  IconInstagram,
  IconIntersoft,
  IconTelegram,
} from "../assets/icons/icons";
import Logo from "../assets/images/logo_footer.png";
import { useTranslation } from "react-i18next";

const items = [
  {
    id: 1,
    icon: <IconInstagram className="md:size-[18px] size-[15px] fill-primary" />,
    link: "https://www.instagram.com/",
  },
  {
    id: 2,
    icon: <IconTelegram className="md:size-[18px] size-[15px] fill-primary" />,
    link: "https://t.me/",
  },
  {
    id: 3,
    icon: <IconFacebook className="md:size-[18px] size-[15px] fill-primary" />,
    link: "https://www.facebook.com/",
  },
];

const Footer = () => {
  const { t } = useTranslation();

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

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {items.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                className="md:p-4 p-[10px] border border-[#F1F3F5] rounded-full"
                target="_blank"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-3 text-sm pt-4 text-[#757373]">
          <p>{t("footer.rightsReserved")}</p>

          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p>{t("footer.privacyPolicy")}</p>
            <p>{t("footer.userAgreement")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
