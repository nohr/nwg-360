import React from "react";

function RecentProject({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      key={project.uuid}
      className="flex w-full cursor-pointer select-none flex-row items-center justify-between gap-4 rounded-[inherit] px-2  py-1 outline outline-2 outline-transparent transition duration-150 ease-in-out hover:text-blue-600 hover:outline-current dark:hover:text-blue-400"
      onClick={onClick}
    >
      {project.title}
      <span className="text-xs font-bold">{project.dateModified}</span>
    </div>
  );
}

export default RecentProject;
