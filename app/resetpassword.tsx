import { Image, View, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { login } from "@/api/auth";
import { resetPassword } from "@/api/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Handle login submission
  const handleResetPassword = async () => {
    const response = await resetPassword({ token: "", newPassword: password });
    if (response) {
      // router.push("/login");
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      // error state on input
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }, [password, confirmPassword]);

  return (
    <ThemedView
      className="flex-1 justify-center mx-16"
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Image
        source={require("@/assets/images/logo-banner.png")}
        alt="logo"
        style={{
          width: "105%",
          marginBottom: -120,
          marginTop: -250,
        }}
        resizeMethod="scale"
        resizeMode="contain"
      />

      <ThemedInput
        title="Password"
        type="password"
        value={password}
        onChangeText={setPassword}
      />

      <ThemedInput
        title="Confirm Password"
        type="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={confirmPasswordError}
      />

      <View className="flex-col justify-center items-center pt-5">
        <ThemedButton
          title="RESET"
          onPress={handleResetPassword}
          className="bg-primary text-text-primary-strong w-40 h-10 rounded-full flex items-center justify-center"
          textClassName="font-bold text-lg"
        />
      </View>
    </ThemedView>
  );
}
