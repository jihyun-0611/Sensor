import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import { theme } from "../color";
import { useState } from "react";
const { width, height } = Dimensions.get("window");

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 11,
  useShadowColorFromDataset: true,
};

export default function SensorData({ data }) {
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
            실시간 그래프
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <LineChart
            data={data}
            width={width - 100}
            height={height / 3}
            chartConfig={chartConfig}
            bezier
          />
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
