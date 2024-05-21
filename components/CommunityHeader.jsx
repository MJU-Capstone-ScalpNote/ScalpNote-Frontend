import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CommunityHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>커뮤니티</Text>

      <TouchableOpacity>
        <Image
          source={require("../assets/images/search.png")}
          style={styles.searchImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    height: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchImage: {
    width: 30,
    height: 30,
  },
});
