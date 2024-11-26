import { View, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { API_URL } from "@/constants/api";
import axios from "axios";
import { getAuthToken } from "@/api/auth";

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
  const [open, setOpen] = useState(false);
  const [genre, setGenre] = useState<number>(0);
  const [genres] = useState([
    { label: "Comedy", value: 0 },
    { label: "Drama", value: 1 },
    { label: "Adventure", value: 2 },
    { label: "Horror", value: 3 },
    { label: "Sci-fi", value: 4 },
    { label: "Romance", value: 5 },
  ]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    try {
      const token = await getAuthToken();

      const requestBody = {
        name: title,
        plot: plot,
        characters: character,
        setting: setting,
        conflict: conflict,
        genre: genre,
      };

      const response = await axios.post(
        `${API_URL}api/talemaker/generate`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseData(response.data);
      console.log("Success:", response.data);
      // onClose();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

          <View className="mb-4">
            <ThemedText className="text-text-primary-strong mb-2">
              Genre
            </ThemedText>
            <DropDownPicker
              open={open}
              value={genre}
              items={genres}
              setOpen={setOpen}
              setValue={setGenre}
              style={{
                backgroundColor: "transparent",
                borderColor: "#666",
                zIndex: 9999999,
              }}
              textStyle={{
                color: "#fff",
              }}
              dropDownContainerStyle={{
                backgroundColor: "#1a1a1a",
                borderColor: "#666",
                zIndex: 9999999,
              }}
              zIndex={2000}
              zIndexInverse={1000}
              theme="DARK"
            />
          </View>

          <View className="flex-row justify-center">
            <ThemedButton
              title="CREATE"
              onPress={handleCreate}
              className="bg-primary py-3 w-36 rounded-full shadow-md z-10"
              textClassName="text-text-primary-strong font-bold"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
