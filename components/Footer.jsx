import {
  Image,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyPageNotLogined from "./MyPageNotLogined";

const windowWidth = Dimensions.get("window").width;

const Footer = () => {
  const navigation = useNavigation();

  const GoHome = () => {
    navigation.navigate("Home");
  };
  const GoLogin = () => {
    navigation.navigate("MyPageNotLogined");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GoHome}>
        <Image
          source={require("../assets/images/homeIcon.png")}
          style={styles.homeIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/diagnosisIcon.png")}
          style={styles.diagnosisIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/communityIcon.png")}
          style={styles.communityIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={GoLogin}>
        <Image
          source={require("../assets/images/mypageIcon.png")}
          style={styles.mypageIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: windowWidth,
    height: 80,
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 25,
    paddingBottom: 10,
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  footer: {
    backgroundColor: "black",
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  diagnosisIcon: {
    width: 32,
    height: 32,
  },
  communityIcon: {
    width: 35,
    height: 35,
  },
  mypageIcon: {
    width: 45,
    height: 45,
  },
});
