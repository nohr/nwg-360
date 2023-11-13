import { proxy } from "valtio";

export const state = proxy({
  confirm: false,
  loading: true,
  inputText: "Drop Images or JSON Here",
  isContextOpen: false,
  selected: [] as string[],
  status: "",
  scale: 1,
  svgRef: undefined as any,
  tool: "select" as Tool,
  zoom: false,
  showToolbar: true,
  showShapeLayers: true,
  showHiddenShapeLayers: true,
  showNav: false,
  openRecentModal: false,
  localProjects: [] as Project[],
  titleInputConfig: {
    hidden: true,
    value: "untitled",
  } as TitleInputConfig,
  colors: {
    unit: {
      default: "rgb(82,233,0)",
      hidden: "rgb(2,6,23,0.5)",
    },
    selected: {
      select: "rgb(255,83,83)",
      add_unit: "#fff",
      skew: "#00ddff",
    },
  },
});

export const working_copy = proxy<WorkingCopy>({
  project: undefined,
  uuid: "",
  title: "",
  images: [],
  frames: [],
  currentIndex: 0,
  dateCreated: "",
  dateModified: "",
  dimensions: {
    width: 0,
    height: 0,
  },
  isChanged: false,
  history: { undo: [], redo: [] },
});
