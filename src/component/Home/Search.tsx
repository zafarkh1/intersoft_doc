import { useEffect, useRef, useState } from "react";
import { IconClose, IconSearch } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestions } from "../hook/useGetData";

const Search = () => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");
  const searchRef = useRef<HTMLDivElement | null>(null);

  const { isLoading: isQuestionsLoading, data: questions } = useQuestions();
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
  }, []);

  return (
    <div className="relative">
      {/* Heading */}
      <h3 className="text-[40px] leading-[48px] font-bold mb-12 text-center">
        {t("search.heading")}
      </h3>

      <div
        className="relative border border-primary rounded-2xl lg:w-[720px] md:w-[600px] mx-auto"
        ref={searchRef}
        onClick={() => setIsFocused(true)}
      >
        {/* Search Input */}
        <motion.div
          className={`md:p-[18px] py-2 px-4 lg:w-[720px] md:w-[600px] mx-auto flex items-center group ${
            isFocused ? "border-b border-b-[#E0E0E0]" : ""
          }`}
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {!isFocused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="mr-2"
              >
                <IconSearch className="size-5" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.input
            type="text"
            placeholder={t("search.placeholder")}
            className="w-full outline-none md:text-lg text-sm"
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <AnimatePresence mode="wait">
            {(isFocused || value) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <IconClose
                  className="size-6 cursor-pointer"
                  color="black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue("");
                    setIsFocused(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isFocused
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {!value &&
            questions?.slice(0, 3).map((item) =>
              item?.filtered_questions?.map((question, index) => (
                <div
                  key={index}
                  className="md:p-[18px] p-2 border-b border-b-[#E0E0E0]"
                >
                  <span
                    className="cursor-pointer hover:bg-clip-text hover:bg-gradient-to-r from-[#092880] to-[#03051B] hover:underline"
                    onClick={() => navigate(`/${question.slug}`)}
                  >
                    {question.title}
                  </span>
                </div>
              ))
            )}

          {/* Searched Results */}
          {value &&
            questions?.map((item) =>
              item?.filtered_questions
                ?.filter((question) =>
                  question.title.toLowerCase().includes(value.toLowerCase())
                )
                .map((question, index, arr) => (
                  <div
                    key={index}
                    className={`p-[18px] ${
                      index === arr.length - 1
                        ? ""
                        : "border-b border-b-[#E0E0E0]"
                    }`}
                  >
                    <span
                      className="cursor-pointer hover:bg-clip-text hover:bg-gradient-to-r from-[#092880] to-[#03051B] hover:underline"
                      onClick={() => navigate(`/${question.slug}`)}
                    >
                      {question.title}
                    </span>
                  </div>
                ))
            )}
        </motion.div>
      </div>

      {/* Popular Questions */}
      {!isFocused && (
        <div className="text mt-4 lg:w-[720px] md:w-[600px] mx-auto space-x-2 md:text-left text-center md:line-clamp-2 line-clamp-3">
          <span>{t("search.popularQuestions")}</span>{" "}
          {questions?.map((item) =>
            item?.filtered_questions?.map((question, index, array) => (
              <span key={index} className="text-[#757373]">
                <span
                  className="underline underline-offset-4 cursor-pointer"
                  onClick={() => navigate(`/${question.slug}`)}
                >
                  {question.title}
                </span>
                {index < array.length && <span>, </span>}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
