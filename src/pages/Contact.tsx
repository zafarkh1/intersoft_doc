import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Form from "../component/Contact/Form";
import { useFormModalStore } from "../component/hook/useFormModalStore";
import ContactModal from "../component/Contact/ContactModal";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const navigate = useNavigate();
  const { isOpen } = useFormModalStore();
  const { t } = useTranslation();

  return (
    <>
      <section className="min-h-[600px]">
        {/* Breadcrumb */}
        <div className="md:mt-8 mt-6">
          <p className="text text-[#7A7A7A]">
            <span onClick={() => navigate("/")} className="cursor-pointer">
              {t("contact.home")}
            </span>{" "}
            /<span className="text-black"> {t("contact.feedback")}</span>
          </p>
        </div>

        {/* Heading */}
        <div className="mt-20">
          <h2 className="md:text-3xl text-2xl font-semibold">
            {t("contact.welcome")}
          </h2>
          <p className="md:text-2xl text-xl md:mt-4 mt-2 text-[#757373]">
            {t("contact.contactDescription")}
          </p>

          {/* Form */}
          <Form />
        </div>
      </section>
      {isOpen && <ContactModal />}
    </>
  );
};

export default Contact;
