import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Questions Interfaces
interface QuestionType {
  id: number;
  title: string;
  slug: string;
}

interface AccordionType {
  id: number;
  icon: string;
  title: string;
  filtered_questions: QuestionType[];
}

// Question Detail Interfaces
interface BlockDataType {
  text: string;
  level: number;
}

interface BlockType {
  id: string;
  data: BlockDataType;
  type: string;
}

interface DescriptionType {
  time: number;
  blocks: BlockType[];
  version: string;
}

interface QuestionDetailType {
  id: number;
  title: string;
  slug: string;
  description: DescriptionType;
}

// Project Interfaces
interface Picture {
  large: string;
  medium: string;
  original: string;
  small: string;
  thumbnail: string;
}

interface Project {
  id: number;
  name: string;
  picture: Picture;
  slug: string;
}

// Custom Hook
const useData = ({ slug }: { slug: string }) => {
  const [accordionQuestions, setAccordionQuestions] = useState<AccordionType[]>(
    []
  );
  const [questionDetail, setQuestionDetail] =
    useState<QuestionDetailType | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          console.error("Access token not found. Please log in first.");
          navigate("/login");
          return;
        }

        let cleanedProject: string = "";

        // Fetch Category
        try {
          const categoryResponse = await axios.get(
            "http://192.168.31.247:8002/ru/api/v1/intersoft/projects/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setProjects(categoryResponse.data);

          const selectedProject = localStorage.getItem("selectedCategory");

          if (!selectedProject) {
            console.error("Project not found in localStorage.");
            navigate("/choose");
            return;
          }
          cleanedProject = selectedProject.replace(/^"|"$/g, "");
        } catch (error) {
          console.error("Error fetching category:", error);
        }

        // Fetch Accordion Questions
        try {
          const accordionResponse = await axios.get(
            `http://192.168.31.247:8002/ru/api/v1/intersoft/projects/${cleanedProject}/question-category`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setAccordionQuestions(accordionResponse.data.results);
        } catch (error) {
          console.error("Error fetching accordion questions:", error);
        }

        // Fetch Question Detail
        if (slug) {
          try {
            const detailResponse = await axios.get(
              `http://192.168.31.247:8002/ru/api/v1/intersoft/projects/${cleanedProject}/questions/${slug}/`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            setQuestionDetail(detailResponse.data);
          } catch (error) {
            console.error("Error fetching question detail:", error);
          }
        }
      } catch (error) {
        console.error("Error during fetch process:", error);
      }
    };

    fetchData();
  }, [slug, navigate]);

  return { accordionQuestions, questionDetail, projects };
};

export default useData;
