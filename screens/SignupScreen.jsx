import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        value={name}
        placeholder="이름"
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={email}
        placeholder="이메일"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        placeholder="비밀번호"
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flexstart",
    alignItems: "center",
    marginTop: 30,
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
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SignupScreen;
