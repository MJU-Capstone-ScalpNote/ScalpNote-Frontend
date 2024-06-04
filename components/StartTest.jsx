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
    backgroundColor: "rgb(107, 156, 255)",
    padding: 15,
    paddingBottom: 20,
    borderRadius: 12,
    margin: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
