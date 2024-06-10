import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Footer from "../components/Footer";

const CameraGuideScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>두피 촬영 가이드</Text>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            보다 더 정확한 진단을 위해 {"\n"}아래 가이드를 잘 읽어주세요 !
          </Text>
        </View>
        <View style={styles.guideContainer}>
          <Text style={styles.guideText}>
            1. 밝은 곳에서 촬영하세요.{"\n\n"}
            2. 두피가 머리카락에 가리지 않도록 정리해주세요.{"\n\n"}
            3. 두피의 상태를 명확하게 진단할 수 있도록 초점을 맞춰주세요.
            {"\n\n"}
            4. 촬영 후 사진이 선명한지 확인하세요.
          </Text>
          <Text style={styles.guideSubtitle}>잘못 찍은 사진 예시</Text>
          <View style={styles.imageRow}>
            <Image
              source={require("../assets/images/badExample1.png")}
              style={styles.guideImage}
            />
            <Image
              source={require("../assets/images/badExample2.jpeg")}
              style={styles.guideImage}
            />
          </View>
          <Text style={styles.guideSubtitle}>잘 찍은 사진 예시</Text>
          <View style={styles.imageRow}>
            <Image
              source={require("../assets/images/goodExample1.png")}
              style={styles.guideImage}
            />
            <Image
              source={require("../assets/images/goodExample2.png")}
              style={styles.guideImage}
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#343a40",
  },
  introContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introText: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    color: "#495057",
    fontWeight: "bold",
  },
  guideContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideText: {
    fontSize: 16,
    lineHeight: 20,
    color: "#495057",
    marginBottom: 10,
  },
  guideSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 30,
    color: "#495057",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  guideImage: {
    width: "48%",
    height: 150,
    borderRadius: 10,
  },
});

export default CameraGuideScreen;
