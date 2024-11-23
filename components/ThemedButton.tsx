import { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
  awesomeIcon?: ReactElement;
}

export function ThemedButton({
  title,
  onPress,
  className = "",
  textClassName = "",
  awesomeIcon,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={"my-3 " + className}>
      {awesomeIcon && awesomeIcon}
      <Text className={"text-center " + textClassName}>{title}</Text>
    </TouchableOpacity>
  );
}
