import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { removeItem } from "@/scripts/store";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { logout } from "@/api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenNib, faBook } from "@fortawesome/free-solid-svg-icons";

export default function HomeScreen() {
  const router = useRouter();
  // how to setup Route gate keeper

  const isMounted = useRef(false); // To track if the component has mounted
  localStorage.setItem("loginState", "false");

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logo-banner.png")}
          className="w-full h-full"
        />
      }
    >
      <ThemedView
        customBgColor
        className="flex flex-col items-center justify-center bg-bg-secondary rounded-2xl text-text-primary-strong gap-5 py-12 mt-12 mb-10"
      >
        <FontAwesomeIcon icon={faPenNib} size={52} />
        <ThemedText>GENERATE A NEW STORY</ThemedText>
      </ThemedView>

      <ThemedView
        customBgColor
        className="bg-bg-secondary flex-row justify-center items-center gap-5 rounded-2xl py-7 mb-20"
      >
        <FontAwesomeIcon icon={faBook} size={36} />
        <ThemedText>LASTEST STORY</ThemedText>
      </ThemedView>
      <ThemedButton
        title="LOG OUT"
        className="bg-primary text-text-primary-strong w-32 h-10 rounded-full flex items-center justify-center absolute right-0 bottom-0"
        textClassName="font-bold"
        onPress={handleLogout}
      />
      {/* // </ThemedView> */}
    </ParallaxScrollView>
  );
}
