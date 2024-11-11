import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { removeItem } from "@/scripts/store";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  // how to setup Route gate keeper

  const isMounted = useRef(false); // To track if the component has mounted
  localStorage.setItem("loginState", "false");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <ThemedButton
          title="LOG OUT"
          className="bg-primary text-text-primary-strong w-40 h-10 rounded-full flex items-center justify-center"
          textClassName="font-bold"
          onPress={() => {
            removeItem("auth_token");
            removeItem("auth_token_expire");
            router.replace("/login");
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
