import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Help = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between items-center gap-4 lg:my-20 my-10 calc-Helpwidth">
      <h5 className="heading5 font-semibold">{t("help.needHelp")}</h5>
      <button
        className="lg:px-8 px-6 lg:py-[15px] py-2 lg:text-lg font-semibold rounded-md text-white w-fit"
        style={{
          background: "linear-gradient(90deg, #092880 0%, #03051B 100%)",
        }}
        onClick={() => navigate("/contact")}
      >
        {t("help.contactUs")}
      </button>
    </div>
  );
};

export default Help;
