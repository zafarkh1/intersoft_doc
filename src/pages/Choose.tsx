import { useNavigate } from "react-router-dom";
import useData from "../component/hook/useData";

const Choose = () => {
  const { projects } = useData({ slug: "" });
  const navigate = useNavigate();

  const handleStoreLocalStorage = (slug: string) => {
    localStorage.setItem("selectedCategory", JSON.stringify(slug));
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center lg:px-24">
      <h5 className="heading5 font-semibold">Выберите компанию</h5>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 lg:gap-8 gap-4 lg:mt-16 mt-8">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer"
            onClick={() => handleStoreLocalStorage(project.slug)}
          >
            <img
              src={project.picture.large}
              alt={project.name}
              className="w-80 lg:h-44 h-24 rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;