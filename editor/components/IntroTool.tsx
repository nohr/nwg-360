import React from "react";
import RecentProject from "./modal/RecentProject";
import { state } from "@/common/state";
import { handleProjectLoad } from "@/common/utlis/projectTools";
import NavButton from "./nav/navbutton";
import { VscNewFile } from "react-icons/vsc";

function IntroTool({ title }: { title: string }) {
  return (
    <div
      className={`${title === "New Project" ? "flex-row" : "flex-col"}
      flex h-fit w-full items-start justify-start gap-4 rounded-3xl border-[1px] border-slate-200/50 bg-slate-300/50 p-4 shadow-xl backdrop-blur-sm transition-all duration-150 ease-linear dark:border-slate-700/50 dark:bg-slate-800/50`}
    >
      <h2 className=" text-center text-base font-bold italic text-current">
        {title}
      </h2>
      {title === "Local Projects" ? (
        state.localProjects.map((project) => (
          <RecentProject
            key={project.uuid}
            project={project}
            // @ts-ignore
            onClick={() => handleProjectLoad(project, "local")}
          />
        ))
      ) : title === "New Project" ? (
        <NavButton
          title="start a new project..."
          onClick={() => {
            state.showNav = true;
            state.titleInputConfig = { hidden: false, value: "untitled" };
          }}
          className="px-2"
        >
          <VscNewFile className="h-6 w-6" />
        </NavButton>
      ) : null}
    </div>
  );
}

export default IntroTool;
