import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
}

export function ThemedButton({
  title,
  onPress,
  className = "",
  textClassName = "",
}: ThemedButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={"my-3 " + className}>
      <Text className={"text-center " + textClassName}>{title}</Text>
    </TouchableOpacity>
  );
}
