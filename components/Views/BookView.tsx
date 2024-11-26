import { View, ImageBackground } from "react-native";
import { ThemedText } from "../ThemedText";

type BookViewProps = {
  title: string;
};

export function BookView({ title }: BookViewProps) {
  return (
    <ImageBackground
      source={require("@/assets/images/story.png")}
      style={{ width: 250, height: 400 }}
      className="justify-center items-center"
      resizeMode="contain"
    >
      <View className="p-2 w-48">
        <ThemedText className="text-text-primary-strong text-center italic font-semibold">
          {title}
        </ThemedText>
      </View>
    </ImageBackground>
  );
}
