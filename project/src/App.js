import React from "react";
import { View, StyleSheet } from "react-native";
import Inscription from "./components/Inscription.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      <Inscription />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
