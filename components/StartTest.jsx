import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const StartTest = () => {
  const navigation = useNavigation();

  const handleStartTest = () => {
    navigation.navigate("TestHomeScreen");
  };
  return (
    <View>
      <TouchableOpacity style={styles.testButton} onPress={handleStartTest}>
        <Text style={styles.testButtonText}>두피 진단 시작</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  testButton: {
    backgroundColor: "#007AFF",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    margin: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  testButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
