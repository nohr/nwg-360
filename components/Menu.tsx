import { Pressable } from "react-native";
import { Text } from "./Themed";
import { state, view } from "@/constants/state";
import { useSnapshot } from "valtio/react";

export default function Menu() {
  const { menu } = useSnapshot(state);
  const { index, shapes } = useSnapshot(view);
  return (
    <>
      {/* <Pressable
        className=" absolute left-4 top-8 z-50 flex flex-row items-center justify-center gap-2 rounded-md p-2 font-bold !text-black"
        style={{ borderColor: menu ? "#000" : "transparent" }}
        onPress={() => {
          state.menu = !state.menu;
        }}
      > */}
      {/* <Feather name="menu" size={32} /> */}
      {/* <Text>{menu ? "Close Menu" : "Open Menu"}</Text> */}
      {/* </Pressable> */}
      {menu && (
        <>
          <Text className="absolute right-4 top-8 z-50 text-center text-3xl font-bold !text-gray-500">
            {index}
          </Text>
          <Pressable
            className=" top-33 absolute left-4 z-50 flex flex-row items-center justify-center rounded-md bg-[#000000aa] p-2"
            onPress={() => {
              view.shapes = !view.shapes;
            }}
          >
            {/* <Feather name="menu" size={32} /> */}
            <Text className="text-xl font-bold !text-white">
              {shapes ? "Hide shapes" : "Show shapes"}
            </Text>
          </Pressable>
        </>
      )}
    </>
  );
}
