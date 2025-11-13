import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";

const MealCard = ({ meal, maxCalories }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
    if (meal.calories > maxCalories) {
      Alert.alert("Trop de calories 😅", "Ce repas dépasse ta limite quotidienne !");
    }
  };

  return (
    <TouchableOpacity onPress={handleSelect} style={styles.card}>
      <Image source={{ uri: meal.image }} style={styles.image} />
      <Text style={styles.name}>{meal.name}</Text>
      <Text style={styles.info}>{meal.calories} kcal | {meal.proteins} g prot</Text>
      <Text style={[styles.button, selected && styles.selected]}>
        {selected ? "✅ Sélectionné" : "Choisir"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    width: 180,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 5,
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 8,
    color: "#007AFF",
  },
  selected: {
    color: "green",
  },
});

export default MealCard;
