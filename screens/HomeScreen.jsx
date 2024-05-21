import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
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
