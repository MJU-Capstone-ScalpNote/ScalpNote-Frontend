import React, { useState } from "react";
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

      <TouchableOpacity style={styles.button}>
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
