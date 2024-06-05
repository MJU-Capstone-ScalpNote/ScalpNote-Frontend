import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
  }, [isNameValid, isEmailValid, isPasswordValid]);

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://43.201.108.238:8080/auth/sign-up",
        {
          name,
          email,
          password,
        }
      );
      // 성공적으로 요청이 완료되면 실행될 로직
      console.log(response.data); // 응답 데이터 로깅
      alert("회원가입이 완료되었습니다.");

      // 상태 초기화
      setName("");
      setEmail("");
      setPassword("");

      navigation.navigate("Login");
    } catch (error) {
      // 에러 처리 로직
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const validateName = (name) => {
    const isValid = name.trim().length > 0;
    setIsNameValid(isValid);
    setName(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    setEmail(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = passwordRegex.test(password);
    setIsPasswordValid(isValid);
    setPassword(password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={name}
        placeholder="이름"
        onChangeText={validateName}
        autoCapitalize="none"
      />
      {!isNameValid && name.length > 0 && (
        <Text style={styles.errorText}>이름을 입력해주세요.</Text>
      )}
      <TextInput
        style={styles.inputBox}
        value={email}
        placeholder="이메일"
        onChangeText={validateEmail}
        autoCapitalize="none"
      />
      {!isEmailValid && email.length > 0 && (
        <Text style={styles.errorText}>유효한 이메일을 입력해주세요.</Text>
      )}
      <TextInput
        style={styles.inputBox}
        value={password}
        placeholder="비밀번호"
        onChangeText={validatePassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      {!isPasswordValid && password.length > 0 && (
        <Text style={styles.errorText}>
          비밀번호는 최소 8자리이며, 영문과 숫자를 포함해야 합니다.
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isFormValid ? "rgb(83, 122, 247)" : "#aaa" },
        ]}
        onPress={handleSignUp}
        disabled={!isFormValid}
      >
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
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginVertical: 5,
  },
});

export default SignupScreen;
