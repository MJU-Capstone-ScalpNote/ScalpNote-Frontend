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
import StartTest from "../components/StartTest";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.testContainer}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.image}
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
  image: {
    width: 500,
    height: 500,
    marginBottom: 30,
  },
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
