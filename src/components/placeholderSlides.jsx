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