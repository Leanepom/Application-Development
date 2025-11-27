import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RECIPES } from "./Recipe";

export default function RecipeScreen({ meal, goBack }) {
  if (!meal) return null;

  const recipeText = RECIPES[meal.name] || "(Recette non disponible)";

  return (
    <ScrollView style={styles.container}>
      <Image source={meal.image} style={styles.image} />
      <Text style={styles.title}>{meal.name}</Text>
      <Text style={styles.section}>Calories : {meal.calories}</Text>
      <Text style={styles.section}>Proteins : {meal.protein} g</Text>

      <Text style={styles.subtitle}>Recipe</Text>
      <Text style={styles.text}>{recipeText}</Text>

      {/* Bouton retour */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back to the menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 10 },
  section: { fontSize: 16, marginBottom: 6 },
  subtitle: { fontSize: 20, fontWeight: "700", marginTop: 20, marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 22 },
  backButton: {
    marginTop: 30,
    backgroundColor: "#131F71",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
