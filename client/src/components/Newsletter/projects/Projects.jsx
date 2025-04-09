import { useState } from "react";
import Titles from "./Titles/Titles";
import Descriptions from "./descriptions/Description";

const data = [
  {
    title: "Account",
    redirect: "/login",
    speed: 0.7,
  },
  {
    title: "Support",
    redirect: "/contact",
    speed: 0.7,
  },
  {
    title: "Terms & condition",
    redirect: "/terms",
    speed: 0.72,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="w-full absolute z-[1]">
      <Titles data={data} setSelectedProject={setSelectedProject} />
      <Descriptions data={data} selectedProject={selectedProject} />
    </div>
  );
}
