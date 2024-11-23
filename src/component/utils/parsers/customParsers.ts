// parsers/customParsers.ts
export function customImgParser(block: { data: { file: { url: string } } }) {
  return `<img src="http://192.168.31.247:8002${block.data.file.url}" class="h-auto w-full"></img>`;
}

export function customHeadingParser(block: {
  data: { text: string; level: number };
}) {
  return `<h${block.data.level} class="font-semibold">${block.data.text}</h${block.data.level}>`;
}

export function customTableParser(block: { data: { content: string[][] } }) {
  const rows = block.data.content
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");
  return `<table class="custom-table"><tbody>${rows}</tbody></table>`;
}

export function customQuoteParser(block: any) {
  return ``;
}

export function customVideoParser(block: { data: { file: { url: string } } }) {
  return `<video controls><source src="http://192.168.31.247:8002${block.data.file.url}" type="video/mp4" /></video>`;
}

export function customEmbedParser(block: {
  data: {
    embed?: string;
    source?: string;
    service?: string;
    width?: number;
    height?: number;
  };
}) {
  const { embed, source, service, height } = block.data;

  if (service === "youtube" && embed) {
    return `<iframe 
                width="full" 
                height="" 
                src="${embed}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="w-full h-[300px]">
              </iframe>`;
  } else if (source) {
    return `<video controls width="full" height="${height || 315}">
                <source src="${source}" type="video/mp4" />
                Your browser does not support the video tag.
              </video>`;
  }

  return `<p>Unsupported embed format.</p>`;
}

export function customChecklistParser(block: {
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
