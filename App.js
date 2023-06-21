import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import flowerPotIcon from "./assets/plant.png";
import { useEffect, useState } from "react";

import { theme } from "./color";
import Guide from "./components/Guide";
import SensorData from "./components/SensorData";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [tab, setTab] = useState("상태");
  const [guideData, setGuideData] = useState(null);

  // const guideData = {
  //   temperature_n: 8,
  //   temperature_higher: "높음",
  //   humidity_n: 10,
  //   humidity_higher: "낮음",
  // };
  const sensorData = {
    labels: ["11시 ", "13시", "15시", "now"],
    datasets: [
      {
        data: [20, 15, 28, 30],
        color: (opacity = 1) => `rgba(249, 161, 74, ${opacity})`,
        strokeWidth: 3, // optional
      },
      {
        data: [25, 26, 24, 23],
        color: (opacity = 1) => `rgba(250, 105, 136, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ["습도", "온도"],
  };
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch(
          "http://ec2-13-124-158-120.ap-northeast-2.compute.amazonaws.com:3000/environment",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        console.log(data); // Do something with the response data
        setGuideData(data);
      } catch (error) {
        console.error(error);
      }
    };
    // const intervalId = setInterval(fetchState, 1 * 60 * 1000); // Execute fetchData every 10 minutes

    // return () => clearInterval(intervalId); // Clear the interval on component unmount
    fetchState();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>식물</Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center",
            margin: 50,
          }}
        >
          <Image style={styles.icon} source={flowerPotIcon} />
        </View>
        <View style={styles.rowTab}>
          <TouchableOpacity
            style={styles.tabBox}
            onPress={() => {
              setTab("상태");
            }}
          >
            <Text
              style={{
                ...styles.tabText,
                color: tab === "상태" ? theme.leaves : theme.grey,
              }}
            >
              실시간 식물 환경 상태
            </Text>
          </TouchableOpacity>
          <Text style={styles.tabText}>|</Text>
          <TouchableOpacity
            style={styles.tabBox}
            onPress={() => {
              setTab("가이드");
            }}
          >
            <Text
              style={{
                ...styles.tabText,
                color: tab === "가이드" ? theme.leaves : theme.grey,
              }}
            >
              실시간 환경 가이드
            </Text>
          </TouchableOpacity>
        </View>

        {tab === "상태" ? (
          <SensorData data={sensorData} />
        ) : (
          <Guide data={guideData} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 30,
    justifyContent: "center",
    fontWeight: "500",
  },
  icon: {
    width: Math.min(width * 0.5, height * 0.5),
    height: Math.min(width * 0.5, height * 0.5),
  },
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
  rowTab: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  tabBox: {
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 17,
    fontWeight: "500",
  },
});
