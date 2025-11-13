import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatCard = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "45%",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default StatCard;
