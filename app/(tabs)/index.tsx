import { Image, StyleSheet, Platform, View } from "react-native";
import { useState, useEffect } from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import CreateForm from "@/components/modals/CreateForm";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenNib, faBook } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { getAuthToken } from "@/api/auth";

export default function HomeScreen() {
  const [showPopup, setShowPopup] = useState(false);
  const [apiCount, setApiCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchApiCount = async () => {
      try {
        const token = await getAuthToken();
        const response = await axios.get(
          API_URL + "/api/talemaker/apicallcount",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApiCount(response.data.apiCallCount);
      } catch (error) {
        console.error("Failed to get API call count:", error);
      }
    };

    fetchApiCount();
  }, []);

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
      {apiCount !== null && (
        <ThemedText className="text-center mt-4 text-white">
          API Calls: {apiCount}
        </ThemedText>
      )}

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
    </ParallaxScrollView>
  );
}
