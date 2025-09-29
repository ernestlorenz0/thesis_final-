import {
  FaBookOpen,
  FaFlask,
  FaChartBar,
  FaLightbulb,
  FaProjectDiagram,
  FaUniversity,
} from "react-icons/fa";

export function Watermark({ type }) {
  const icons = {
    book: <FaBookOpen className="text-blue-900 text-[600px]" />,
    flask: <FaFlask className="text-blue-900 text-[600px]" />,
    chart: <FaChartBar className="text-blue-900 text-[600px]" />,
    idea: <FaLightbulb className="text-blue-900 text-[600px]" />,
    process: <FaProjectDiagram className="text-blue-900 text-[600px]" />,
    academy: <FaUniversity className="text-blue-900 text-[600px]" />,
  };

  return (
    <div className="absolute inset-0 pointer-events-none opacity-5 flex justify-center items-center">
      {icons[type] || icons.book}
    </div>
  );
}