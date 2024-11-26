import React from "react";
import { useState, useRef, ReactElement } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import StoryGallery from "@/components/modals/StoryGallery";
import {
  faMasksTheater,
  faFaceGrinHearts,
  faDragon,
  faGhost,
  faSkull,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

export default function Collections() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<ReactElement | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const openStoryGallery = (icon: ReactElement, title: string) => {
    setSelectedIcon(icon);
    setSelectedTitle(title);
    setShowPopup(true);
  };

  return (
    <View className="flex-1 p-4 justify-center bg-bg-primary">
      <StoryGallery
        awesomeIcon={selectedIcon}
        onClose={() => setShowPopup(false)}
        visible={showPopup}
        title={selectedTitle}
      />
      <ThemedText
        className="text-white text-center mb-16 font-bold"
        type="title"
      >
        Collections
      </ThemedText>
      <View className="grid grid-cols-2 gap-4">
        <ThemedButton
          title="Comedy"
          className="bg-bg-secondary rounded-lg items-center justify-center h-36 my-0"
          textClassName="text-xl font-semibold"
          awesomeIcon={<FontAwesomeIcon icon={faMasksTheater} size={62} />}
          onPress={() =>
            openStoryGallery(
              <FontAwesomeIcon icon={faMasksTheater} size={62} />,
              "Comedy"
            )
          }
        />

        <ThemedButton
          title="Romance"
          className="bg-bg-secondary rounded-lg items-center justify-center h-36 my-0 pt-2"
          textClassName="text-xl font-semibold pt-1"
          awesomeIcon={<FontAwesomeIcon icon={faFaceGrinHearts} size={52} />}
          onPress={() =>
            openStoryGallery(
              <FontAwesomeIcon icon={faFaceGrinHearts} size={62} />,
              "Comedy"
            )
          }
        />

        <ThemedButton
          title="Adventure"
          className="bg-bg-secondary rounded-lg items-center justify-center h-36 my-0"
          textClassName="text-xl font-semibold"
          awesomeIcon={<FontAwesomeIcon icon={faDragon} size={62} />}
          onPress={() =>
            openStoryGallery(
              <FontAwesomeIcon icon={faDragon} size={62} />,
              "Comedy"
            )
          }
        />

        <ThemedButton
          title="Ghost"
          className="bg-bg-secondary rounded-lg items-center justify-center h-36 my-0 pt-1"
          textClassName="text-xl font-semibold pt-1"
          awesomeIcon={<FontAwesomeIcon icon={faGhost} size={56} />}
          onPress={() =>
            openStoryGallery(
              <FontAwesomeIcon icon={faGhost} size={62} />,
              "Comedy"
            )
          }
        />

        <ThemedButton
          title="Horror"
          className="bg-bg-secondary rounded-lg items-center justify-center h-36 my-0 pt-1"
          textClassName="text-xl font-semibold pt-1"
          awesomeIcon={<FontAwesomeIcon icon={faSkull} size={56} />}
          onPress={() =>
            openStoryGallery(
              <FontAwesomeIcon icon={faSkull} size={62} />,
              "Comedy"
            )
          }
        />

        <ThemedButton
          title="Sci-Fi"
          className="bg-bg-secondary rounded-lg items-center justify-center h-36 my-0"
          textClassName="text-xl font-semibold"
          awesomeIcon={<FontAwesomeIcon icon={faRobot} size={62} />}
          onPress={() =>
            openStoryGallery(
              <FontAwesomeIcon icon={faRobot} size={62} />,
              "Comedy"
            )
          }
        />
      </View>
    </View>
  );
}
