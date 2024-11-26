import { View, Modal, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { BookView } from "../Views/BookView";

interface ModalProps {
  onClose: () => void;
  visible: boolean;
  awesomeIcon: ReactElement | null;
  title: string;
}

export default function StoryGallery({
  onClose,
  visible,
  awesomeIcon,
  title,
}: ModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-bg-secondary p-6 rounded-2xl w-11/12 relative pt-12">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-4 top-4 z-10 border-2 border-[#666] rounded-full"
          >
            <FontAwesomeIcon icon={faXmark} size={24} color="#666" />
          </TouchableOpacity>
          {awesomeIcon && (
            <View className="absolute left-16 top-8 z-10">{awesomeIcon}</View>
          )}
          <ThemedText
            type="title"
            className="text-text-primary-strong text-center ml-12 font-extrabold"
          >
            {title}
          </ThemedText>
          <View className="w-full flex justify-center items-center">
            <BookView title="Story 1 Story 1 Story 1 Story 1" />
          </View>
          <ThemedText className="text-text-secondary text-center truncate">
            preview: preview preview preview preview preview preview preview
            preview preview preview preview preview preview preview preview
            preview preview preview preview preview preview preview preview
          </ThemedText>
        </View>
      </View>
    </Modal>
  );
}
