import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../../global.css";
import { getCookie, deleteCookie } from "../../scripts/store";
import { useEffect } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = await getCookie("auth_token");
        const isAuthGroup = segments[0] === "(tabs)";
        if (isAuthGroup) {
          if (!authToken) {
            await deleteCookie("auth_token");
            router.replace("/login");
          } else {
            if (authToken) {
              router.replace("/");
            } else {
              await deleteCookie("auth_token");
              await deleteCookie("user_email");
              router.replace("/login");
            }
          }
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/login");
      }
    };

    // run checkAuth
    setTimeout(() => {
      checkAuth();
    }, 0);
  }, [router, segments]);

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
