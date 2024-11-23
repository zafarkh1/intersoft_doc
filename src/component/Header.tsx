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
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n, t } = useTranslation();
  const [isLogout, setIsLogout] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    localStorage.getItem("selectedCategory")?.replace(/^"|"$/g, "") || null
  );
  const [currentLang, setCurrentLang] = useState<string>(i18n.language || "en");

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const logoutDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: t("header.languages.en") || "English" },
    { code: "uz", label: t("header.languages.uz") || "Uzbek" },
    { code: "ru", label: t("header.languages.ru") || "Russian" },
  ];

  const { projects } = useData({ slug: "" });
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }

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

  // const capitalizeProjectNames = (projects: { name: string }[]) => {
  //   return projects.map((project) => ({
  //     ...project,
  //     name: project.name.charAt(0).toUpperCase() + project.name.slice(1),
  //   }));
  // };

  // const updatedProjects = capitalizeProjectNames(projects);

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

  // const handleLanguageChange = (lang: string) => {
  //   i18n.changeLanguage(lang);
  //   setCurrentLang(lang);
  //   localStorage.setItem("i18nextLng", lang);
  //   setIsLangDropdownOpen(false);
  // };

  const handleLanguageChange = (lang: string) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        setCurrentLang(lang);
        localStorage.setItem("i18nextLng", lang);
        setIsLangDropdownOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error changing language:", error);
      });
  };

  return (
    <header className="myContainer lg:mt-8 mt-7">
      <div className="flex items-center justify-between shadow-md shadow-black/10 rounded-2xl lg:py-4 lg:px-14 p-3 border border-[#F5F5F5]">
        {/* Language */}

        <div className="relative" ref={languageDropdownRef}>
          <button
            className="md:flex items-center hidden px-4 py-2 border rounded-md bg-gray-100"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          >
            <IconLanguage className="mr-2 size-4" />
            <span>
              {languages.find((lang) => lang.code === currentLang)?.label}
            </span>
            <IconDropdownDownSmall className="ml-2 size-3 fill-primary" />
          </button>

          {isLangDropdownOpen && (
            <ul className="absolute md:left-10 left-0 top-[37px] mt-2 md:text-base text-xs bg-white border border-[#EAEAEB] rounded-md shadow-md z-10">
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  className={`md:px-4 px-2 md:py-[10px] py-2 cursor-pointer hover:bg-[#f5f5f5] w-full flexBetween gap-2 ${
                    lang.code === currentLang ? "" : ""
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                  {lang.code === currentLang && (
                    <IconSelect className="size-3" />
                  )}
                </li>
              ))}
            </ul>
          )}

          <div
            className="md:hidden inline-block"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          >
            <IconLanguageMobile className="size-8" />
          </div>
        </div>

        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 mx-auto text-center flex-1 lg:flex-none lg:mx-0"
        >
          <img src={Logo} alt="logo" className="md:inline-block hidden" />
          <IconIntersoft className="md:hidden inline-block size-8 fill-[linear-gradient(90deg, #092880 0%, #03051B 100%)]" />
        </a>

        <div className="flexICenter md:gap-1 gap-4">
          {/* Project Dropdown */}
          <div
            className="relative md:min-w-[150px] md:h-fit h-8"
            ref={categoryDropdownRef}
          >
            <div className="hidden md:inline-block">
              <button
                className="navbarBtn rounded-md"
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
              <ul className="bg-white border border-[#E4E4E4] md:text-base text-xs rounded-md absolute md:top-14 top-10 md:-left-ful">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="md:py-[10px] py-2 md:px-4 px-2 hover:bg-[#f5f5f5] flexBetween gap-3 cursor-pointer"
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
                className="bg-[#fafafa] border border-[#E4E4E4] md:px-2 px-0 md:py-2 py-1 md:rounded-xl rounded-md md:text-base 
                text-xs absolute md:top-16 top-10 md:right-0 md:-left-full"
                onClick={handleLogout}
              >
                {t("header.logout")}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
