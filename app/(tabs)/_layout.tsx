import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform } from "react-native";
import { state } from "@/constants/state";
import "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useSnapshot } from "valtio";
import { useColorScheme } from "nativewind";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  className?: string;
}) {
  return <FontAwesome size={25} {...props} />;
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { menu } = useSnapshot(state);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].text,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].background,
        },
        headerTransparent: true,
        headerTitleStyle: {
          color: Colors[colorScheme ?? "light"].text,
        },
        // headerRight: () => (
        //       <Link href="/modal" asChild>
        //         <Pressable>
        //           {({ pressed }) => (
        //             <Feather
        //               name="cast"
        //               size={25}
        //               color={Colors[colorScheme ?? "light"].text}
        //               style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        //             />
        //           )}
        //         </Pressable>
        //       </Link>
        // ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Availability",
          headerShown: false,
          tabBarStyle: {
            display: menu ? "flex" : "none",
            position: menu ? "absolute" : "relative",
            backgroundColor: menu
              ? Colors[colorScheme ?? "light"].backgroundAlpha
              : "transparent",
            borderTopColor: menu
              ? Colors[colorScheme ?? "light"].backgroundAlpha
              : "transparent",
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="building" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
