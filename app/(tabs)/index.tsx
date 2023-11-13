import { Dimensions } from "react-native";
import { View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { state } from "@/constants/state";
import { useSnapshot } from "valtio";
import Viewer from "@/components/Viewer";
import Menu from "@/components/Menu";

export default function HomeScreen() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions(Dimensions.get("window"));

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  });

  const { assets } = useSnapshot(state);

  return (
    <View className="flex-1 items-center justify-center bg-[#000000]">
      <Menu />
      {assets.length > 0 && (
        <Viewer width={dimensions.width} height={dimensions.height} />
      )}
    </View>
  );
}
