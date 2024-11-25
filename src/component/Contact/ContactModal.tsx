import { MouseEvent } from "react";
import {
  IconAcceptApplication,
  IconAgain,
  IconClose,
} from "../../assets/icons/icons";
import { useFormModalStore } from "../hook/useFormModalStore";
import { useTranslation } from "react-i18next";

const ContactModal = () => {
  const { onClose } = useFormModalStore();
  const { t } = useTranslation();

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 lg:px-0 px-6"
      onClick={handleClickOutside}
    >
      <div
        className="relative border border-[#B0B0B0] rounded-xl bg-white flex flex-col items-center gap-4 p-6 md:w-[600px] text-center"
        style={{ boxShadow: "0px 0px 40px 0px #0000001A" }}
      >
        <IconAcceptApplication className="size-10" />
        <h4 className="md:text-3xl text-2xl font-semibold">
          {t("contactModal.applicationAccepted")}
        </h4>
        <p className="md:text-lg text-sm">
          {t("contactModal.applicationMessage")}
        </p>
        <button className="flexICenter gap-2" onClick={() => onClose()}>
          {t("contactModal.resend")}
          <IconAgain className="size-5" />
        </button>
        <IconClose
          className="size-10 absolute -top-8 -right-8 cursor-pointer"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
};

export default ContactModal;
