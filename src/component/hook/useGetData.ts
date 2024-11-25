import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../api/api";
import { useCommonQuerySetup } from "./useQuerySetup";
import {
  Project,
  QuestionDetailType,
  QuestionType,
} from "../utils/types/dataTypes";

export const useProjects = () => {
  const { currentLanguage, token } = useCommonQuerySetup();

  return useQuery<Project[]>({
    queryKey: ["projects", currentLanguage],
    queryFn: () =>
      fetchWithAuth(
        `${process.env.REACT_APP_API_BASE_URL}/${currentLanguage}/api/v1/intersoft/projects/`,
        token!
      ),
    enabled: !!token,
  });
};

export const useQuestions = () => {
  const { currentLanguage, token, getCleanedProject } = useCommonQuerySetup();
  const cleanedProject = getCleanedProject();

  return useQuery<QuestionType[]>({
    queryKey: ["questions", currentLanguage, cleanedProject],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.REACT_APP_API_BASE_URL}/${currentLanguage}/api/v1/intersoft/projects/${cleanedProject}/question-category`,
        token!
      );

      return response?.results || [];
    },
    enabled: !!token && !!cleanedProject,
  });
};

export const useQuestionDetail = ({ slug }: { slug: string }) => {
  const { currentLanguage, token, getCleanedProject } = useCommonQuerySetup();
  const cleanedProject = getCleanedProject();

  return useQuery<QuestionDetailType>({
    queryKey: ["questionDetail", currentLanguage, slug],
    queryFn: () =>
      fetchWithAuth(
        `${process.env.REACT_APP_API_BASE_URL}/${currentLanguage}/api/v1/intersoft/projects/${cleanedProject}/questions/${slug}/`,
        token!
      ),
    enabled: !!token && !!cleanedProject,
  });
};
