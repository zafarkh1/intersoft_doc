import { useEffect, useRef, useState } from "react";
import { IconClose, IconSearch } from "../../assets/icons/icons";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");
  const searchRef = useRef<HTMLDivElement | null>(null);

  const { accordionQuestions } = useData({ slug: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="">
      {/* Heading */}
      <h3 className="text-[40px] leading-[48px] font-bold mb-12 text-center">
        {t("search.heading")}
      </h3>

      <div
        className="relative border border-primary rounded-2xl md:w-[720px] "
        ref={searchRef}
        onClick={() => setIsFocused(true)}
      >
        {/* Search input */}
        <div
          className={`md:p-[18px] py-2 px-4 lg:w-[720px] mx-auto flexBetween group ${
            isFocused && "border-b border-b-[#E0E0E0]"
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            {!isFocused && <IconSearch className="size-5" />}
            <input
              type="text"
              placeholder={t("search.placeholder")}
              className="w-full outline-none md:text-lg text-sm"
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setValue(e.target.value)}
              value={value ? value : ""}
            />
          </div>
          {(isFocused || value) && (
            <IconClose
              className="size-6 cursor-pointer"
              color="black"
              onClick={(e) => {
                setIsFocused(false);
                setValue("");
                e.stopPropagation();
              }}
            />
          )}
        </div>

        {/* Accordion list */}
        <div
          className={` overflow-hidden transition-all ease-in-out duration-700 text ${
            isFocused ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isFocused &&
            !value &&
            accordionQuestions?.slice(0, 3).map((item) =>
              item?.filtered_questions?.map((item, index) => (
                <div
                  key={index}
                  className={`md:p-[18px] p-2 transition-all ease-in-out duration-500 border-b border-b-[#E0E0E0]`}
                >
                  <span
                    className="cursor-pointer ease-in-out transition-all duration-500 hover:bg-clip-text
                  hover:bg-gradient-to-r from-[#092880] to-[#03051B] hover:underline"
                    onClick={() => navigate(`/${item.slug}`)}
                  >
                    {item.title}
                  </span>
                </div>
              ))
            )}

          {/* Searched list */}
          {value &&
            accordionQuestions?.map((item) =>
              item?.filtered_questions
                ?.filter((item) =>
                  item.title.toLowerCase().includes(value.toLowerCase())
                )
                .map((item, index, arr) => (
                  <div
                    key={index}
                    className={`p-[18px] transition-all duration-500 ${
                      index === arr.length - 1
                        ? ""
                        : "border-b border-b-[#E0E0E0]"
                    }`}
                  >
                    <span
                      className="cursor-pointer transition-all duration-500 hover:bg-clip-text
                hover:bg-gradient-to-r from-[#092880] to-[#03051B] hover:underline"
                      onClick={() => navigate(`/${item.slug}`)}
                    >
                      {item.title}
                    </span>
                  </div>
                ))
            )}
        </div>
      </div>

      {/* Popular questions */}
      {!isFocused && (
        <div className="text mt-4 lg:w-[720px] mx-auto space-x-2 md:text-left text-center md:line-clamp-2 line-clamp-3">
          <span>{t("search.popularQuestions")}</span>{" "}
          {accordionQuestions?.map((item) =>
            item?.filtered_questions?.map((item, index, array) => (
              <span key={index} className="text-[#757373]">
                <span
                  className="underline underline-offset-4  cursor-pointer"
                  onClick={() => navigate(`/${item.slug}`)}
                >
                  {item.title}
                </span>
                {index < array.length && <span>, </span>}{" "}
                {/* Add a comma if not the last item */}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
