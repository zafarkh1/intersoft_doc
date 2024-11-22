import { Link, useNavigate, useParams } from "react-router-dom";
import useData from "../hook/useData";
import Help from "./Help";
import edjsHTML from "editorjs-html";

const Answer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { accordionQuestions, questionDetail } = useData({ slug: slug || "" });

  // Find related questions in accordionQuestions
  const relatedQuestions =
    accordionQuestions.find((accordion) =>
      accordion.filtered_questions.some((fq) => fq.slug === slug)
    )?.filtered_questions || [];

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

  //  Find the current category
  const currentCategory = accordionQuestions.find((accordion) =>
    accordion.filtered_questions.some((fq) => fq.slug === slug)
  );

  function customImgParser(block: { data: { file: { url: string } } }) {
    return `<img src="http://192.168.31.247:8002${block.data.file.url}" class="h-auto w-full"></img>`;
  }

  function customHeadingParser(block: {
    data: { text: string; level: number };
  }) {
    return `<h${block.data.level} class="font-semibold">${block.data.text}</h${block.data.level}>`;
  }

  function customTableParser(block: { data: { content: string[][] } }) {
    const rows = block.data.content
      .map(
        (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
      )
      .join("");
    return `<table class="custom-table"><tbody>${rows}</tbody></table>`;
  }

  function customQuoteParser(block: any) {
    return ``;
  }

  function customVideoParser(block: { data: { file: { url: string } } }) {
    console.log(`http://192.168.31.247:8002${block.data.file.url}`);

    return `<video controls><source src="http://192.168.31.247:8002${block.data.file.url}" type="video/mp4" /></video>`;
  }

  function customChecklistParser(block: {
    data: { items: { text: string; checked: boolean }[] };
  }) {
    const itemsHTML = block.data.items
      .map(
        (item) =>
          `<li class="checklist-item ${item.checked ? "checked" : ""}">
            <input type="checkbox" ${item.checked ? "checked" : ""}>
            <span>${item.text}</span>
          </li>`
      )
      .join("");
    return `<ul class="custom-checklist">${itemsHTML}</ul>`;
  }

  const edjsParser = edjsHTML({
    Image: customImgParser,
    Video: customVideoParser,
    Header: customHeadingParser,
    Table: customTableParser,
    Quote: customQuoteParser,
    Checklist: customChecklistParser,
  });

  if (!questionDetail) return <></>;

  let contentHTML = edjsParser.parse(questionDetail.description);
  console.log(questionDetail.description);

  // console.log(contentHTML);

  return (
    <>
      <div className="md:mt-8 mt-6">
        <p className="text text-[#7A7A7A]">
          <span onClick={() => navigate("/")} className="cursor-pointer">
            Главная страница
          </span>{" "}
          / {currentCategory?.title} /{" "}
          <span className="text-black">{questionDetail?.title}</span>
        </p>
      </div>
      <div className="md:mt-20 mt-11 flex lg:flex-row flex-col lg:justify-between lg:gap-20 gap-12">
        {/* Main Content Section */}
        <div className="w-full">
          <h5 className="heading5 font-semibold lg:mb-10 mb-6">
            {questionDetail?.title}
          </h5>
          {/* <div dangerouslySetInnerHTML={{ __html: markup }}></div> */}

          {/* Display Metadata */}
          {questionDetail?.description?.time && (
            <p className="text-sm text-gray-500">
              Дата публикации: {formatDate(questionDetail.description.time)}
            </p>
          )}
          {/* {questionDetail?.description?.version && (
            <p className="text-sm text-gray-500">
              Версия: {questionDetail.description.version}
            </p>
          )} */}

          {questionDetail?.description.blocks &&
            contentHTML.map((e: any, index: any) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: e }} />
            ))}
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
                <Link to={`/${item.slug}`} className="">
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Help />
    </>
  );
};

export default Answer;

// const formatText = (text: string) => text.replace(/\n/g, "<br>");

// const renderBlock = (block: { id: string; type: string; data: any }) => {
//   switch (block.type) {
//     case "Header":
//       return (
//         <h4
//           key={block.id}
//           dangerouslySetInnerHTML={{
//             __html: formatText(block.data.text),
//           }}
//         />
//       );
//     case "paragraph":
//       return (
//         <p
//           key={block.id}
//           dangerouslySetInnerHTML={{
//             __html: formatText(block.data.text),
//           }}
//         />
//       );
//     case "Image":
//       return (
//         <div key={block.id} className="my-4">
//           <img
//             src={block.data.file.url}
//             alt={block.data.caption || "Image"}
//             className={`w-full ${
//               block.data.stretched ? "max-w-none" : "max-w-md"
//             } ${block.data.withBorder ? "border" : ""} ${
//               block.data.withBackground ? "bg-gray-100 p-4" : ""
//             }`}
//           />
//           {block.data.caption && (
//             <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>
//           )}
//         </div>
//       );
//     case "Video":
//       return (
//         <div key={block.id} className="my-4">
//           <video
//             controls
//             className={`w-full ${
//               block.data.stretched ? "max-w-none" : "max-w-md"
//             } ${block.data.withBorder ? "border" : ""} ${
//               block.data.withBackground ? "bg-gray-100 p-4" : ""
//             }`}
//           >
//             <source src={block.data.file.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {block.data.caption && (
//             <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>
//           )}
//         </div>
//       );
//     default:
//       return null;
//   }
// };
