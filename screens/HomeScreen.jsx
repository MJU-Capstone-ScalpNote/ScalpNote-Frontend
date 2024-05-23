import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import Footer from "../components/Footer";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };
  const handleStartTest = () => {
    navigation.navigate("TestHomeScreen");
  };
  const handleCommunity = () => {
    navigation.navigate("CommunityScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.testContainer}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.testButton} onPress={handleStartTest}>
          <Text style={styles.testButtonText}>두피 진단 시작</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testButton} onPress={handleCommunity}>
          <Text style={styles.testButtonText}>커뮤니티</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="로그인" onPress={handleLogin} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="회원가입" onPress={handleSignUp} />
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  testButton: {
    backgroundColor: "#007AFF",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    margin: 10,
  },
  testButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});

export default HomeScreen;
