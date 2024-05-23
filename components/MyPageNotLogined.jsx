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
import Footer from "./Footer";
import LoginScreen from "../screens/LoginScreen";

const MyPageNotLogined = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.loginNotice}>
          ScalpyNote를 이용하시려면
          {"\n"}로그인이 필요합니다!
        </Text>
      </View>

      <LoginScreen />
      <Footer />
    </View>
  );
};

export default MyPageNotLogined;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  loginNotice: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 30,
  },
});
