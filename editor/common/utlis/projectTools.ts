import { state, working_copy } from "@/common/state";
import { v4 as uuid } from "uuid";
import { FormEvent } from "react";
import { updateStatus } from "./editorTools";

export const CheckProjectChange = (): boolean => {
  if (!working_copy.project || working_copy.uuid === working_copy.project.uuid)
    return false;
  return true;
};

export const handleProjectSave = (e?: FormEvent) => {
  const new_project_uuid = uuid().slice(0, 8);

  // if no project is loaded, create a new one
  if (working_copy.project === undefined && e) {
    e.preventDefault();
    if (!e.nativeEvent.target) return;
    const newProject: Project = {
      title: ((e.nativeEvent.target as HTMLFormElement)[0] as HTMLInputElement)
        .value,
      // imgDir: working_copy.imgDir,
      dateCreated: `${new Date().toLocaleString()}`,
      dateModified: `${new Date().toLocaleString()}`,
      frames: working_copy.frames,
      dimensions: working_copy.dimensions,
      uuid: new_project_uuid,
      currentIndex: working_copy.currentIndex,
      // images: working_copy.images,
      history: working_copy.history,
    };
    working_copy.project = newProject;
    return;
  }

  // if a project is already loaded, update it
  // todo: also update the file in the server
  if (working_copy.project) {
    working_copy.project.dateModified = `${new Date().toLocaleString()}`;
    working_copy.project.frames = working_copy.frames;
    working_copy.project.currentIndex = working_copy.currentIndex;
    // working_copy.project.images = working_copy.images;
    // working_copy.project.imgDir = working_copy.imgDir;
    working_copy.project.dimensions = working_copy.dimensions;
    working_copy.project.uuid = working_copy.uuid;
    working_copy.project.history = working_copy.history;
    working_copy.project.title = working_copy.title;
  }

  // update the local storage
  const projects = localStorage.getItem("projects");
  if (projects) {
    const parsedProjects = JSON.parse(projects) as Project[];
    const index = parsedProjects.findIndex(
      (project) => project.uuid === working_copy.uuid,
    );
    if (index !== -1) {
      parsedProjects[index] = working_copy.project as Project;
      localStorage.setItem("projects", JSON.stringify(parsedProjects));
    }
  } else {
    localStorage.setItem(
      "projects",
      JSON.stringify([working_copy.project as Project]),
    );
  }

  updateStatus(`Saved ${working_copy.project?.uuid}`);
  console.log(working_copy.project);
};

export const handleProjectExport = () => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(working_copy.project));
  const dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `${working_copy.project?.title}.json`);
  dlAnchorElem.click();
  dlAnchorElem.remove();
};

export const handleProjectClose = () => {
  state.showNav = false;
  state.inputText = "Drop Images or JSON Here";
  working_copy.project = undefined;
  working_copy.images = [];
  working_copy.frames = [];
  working_copy.uuid = "";
  working_copy.dimensions = { width: 0, height: 0 };
  working_copy.title = "";
  // working_copy.imgDir = "";
  working_copy.dateModified = "";
  working_copy.dateCreated = "";
  working_copy.currentIndex = 0;
  working_copy.history = {
    undo: [],
    redo: [],
  };
  working_copy.isChanged = false;
};

export const handleProjectLoad = (project: Project, from: "local" | "disk") => {
  updateStatus(
    `Loaded ${project.uuid} from ${from === "local" ? "local storage" : from}`,
  );
  state.showNav = true;
  working_copy.project = project;
  working_copy.currentIndex = project.currentIndex;
  working_copy.history = project.history;
  working_copy.title = project.title;
  working_copy.dateModified = project.dateModified;
  working_copy.frames = project.frames;
  working_copy.uuid = project.uuid;
  working_copy.dimensions = project.dimensions;
  // working_copy.imgDir = project.imgDir;

  if (project.frames.length > 0) {
    state.inputText = `Expecting ${project.frames.length} images`;
  }
  if (project.images?.length > 0) {
    working_copy.images = project.images;
    // getDimensions(project.images[0]).then(
    //   (res: unknown) => (working_copy.dimensions = res as Dimensions),
    // );
  }
};

export const handleLoadProjectsFromLocalStore = () => {
  const projects = localStorage.getItem("projects");
  if (projects) {
    const parsedProjects = JSON.parse(projects) as Project[];
    state.localProjects = parsedProjects;
  }
};
