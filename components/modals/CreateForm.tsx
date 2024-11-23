import { View, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
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
        <View className="bg-bg-primary p-6 rounded-2xl w-11/12 relative">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-4 top-4 z-10"
          >
            <FontAwesomeIcon icon={faXmark} size={24} color="#666" />
          </TouchableOpacity>

          <ThemedInput
            title="Story Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter your story title"
          />

          <ThemedInput
            title="Plot"
            value={plot}
            onChangeText={setPlot}
            placeholder="Describe your story plot"
          />

          <ThemedInput
            title="Character"
            value={character}
            onChangeText={setCharacter}
            placeholder="Describe your main character"
          />

          <ThemedButton
            title="CREATE"
            onPress={handleCreate}
            className="bg-primary rounded-lg py-3"
            textClassName="text-white font-bold"
          />
        </View>
      </View>
    </Modal>
  );
}
