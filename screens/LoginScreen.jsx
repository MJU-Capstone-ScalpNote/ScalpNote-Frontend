import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Footer from "../components/Footer";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = async () => {
    try {
      if (email.trim() === "") {
        alert("이메일을 입력해주세요.");
        return;
      } else if (password.trim() === "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      console.log("email: ", email);
      console.log("pw: ", password);

      const response = await axios.post(
        "http://43.201.108.238:8080/auth/sign-in",
        { email, password }
      );

      if (response.data !== "" && response.data !== null) {
        console.log("로그인 성공");
        console.log(response.data);
        alert("로그인 되었습니다.");

        const { accessToken } = response.data.data;
        if (accessToken !== null && accessToken !== undefined) {
          // AsyncStorage에 저장
          await AsyncStorage.setItem("userToken", accessToken);
          navigation.navigate("Home");
        } else {
          // 오류 처리
          console.error("Invalid token: ", accessToken);
        }

        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      alert("이메일과 비밀번호를 다시 입력해주세요.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>서비스를 이용하시려면 로그인이 필요합니다!</Text>
      </View>
      <TextInput
        style={styles.inputBox}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={handleSignUp}>계정이 없으신가요?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputBox: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
