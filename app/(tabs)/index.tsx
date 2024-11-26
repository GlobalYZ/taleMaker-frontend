import { Image, StyleSheet, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import CreateForm from "@/components/modals/CreateForm";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import { logout } from "@/api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenNib, faBook } from "@fortawesome/free-solid-svg-icons";

export default function HomeScreen() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  // how to setup Route gate keeper

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleLastestStory = () => {
    console.log("Lastest story");
  };

  const handleCreateStory = () => {
    setShowPopup(true);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logo-banner2.png")}
          className="w-full h-full"
        />
      }
    >
      <CreateForm onClose={() => setShowPopup(false)} visible={showPopup} />

      <ThemedButton
        title="GENERATE A NEW STORY"
        awesomeIcon={<FontAwesomeIcon icon={faPenNib} size={48} />}
        onPress={handleCreateStory}
        textClassName="font-bold"
        className="flex flex-col items-center justify-center bg-bg-secondary rounded-2xl text-text-primary-strong gap-5 py-12 mt-12 mb-10"
      />

      <ThemedButton
        title="LASTEST STORY"
        textClassName="font-bold text-lg"
        className="bg-bg-secondary flex-row justify-center items-center gap-5 rounded-2xl py-7 mb-20"
        onPress={handleLastestStory}
        awesomeIcon={<FontAwesomeIcon icon={faBook} size={32} />}
      />
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
