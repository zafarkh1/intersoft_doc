import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  IconArrowRight,
  IconDropdownBottomLarge,
  IconDropdownTopLarge,
} from "../../assets/icons/icons";
import HelpBtn from "./HelpBtn";
import AccordionHeading from "./AccordionHeading";
import { useQuestions } from "../hook/useGetData";

const MyAccordion = () => {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const navigate = useNavigate();
  const { isLoading: isQuestionsLoading, data: questions } = useQuestions();

  const handleToggle = (panel: number) => {
    setExpandedPanels(
      (prevExpandedPanels) =>
        prevExpandedPanels.includes(panel)
          ? prevExpandedPanels.filter((id) => id !== panel) // Collapse panel
          : [...prevExpandedPanels, panel] // Expand panel
    );
  };

  return (
    <div className="lg:mt-80 mt-40">
      {/* Text */}
      <AccordionHeading />

      {/* Accordion */}
      <div className="lg:w-[900px] rounded-xl border border-[#EAECF0] lg:my-16 mt-8 mb-10 font-semibold overflow-hidden">
        {questions?.map((item) => (
          <Accordion
            key={item.id}
            expanded={expandedPanels.includes(item.id)}
            onChange={() => handleToggle(item.id)}
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
                {expandedPanels.includes(item.id) ? (
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
              <ol className="">
                {item.filtered_questions.map((item, index) => (
                  <li
                    key={index}
                    className="font-light text hover:bg-[#09288033] cursor-pointer w-full flex justify-between items-center px-4 
                    py-[10px] group transition-all duration-500"
                    onClick={() => navigate(`/${item.slug}`)}
                  >
                    <div className="flex ml-4">
                      <span className="mr-1">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      {item.title}
                    </div>

                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <IconArrowRight className="md:size-6 size-5" />
                    </span>
                  </li>
                ))}
              </ol>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Button */}
      <HelpBtn />
    </div>
  );
};

export default MyAccordion;
