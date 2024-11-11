import { Image, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { requestPasswordReset } from "@/api/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await requestPasswordReset({ email: email });
    if (response) {
      router.push("/login");
    }
  };

  return (
    <ThemedView
      className="flex-1 justify-center mx-16"
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <a href="/login">
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
      </a>

      <ThemedText className="text-center text-sm text-white pb-10">
        Enter your email address below to reset your password
      </ThemedText>

      <ThemedInput
        title="Email"
        type="email"
        value={email}
        onChangeText={setEmail}
      />

      <View className="flex-col justify-center items-center">
        <ThemedButton
          title="SUBMIT"
          onPress={handleSubmit}
          className="bg-primary text-text-primary-strong w-40 h-10 rounded-full flex items-center justify-center"
          textClassName="font-bold text-lg"
        />
      </View>
    </ThemedView>
  );
}
