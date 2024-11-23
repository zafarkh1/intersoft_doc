import { useTranslation } from "react-i18next";
import { IconArrowDown } from "../../assets/icons/icons";

const AccordionHeading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2 lg:text-2xl text-xl">
      <p>{t("accordion.topicArticles")}</p>
      <span className="">
        <IconArrowDown className="size-6" />
      </span>
    </div>
  );
};

export default AccordionHeading;
