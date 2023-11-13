// import { StatusBar } from "expo-status-bar";
import { app, state } from "@/constants/state";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { useSnapshot } from "valtio/react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConnectionManager() {
  const [status, setStatus] = useState("Not connected");
  const { control } = useSnapshot(app);
  // const storeData = async (value: any) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem("control", jsonValue);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   storeData(control);
  // }, [control]);

  useEffect(() => {
    console.log("connecting");

    state.ws?.send("heyyyyyy");

    // state.ws?.addEventListener("open", (event) => {
    //   console.log(event);
    // });

    // state.ws?.addEventListener("message", (event) => {
    //   console.log(event);
    //   setStatus(event.data);
    // });

    // state.ws?.addEventListener("close", (event) => {
    //   console.log(event);
    // });

    // state.ws?.addEventListener("error", (event) => {
    //   console.log(event);
    // });

    // return () => {
    //   state.ws?.close();
    // };
  }, []);
  return (
    <View className="h-fit w-3/5 overflow-scroll p-5 bg-zinc-200/50 dark:bg-zinc-800/50">
      <Text className=" text-black dark:text-white">
        Available clients:{"\n"}
      </Text>
      <Text className=" font-bold text-black dark:text-white">
        {status}
        {"\n"}
      </Text>
      <Text className=" font-mono text-black dark:text-white">
        {state.ws?.url}
      </Text>
      <View className="flex flex-row items-center justify-center gap-4">
        <Text className=" text-black dark:text-white">
          {control ? "iPad" : "TV"} mode
        </Text>
        <Switch
          onValueChange={(bool) => {
            app.control = bool;
          }}
          value={control}
        />
      </View>
    </View>
  );
}
