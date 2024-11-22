import { useEffect, useRef, useState } from "react";
import { IconClose, IconSearch } from "../../assets/icons/icons";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";

const Search = () => {
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
        Чем мы можем помочь?
      </h3>

      <div className="border border-primary rounded-2xl" ref={searchRef}>
        {/* Search input */}
        <div
          className={`md:p-[18px] py-2 px-4 lg:w-[720px] mx-auto flexBetween group ${
            isFocused || (value && "border-b border-b-[#E0E0E0]")
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            {!isFocused && <IconSearch className="size-5" />}
            <input
              type="text"
              placeholder="Введите вопрос, тему или проблему"
              className="w-full outline-none md:text-lg text-sm"
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setValue(e.target.value)}
              value={value ? value : ""}
            />
          </div>
          {isFocused && (
            <IconClose
              className="size-6 cursor-pointer"
              onClick={() => {
                setIsFocused(false);
                setValue("");
              }}
            />
          )}
        </div>

        {/* Accordion list */}
        <div
          className={`overflow-hidden transition-all ease-in-out duration-700 text ${
            isFocused ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isFocused &&
            !value &&
            accordionQuestions?.slice(0, 3).map((item) =>
              item?.filtered_questions?.map((item, index, arr) => (
                <div
                  key={index}
                  className={`md:p-[18px] p-2 transition-all duration-500 border-b border-b-[#E0E0E0]`}
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

          {/* searched list */}
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
          <span>Популярные вопросы:</span>{" "}
          {accordionQuestions?.map((item) =>
            item?.filtered_questions?.map((item, index) => (
              <span
                key={index}
                className="underline underline-offset-4 text-[#757373] cursor-pointer"
                onClick={() => navigate(`/${item.slug}`)}
              >
                {" "}
                {item.title}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
