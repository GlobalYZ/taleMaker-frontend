import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  customBgColor?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  customBgColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  if (customBgColor) {
    return <View style={[style]} {...otherProps} />;
  } else {
    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  }
}
