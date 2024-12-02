import { StatusBar, Text, View } from "react-native";
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pregular">test</Text>
      <StatusBar />
      <Link href="/signin" style={{ color: 'blue'}}>Profile</Link>
    </View>
  );
}

export default Index;
