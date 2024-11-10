import { TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface ThemedInputProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "password" | "email";
  placeholder?: string;
  error?: boolean;
}

export function ThemedInput({
  title,
  value,
  onChangeText,
  type = "text",
  placeholder,
  error,
}: ThemedInputProps) {
  return (
    <View className="mb-4">
      <ThemedText className="text-secondary mb-2">{title}</ThemedText>
      <TextInput
        className={`w-full h-9 px-4 rounded-lg bg-white ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder={placeholder || title}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === "password"}
        keyboardType={type === "email" ? "email-address" : "default"}
        autoCapitalize="none"
      />
      {error && (
        <ThemedText className="text-red-500 text-sm">
          Password does not match
        </ThemedText>
      )}
    </View>
  );
}
