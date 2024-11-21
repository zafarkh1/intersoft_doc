import { useNavigate } from "react-router-dom";
import {
  IconCategory,
  IconDropdownDownSmall,
  IconIntersoft,
  IconLanguage,
  IconLanguageMobile,
  IconSelect,
} from "../assets/icons/icons";
import Logo from "../assets/images/logo_navbar.png";
import Profile from "../assets/images/Avatars.svg";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import useData from "./hook/useData";

const Header = () => {
  const [isLogout, setIsLogout] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    localStorage.getItem("selectedCategory")?.replace(/^"|"$/g, "") || null
  );

  const logoutDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const { projects } = useData({ slug: "" });
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutDropdownRef.current &&
        !logoutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLogout(false);
      }

      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!selectedProject) {
    navigate("/choose");
    return null;
  }

  const capitalizeProjectNames = (projects: { name: string }[]) => {
    return projects.map((project) => ({
      ...project,
      name: project.name.charAt(0).toUpperCase() + project.name.slice(1),
    }));
  };

  const updatedProjects = capitalizeProjectNames(projects);

  const handleProjectChange = (slug: string) => {
    localStorage.setItem("selectedCategory", JSON.stringify(slug));
    setSelectedProject(slug);
    setIsDropdownOpen(false);
    window.location.reload();
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="myContainer lg:mt-8 mt-7">
      <div className="flex justify-between items-center shadow-md shadow-black/10 rounded-2xl lg:py-4 lg:px-14 p-3  border border-[#F5F5F5]">
        {/* Language */}
        <div className="md:inline-block hidden">
          <button className="navbarBtn ">
            <IconLanguage className="size-4" />
            <span className="">Русский</span>
            <IconDropdownDownSmall className="size-3 fill-primary" />
          </button>
        </div>

        <div className="md:hidden inline-block">
          <IconLanguageMobile className="size-8" />
        </div>

        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 mx-auto text-center flex-1 lg:flex-none lg:mx-0"
        >
          <img src={Logo} alt="logo" className="md:inline-block hidden" />
          <IconIntersoft className="md:hidden inline-block size-8 fill-[linear-gradient(90deg, #092880 0%, #03051B 100%);]" />
        </a>

        <div className="flexICenter md:gap-1 gap-4">
          {/* Project Dropdown */}
          <div
            className="relative md:min-w-[150px] md:h-fit h-8"
            ref={categoryDropdownRef}
          >
            <div className="hidden md:inline-block">
              <button
                className="navbarBtn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>
                  {
                    projects.find((project) => project.slug === selectedProject)
                      ?.name
                  }
                </span>
                <IconDropdownDownSmall className="size-3 fill-primary" />
              </button>
            </div>

            {/* Mobile */}
            <div className="md:hidden inline-block">
              <IconCategory
                className="size-8"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
            </div>

            {isDropdownOpen && (
              <ul className="bg-[#fafafa] border border-[#E4E4E4] md:px-1 px-0 md:py-2 py-1 rounded-xl md:text-sm text-xs absolute md:top-14 top-10 left-0 md:right-0 right-">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="py-1 md:px-3 px-2 hover:bg-gray-200 flexBetween gap-3 cursor-pointer"
                    onClick={() => handleProjectChange(project.slug)}
                  >
                    {project.name}
                    {project.slug === selectedProject && (
                      <IconSelect className="size-3" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Logout */}
          <div className="relative" ref={logoutDropdownRef}>
            <img
              src={Profile}
              alt="profile"
              onClick={() => setIsLogout(!isLogout)}
              className="cursor-pointer md:w-full md:h-full w-10 h-10 rounded-full"
            />
            {isLogout && (
              <button
                className="bg-[#fafafa] border border-[#E4E4E4] md:px-2 px-0 md:py-2 py-1 rounded-xl md:text-sm text-xs absolute md:top-16 top-10 md:left-0 -left-12 md:-right-20 "
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
