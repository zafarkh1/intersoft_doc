import { useLangStore } from "./useLangStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useCommonQuerySetup = () => {
  const { currentLanguage } = useLangStore();
  const token = Cookies.get("access_token");
  const navigate = useNavigate();

  const getCleanedProject = () => {
    const selectedProject = localStorage.getItem("selectedCategory");
    if (!selectedProject) {
      console.error("Project not found in localStorage.");
      navigate("/choose");
      return null;
    }
    return selectedProject.replace(/^"|"$/g, "");
  };

  return { currentLanguage, token, navigate, getCleanedProject };
};
