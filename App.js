import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import TestHomeScreen from "./screens/TestHomeScreen";
import CameraScreen from "./screens/CameraScreen";
import CommunityScreen from "./screens/CommunityScreen";
import CommunityHeader from "./components/CommunityHeader";
import Footer from "./components/Footer";
import MyPageNotLogined from "./components/MyPageNotLogined";

const Stack = createStackNavigator();

export default function App() {
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
            name="CameraScreen"
            component={CameraScreen}
            options={{ title: "카메라" }}
          />
          <Stack.Screen
            name="CommunityScreen"
            component={CommunityScreen}
            options={{ title: "커뮤니티" }}
          />
          <Stack.Screen name="CommunityHeader" component={CommunityHeader} />
          <Stack.Screen
            name="MyPageNotLogined"
            component={MyPageNotLogined}
            options={{ title: "마이페이지" }}
          />
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
