import { View, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface CreateFormProps {
  onClose: () => void;
  visible: boolean;
}

export default function CreateForm({ onClose, visible }: CreateFormProps) {
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [conflict, setConflict] = useState("");
  const [genre, setGenre] = useState("");

  const handleCreate = () => {
    console.log({ title, plot, character });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      className="w-3/4"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-bg-secondary p-6 rounded-2xl w-11/12 relative pt-12">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-4 top-4 z-10 border-2 border-[#666] rounded-full"
          >
            <FontAwesomeIcon icon={faXmark} size={24} color="#666" />
          </TouchableOpacity>
          <ThemedInput
            title="Story Title"
            value={title}
            onChangeText={setTitle}
            textClassName="text-text-primary-strong"
            placeholder="Enter your story title"
          />
          <ThemedInput
            title="Plot"
            value={plot}
            onChangeText={setPlot}
            textClassName="text-text-primary-strong"
            placeholder="Describe your story plot"
          />
          <ThemedInput
            title="Character"
            value={character}
            onChangeText={setCharacter}
            textClassName="text-text-primary-strong"
            placeholder="Describe your main character"
          />
          <ThemedInput
            title="Setting"
            value={setting}
            onChangeText={setSetting}
            textClassName="text-text-primary-strong"
            placeholder="Describe your story setting"
          />
          <ThemedInput
            title="Conflict"
            value={conflict}
            onChangeText={setConflict}
            textClassName="text-text-primary-strong"
            placeholder="Describe your story conflict"
          />

          <ThemedInput
            title="Genre"
            value={genre}
            onChangeText={setGenre}
            textClassName="text-text-primary-strong"
            placeholder="Describe your story type"
          />

          <View className="flex-row justify-center">
            <ThemedButton
              title="CREATE"
              onPress={handleCreate}
              className="bg-primary py-3 w-36 rounded-full shadow-md"
              textClassName="text-text-primary-strong font-bold"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
