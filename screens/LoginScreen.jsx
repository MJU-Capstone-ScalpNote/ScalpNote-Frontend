import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

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

  //   const handleSignUp = () => {
  //     navigation.navigate("SignUp");
  //   };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://13.209.76.135:8080/auth/sign-in",
        { email, password }
      );
      console.log("로그인 성공");
      console.log(response.data);
      alert("로그인 되었습니다.");

      navigation.navigate("home");
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://13.209.76.135:8080/auth/sign-up",
        {
          name,
          email,
          password,
        }
      );
      // 성공적으로 요청이 완료되면 실행될 로직 (예: 화면 전환, 알림 표시 등)
      console.log(response.data); // 응답 데이터 로깅
      alert("회원가입이 완료되었습니다.");
      // 상태 초기화
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // 에러 처리 로직
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="계정이 없으신가요?" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;
