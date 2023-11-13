import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { app, state } from "@/constants/state";
import { images } from "@/constants/Images";
import { useAssets } from "expo-asset";
import data from "../assets/daymark.json";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("control");
//     if (value !== null) {
//       return JSON.parse(value);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

NativeWindStyleSheet.setOutput({
  default: "native",
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [assets, error] = useAssets(images);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (assets) {
      state.assets = assets;
      // wait for 500 ms to hide splash screen
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [assets]);

  useEffect(() => {
    if (data) {
      state.data = data;
      state.frames = data.frames;
    }
  }, [data]);

  // useEffect(() => {
  //   getData().then((control) => {
  //     console.log(control);

  //     if (control) {
  //       app.control = control;
  //     }
  //   });
  // }, []);

  if (!state.assets && !state.frames) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    state.theme = colorScheme;
  }, [colorScheme]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, autoHideHomeIndicator: true }}
      />
      {/* <Stack.Screen
        name="modal"
        options={{
          presentation: "formSheet",
          title: "",
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === "dark" ? "white" : "black",
          },
        }}
      /> */}
    </Stack>
  );
}
