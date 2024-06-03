import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import TestHomeScreen from "./screens/TestHomeScreen";
import CameraScreen from "./screens/CameraScreen";
import CommunityScreen from "./screens/CommunityScreen";
import CommunityHeader from "./components/CommunityHeader";
import Footer from "./components/Footer";
import MyPage from "./screens/MyPage";
import TestResultScreen from "./screens/TestResultScreen";
import CameraTestScreen from "./screens/CameraTestScreen";
import GalleryScreen from "./screens/GalleryScreen";
import WritePostScreen from "./screens/WritePostScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "홈" }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "로그인" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
            options={{ title: "회원가입" }}
          />
          <Stack.Screen
            name="TestHomeScreen"
            component={TestHomeScreen}
            options={{ title: "두피진단" }}
          />

          <Stack.Screen
            name="CameraTestScreen"
            component={CameraTestScreen}
            options={{ title: "카메라" }}
          />
          <Stack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={{ title: "갤러리" }}
          />
          <Stack.Screen
            name="Community"
            component={CommunityScreen}
            options={{ title: "커뮤니티" }}
          />
          <Stack.Screen
            name="WritePost"
            component={WritePostScreen}
            options={{ title: "글쓰기" }}
          />
          <Stack.Screen
            name="TestResult"
            component={TestResultScreen}
            options={{ title: "진단내역" }}
          />
          <Stack.Screen name="CommunityHeader" component={CommunityHeader} />
          <Stack.Screen name="MyPage" component={MyPage} />

          {/* {userToken ? (
            <Stack.Screen name="MyPage" component={MyPage} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )} */}
          <Stack.Screen name="Footer" component={Footer} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
