import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useRouter, useSegments } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
// Import your global CSS file
import "../../global.css";
import { setItem, getItem, removeItem } from "../../scripts/store";

import { useEffect } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  const router = useRouter();
  useEffect(() => {
    setTimeout(async () => {
      const authToken = await getItem("auth_token");
      const authTokenExpire = await getItem("auth_token_expire");
      const isAuthGroup = segments[0] === "(tabs)";
      if (isAuthGroup) {
        if (
          !authToken ||
          !authTokenExpire ||
          new Date(authTokenExpire) < new Date()
        ) {
          removeItem("auth_token");
          removeItem("auth_token_expire");
          router.replace("/login");
        } else {
          router.replace("/");
        }
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].navBackground,
          height: 70,
          paddingTop: 7,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-primary" : "text-secondary"
              } text-xs mb-3`}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              className={focused ? "text-primary font-bold" : "text-secondary"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
