import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { theme } from "../color";
import { useState } from "react";
const { width, height } = Dimensions.get("window");

export default function Guide({ data }) {
  return (
    <View>
      <View style={styles.box}>
        <View style={styles.item}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "white",
            }}
          >
            가이드
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
          <Text>
            추천기온보다 현재온도가 {data.temperature_n}도{" "}
            {data.temperature_higher}
          </Text>
          <Text>
            추천습도보다 현재습도가 {data.humidity_n}% {data.humidity_higher}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: theme.leaf,
    borderRadius: 18,
    backgroundColor: theme.bg,
    marginHorizontal: 15,
    marginVertical: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  item: {
    backgroundColor: theme.leaves,
    borderRadius: 10,
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
