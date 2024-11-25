import { useNavigate, useParams } from "react-router-dom";
import edjsHTML from "editorjs-html";
import {
  customChecklistParser,
  customEmbedParser,
  customImgParser,
  customQuoteParser,
  customTableParser,
  customVideoParser,
  customHeadingParser,
} from "../utils/parsers";
import Help from "./Help";
import RelatedQuestions from "./RelatedQuestions";
import { useTranslation } from "react-i18next";
import { useQuestionDetail, useQuestions } from "../hook/useGetData";

const Answer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading: isQuestionsLoading, data: questions } = useQuestions();
  const { isLoading: isQuestionDetailLoading, data: questionDetail } =
    useQuestionDetail({
      slug: slug || "",
    });

  const currentCategory = questions?.find((accordion) =>
    accordion.filtered_questions.some((fq) => fq.slug === slug)
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const edjsParser = edjsHTML({
    Image: customImgParser,
    Video: customVideoParser,
    Header: customHeadingParser,
    Table: customTableParser,
    Quote: customQuoteParser,
    Checklist: customChecklistParser,
    Embed: customEmbedParser,
  });

  if (!questionDetail) return <></>;

  let contentHTML = edjsParser.parse(questionDetail.description);

  return (
    <div className={`${questionDetail ? "lg:min-h-[650px]" : "min-h-screen"}`}>
      <div className={`md:mt-8 mt-6`}>
        <p className="text text-[#7A7A7A]">
          <span onClick={() => navigate("/")} className="cursor-pointer">
            {t("answer.homePage")}
          </span>{" "}
          / {currentCategory?.title} /{" "}
          <span className="text-black">{questionDetail?.title}</span>
        </p>
      </div>
      <div className="md:mt-20 mt-11 flex md:flex-row flex-col md:justify-between md:gap-20 gap-12">
        {/* Main Content Section */}
        <div className="w-full">
          <h5 className="heading5 font-semibold md:mb-10 mb-6">
            {questionDetail?.title}
          </h5>

          {/* Display Metadata */}
          {questionDetail?.description?.time && (
            <p className="text-sm text-gray-500">
              {t("answer.publishedDate")}:{" "}
              {formatDate(questionDetail.description.time)}
            </p>
          )}
          {questionDetail?.description?.version && (
            <p className="text-sm text-gray-500">
              Версия: {questionDetail.description.version}
            </p>
          )}

          {questionDetail?.description.blocks &&
            contentHTML.map((e: any, index: any) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: e }} />
            ))}
        </div>

        {/* Related Questions Section */}
        <RelatedQuestions />
      </div>
      <Help />
    </div>
  );
};

export default Answer;
