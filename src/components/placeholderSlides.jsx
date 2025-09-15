import { v4 as uuidv4 } from "uuid";

export function getPlaceholderSlides(themeName) {
  return [
    {
      id: uuidv4(),
      components: [
        { id: uuidv4(), type: "title", content: `${themeName} Title Slide` },
        { id: uuidv4(), type: "paragraph", content: "Subtitle or description here" },
      ],
    },
    {
      id: uuidv4(),
      components: [
        { id: uuidv4(), type: "toc", content: "Table of Contents" },
        { id: uuidv4(), type: "toc_item", content: "Introduction to the Topic" },
        { id: uuidv4(), type: "toc_item", content: "Key Concepts and Definitions" },
        { id: uuidv4(), type: "toc_item", content: "Historical Background" },
        { id: uuidv4(), type: "toc_item", content: "Current Applications" },
        { id: uuidv4(), type: "toc_item", content: "Case Studies and Examples" },
        { id: uuidv4(), type: "toc_item", content: "Future Implications" },
        { id: uuidv4(), type: "toc_item", content: "Conclusion and Q&A" },
      ],
    },
    {
      id: uuidv4(),
      components: [
        { id: uuidv4(), type: "title", content: "Section Heading" },
        { id: uuidv4(), type: "paragraph", content: "Main content placeholder text" },
        { id: uuidv4(), type: "image", content: "" },
      ],
    },
    {
      id: uuidv4(),
      components: [
        { id: uuidv4(), type: "title", content: "Thank You!" },
        { id: uuidv4(), type: "paragraph", content: "Closing note or credits" },
      ],
    },
  ];
}