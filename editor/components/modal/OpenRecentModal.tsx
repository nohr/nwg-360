import { state } from "@/common/state";
import { handleProjectLoad } from "@/common/utlis/projectTools";
import React from "react";
import { useSnapshot } from "valtio";
import RecentProject from "./RecentProject";
import Modal from ".";

function OpenRecentModal() {
  const { localProjects, openRecentModal } = useSnapshot(state);

  return (
    <Modal
      bool={openRecentModal}
      overlayClick={() => (state.openRecentModal = false)}
      location="top-[2.75rem]"
      className="gap-4"
    >
      {localProjects.length ? (
        localProjects.map((project) => (
          <RecentProject
            key={project.uuid}
            // @ts-ignore
            project={project}
            onClick={() => {
              // @ts-ignore
              handleProjectLoad(project, "local");
              state.openRecentModal = false;
            }}
          />
        ))
      ) : (
        <div className="select-none text-xs font-bold uppercase">
          no projects found
        </div>
      )}
      <div
        className="cursor-pointer select-none text-xs font-bold uppercase hover:text-blue-600 hover:underline dark:hover:text-blue-400"
        onClick={() => document.getElementById("files")?.click()}
      >
        {`upload file(s)`}
      </div>
    </Modal>
  );
}

export default OpenRecentModal;
