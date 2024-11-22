import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  IconArrowDown,
  IconArrowRight,
  IconDropdownBottomLarge,
  IconDropdownTopLarge,
} from "../../assets/icons/icons";
import useData from "../hook/useData";

const MyAccordion = () => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const navigate = useNavigate();
  const { accordionQuestions } = useData({ slug: "" });

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="lg:mt-80 mt-40">
      {/* Text */}
      <div className="flex flex-col items-center gap-2 lg:text-2xl text-xl">
        <p>Статьи по теме</p>
        <span className="">
          <IconArrowDown className="size-6" />
        </span>
      </div>

      {/* Accordion */}
      <div className="lg:w-[900px] rounded-xl border border-[#EAECF0] lg:my-16 mt-8 mb-10 font-semibold overflow-hidden">
        {accordionQuestions?.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
            disableGutters
            sx={{
              boxShadow: "none",
              "&:before": { display: "none" },
              "&.MuiAccordion-root": {
                borderBottom: "1px solid #EAECF0",
              },
            }}
          >
            <AccordionSummary
              aria-controls={`panel${item.id}-content`}
              id={`panel${item.id}-header`}
              sx={{
                padding: "0 16px",
                minHeight: "48px",
                "& .MuiAccordionSummary-content": {
                  margin: "12px 0",
                },
              }}
            >
              <div className="w-full flex items-center justify-between gap-4 md:py-2">
                <div className="flexICenter gap-3">
                  <img src={item.icon} alt={item.title} className="h-8 w-8" />
                  <p className="text">{item.title}</p>
                </div>
                {/* Conditionally render the appropriate icon */}
                {expanded === item.id ? (
                  <IconDropdownTopLarge
                    className="md:size-6 size-5"
                    color="#242222"
                    weight={2}
                  />
                ) : (
                  <IconDropdownBottomLarge
                    className="md:size-6 size-5"
                    color="#242222"
                    weight={2}
                  />
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
              <ol className="space-y-2">
                {item.filtered_questions.map((item, index) => (
                  <li
                    key={index}
                    className="font-light text hover:bg-[#09288033] cursor-pointer w-full flex justify-between items-center px-4 
                    py-2 group transition-all duration-500"
                    onClick={() => navigate(`/${item.slug}`)}
                  >
                    <div className="flex ml-4">
                      <span className="mr-1">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      {item.title}
                    </div>

                    <span className="hidden group-hover:inline-block">
                      <IconArrowRight className="md:size-6 size-5" />
                    </span>
                  </li>
                ))}
              </ol>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Btn */}
      <div className="text-center">
        <h5 className="heading5 font-semibold">Нужна дополнительная помощь?</h5>
        <button
          className="lg:px-8 px-6 lg:py-[15px] py-2 lg:text-lg font-semibold rounded-md text-white lg:mt-5 mt-3"
          style={{
            background: "linear-gradient(90deg, #092880 0%, #03051B 100%)",
          }}
          onClick={() => navigate("/contact")}
        >
          Связаться с нами
        </button>
      </div>
    </div>
  );
};

export default MyAccordion;
