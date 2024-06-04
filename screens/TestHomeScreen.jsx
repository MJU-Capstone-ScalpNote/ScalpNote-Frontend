import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";

const TestHomeScreen = () => {
  const navigation = useNavigation();

  const handleCamera = () => {
    navigation.navigate("CameraTestScreen");
  };
  const handleGallery = () => {
    navigation.navigate("Gallery");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.instructions}>
          두피가 자세히 보이도록 사진을 찍어주세요!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleCamera}>
          <Text style={styles.buttonText}>두피 사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGallery}>
          <Text style={styles.buttonText}>두피 사진 업로드</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  instructions: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "rgb(107, 156, 255)",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TestHomeScreen;
