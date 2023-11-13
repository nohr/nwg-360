import { Asset } from "expo-asset";
import { ColorSchemeName } from "react-native";
import { proxy } from "valtio";

// global state
export const state = proxy({
  orientation: null,
  theme: "light" as ColorSchemeName,
  menu: true,
  data: undefined as Project | undefined,
  assets: [] as Asset[],
  frames: [] as Unit[][],
  ws: undefined as WebSocket | undefined,
});

// view state
export const view = proxy({
  scale: 6,
  index: 0,
  shapes: true,
  rotation: 0,
  startRotation: 0,
  startX: 0,
});

// app state (cached settings)
export const app = proxy({
  control: true,
});
