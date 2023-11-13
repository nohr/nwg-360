import { state, view } from "@/constants/state";
import { G, Path, Text } from "react-native-svg";
import { useSnapshot } from "valtio/react";

export default function Shapes({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { frames } = useSnapshot(state);
  const { shapes } = useSnapshot(view);
  return (
    <>
      {shapes &&
        frames[frames.length - view.index - 1]?.map((unit) => {
          if (!unit.visible) return null;
          return (
            <G key={unit.uuid}>
              <Path
                d={unit.d}
                fill="rgb(82,233,0)"
                stroke="rgb(29,29,29)"
                opacity={0.5}
                onPress={() => {
                  alert(unit.number.text.toLocaleUpperCase());
                }}
              />
              <Text
                x={unit.number.x}
                y={unit.number.y}
                fill="white"
                fontSize={24}
              >
                {unit.number.text.toLocaleUpperCase()}
              </Text>
            </G>
          );
        })}
    </>
  );
}
