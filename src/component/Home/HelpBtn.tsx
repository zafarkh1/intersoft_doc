import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HelpBtn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h5 className="heading5 font-semibold">{t("accordion.helpNeeded")}</h5>
      <button
        className="lg:px-8 px-6 lg:py-[15px] py-2 lg:text-lg font-semibold rounded-md text-white lg:mt-5 mt-3"
        style={{
          background: "linear-gradient(90deg, #092880 0%, #03051B 100%)",
        }}
        onClick={() => {
          navigate("/contact");
          window.scrollTo(0, 0);
        }}
      >
        {t("accordion.contactUs")}
      </button>
    </div>
  );
};

export default HelpBtn;
