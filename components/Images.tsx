import { state } from "@/constants/state";
import { G, Image } from "react-native-svg";
import { useSnapshot } from "valtio/react";
import { images } from "@/constants/Images";

export default function Images({ getIndex }: { getIndex: () => number }) {
  const { assets, data } = useSnapshot(state);

  if (!data) return null;
  return (
    <G>
      {assets.map((item, index) => (
        <Image
          key={index}
          preserveAspectRatio="xMidYMid slice"
          width={data.dimensions.width}
          height={data.dimensions.height}
          href={
            process.env.NODE_ENV === "development" ? item.uri : images[index]
          }
          pointerEvents="none"
          stroke={"red"}
          strokeWidth={4}
          // @ts-ignore
          display={index === getIndex() ? "flex" : "none"}
        />
      ))}
    </G>
  );
}
