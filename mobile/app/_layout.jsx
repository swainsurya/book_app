import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";

export default function RootLayout() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" backgroundColor={COLORS.background}/>
    </SafeAreaView>
  )
}
