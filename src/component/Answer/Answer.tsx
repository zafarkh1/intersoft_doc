import { useParams } from "react-router-dom";
import useData from "../hook/useData";
import Help from "./Help";

const Answer = () => {
  const { slug } = useParams();
  const { accordionQuestions, questionDetail } = useData({ slug: slug || "" });

  // Format text with newlines converted to <br>
  const formatText = (text: string) => text.replace(/\n/g, "<br>");

  // Find related questions in accordionQuestions
  const relatedQuestions =
    accordionQuestions.find((accordion) =>
      accordion.filtered_questions.some((fq) => fq.slug === slug)
    )?.filtered_questions || [];

  // Render dynamic content blocks
  const renderBlock = (block: { id: string; type: string; data: any }) => {
    switch (block.type) {
      case "Header":
        return (
          <h4
            key={block.id}
            dangerouslySetInnerHTML={{
              __html: formatText(block.data.text),
            }}
          />
        );
      case "paragraph":
        return (
          <p
            key={block.id}
            dangerouslySetInnerHTML={{
              __html: formatText(block.data.text),
            }}
          />
        );
      case "Image":
        return (
          <div key={block.id} className="my-4">
            <img
              src={block.data.file.url}
              alt={block.data.caption || "Image"}
              className={`w-full ${
                block.data.stretched ? "max-w-none" : "max-w-md"
              } ${block.data.withBorder ? "border" : ""} ${
                block.data.withBackground ? "bg-gray-100 p-4" : ""
              }`}
            />
            {block.data.caption && (
              <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>
            )}
          </div>
        );
      case "Video":
        return (
          <div key={block.id} className="my-4">
            <video
              controls
              className={`w-full ${
                block.data.stretched ? "max-w-none" : "max-w-md"
              } ${block.data.withBorder ? "border" : ""} ${
                block.data.withBackground ? "bg-gray-100 p-4" : ""
              }`}
            >
              <source src={block.data.file.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {block.data.caption && (
              <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Format timestamp into a readable date
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

  return (
    <div className="lg:mt-20 flex lg:flex-row flex-col lg:justify-between lg:gap-20">
      {/* Main Content Section */}
      <div className="w-full">
        <h5 className="heading5 font-semibold lg:mb-10 mb-6">
          {questionDetail?.title}
        </h5>

        {/* Display Metadata */}
        {questionDetail?.description?.time && (
          <p className="text-sm text-gray-500">
            Дата публикации: {formatDate(questionDetail.description.time)}
          </p>
        )}
        {questionDetail?.description?.version && (
          <p className="text-sm text-gray-500">
            Версия: {questionDetail.description.version}
          </p>
        )}

        {/* Render Description Blocks */}
        <div>{questionDetail?.description.blocks.map(renderBlock)}</div>

        <Help />
      </div>

      {/* Related Questions Section */}
      <div className="rounded-xl py-4 px-6 border border-[#E4E4E4] h-fit lg:w-[430px]">
        <h6 className="heading6 font-semibold">Другие вопросы по теме</h6>
        <ol className="space-y-2 mt-4">
          {relatedQuestions.map((item, index) => (
            <li
              key={item.id}
              className={`text line-clamp-2 ${
                item.slug === slug &&
                "underline text--gradient-to-b from-[#092880] to-[#03051B] underline-offset-4"
              }`}
            >
              <span className="">{String(index + 1) + "."}</span>
              <a href={`/${item.slug}`} className="">
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Answer;
