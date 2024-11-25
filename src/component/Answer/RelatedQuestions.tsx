import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuestions } from "../hook/useGetData";

const RelatedQuestions = () => {
  const { slug } = useParams();
  const { isLoading: isQuestionsLoading, data: questions } = useQuestions();
  const { t } = useTranslation();

  const relatedQuestions =
    questions?.find((accordion) =>
      accordion.filtered_questions.some((fq) => fq.slug === slug)
    )?.filtered_questions || [];

  return (
    <div className="rounded-xl py-4 px-6 border border-[#E4E4E4] h-fit md:w-[430px]">
      <h6 className="heading6 font-semibold">{t("answer.relatedQuestions")}</h6>
      <ol className="space-y-2 mt-4 list-decimal list-inside">
        {relatedQuestions.map((item, index) => (
          <li
            key={item.id}
            className={`text ${
              item.slug === slug &&
              "underline text--gradient-to-b from-[#092880] to-[#03051B] underline-offset-4 "
            }`}
          >
            {/* <span className="">{String(index + 1) + "."}</span> */}
            <Link to={`/${item.slug}`} className="">
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RelatedQuestions;
