import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import Footer from "../components/Footer";
import StartTest from "../components/StartTest";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.testContainer}>
        <Text style={styles.textContainer}>
          남몰래 고민했던 두피 문제! {"\n"}
          병원갈 시간도, 비용도 걱정 된다면{"\n"}
          <Text style={styles.highlightText}>똑똑한 ScalpyNote</Text>로{"\n"}
          빠르고 간단하게 진단해 보세요!
        </Text>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <StartTest />
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
  textContainer: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  highlightText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "rgb(83, 122, 247)",
    textShadowColor: "rgba(16, 7, 255, 0.35)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
  image: {
    width: "80%",
    height: "50%",
    marginBottom: 20,
  },
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
