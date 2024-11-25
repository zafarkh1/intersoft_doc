import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "../component/hook/useGetData";

const Choose = () => {
  const { isLoading: isProjectsLoading, data: projects } = useProjects();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleStoreLocalStorage = (slug: string) => {
    localStorage.setItem("selectedCategory", JSON.stringify(slug));
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center lg:px-24 px-10">
      <h5 className="heading5 font-semibold text-center">
        {t("choose.chooseCompany")}
      </h5>
      <div className="flex flex-wrap items-center md:justify-start justify-center gap-8 lg:mt-16 mt-8">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer w-80"
            onClick={() => handleStoreLocalStorage(project.slug)}
          >
            <img
              src={project.picture.large}
              alt={project.name}
              className="w-80 md:h-44 h-32 rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
