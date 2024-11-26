import { View, Image } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { logout } from "@/api/auth";
import { useRouter } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import {
  faArrowRightFromBracket,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Profile() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  const [disable, setDisable] = useState(true);
  const router = useRouter();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleEdit = () => {
    setDisable(false);
  };

  const handlePasswordBlur = () => {
    setDisable(true);
  };

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="w-full h-full flex-col justify-center items-center p-4">
        <View className="mb-6">
          <Image
            source={require("@/assets/images/avatar.jpg")}
            style={{ width: 120, height: 120 }}
            className="rounded-full"
          />
        </View>
        <ThemedInput
          placeholder="Email"
          title="Email"
          value={email}
          disabled={true}
          onChangeText={handleEmailChange}
        />
        <ThemedInput
          placeholder="Password"
          type="password"
          title="Password"
          value={password}
          disabled={disable}
          onChangeText={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
        <View className="flex-row justify-around items-center w-72 mt-12">
          <ThemedButton
            className="w-24 bg-bg-secondary h-8 rounded flex-row items-center justify-center gap-2 text-white"
            textClassName="text-white font-semibold leading-8"
            title="Edit"
            awesomeIcon={
              <FontAwesomeIcon size={14} icon={faUserPen} color="white" />
            }
            onPress={handleEdit}
          />

          <ThemedButton
            className="w-24 bg-red-500 h-8 rounded flex-row items-center justify-center gap-2 text-white"
            textClassName="text-white font-semibold leading-8"
            title="Sign Out"
            awesomeIcon={
              <FontAwesomeIcon
                size={14}
                icon={faArrowRightFromBracket}
                color="white"
              />
            }
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
}
