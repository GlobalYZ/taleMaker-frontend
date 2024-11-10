import { Image } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import { useEffect, useRef } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function LoadingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const rootNavigationState = useRootNavigationState();

  const isMounted = useRef(false); // To track if the component has mounted

  useEffect(() => {
    // This ensures we wait until the component is mounted
    isMounted.current = true;

    // Only navigate after the component has mounted
    if (isMounted.current) {
      router.replace("/login");
    }

    // Cleanup the isMounted flag when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [router]);

  return (
    <ThemedView
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Image
        source={require("@/assets/images/logo-banner2.png")}
        className="w-64 h-64"
        resizeMode="contain"
      />
    </ThemedView>
  );
}
