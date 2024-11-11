import { Image, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { login } from "@/api/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();

  // Handle login submission
  const handleLogin = () => {
    // localStorage.setItem("loginState", "true");
    login({
      email: email,
      password: password,
    }).then((token) => {
      if (token) {
        console.log("Login successful");
        router.push("/");
      } else {
        console.log("Login failed");
      }
    });
  };

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
        title="Email"
        type="email"
        value={email}
        onChangeText={setEmail}
      />

      <ThemedInput
        title="Password"
        type="password"
        value={password}
        onChangeText={setPassword}
      />

      <View className="flex-col justify-center items-center">
        <a href="/password">
          <ThemedText className="text-sm my-4 text-secondary">
            Forgotten your password?
          </ThemedText>
        </a>

        <ThemedButton
          title="LOG IN"
          onPress={handleLogin}
          className="bg-primary text-text-primary-strong w-40 h-10 rounded-full flex items-center justify-center"
          textClassName="font-bold text-lg"
        />
        <ThemedText className="text-sm my-4 text-secondary">
          No account?
          <Link
            className="ml-2 text-sm text-primary font-semibold"
            href="/signup"
          >
            Create One
          </Link>
        </ThemedText>
      </View>
    </ThemedView>
  );
}
