import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";

// Exemple de données de repas
const MEALS = {
  breakfast: [
    { id: 1, name: "Vegetable Omelette", calories: 250 },
    { id: 2, name: "Oat–Banana Porridge", calories: 300 },
    { id: 3, name: "Protein Smoothie", calories: 220 },
  ],
  lunch: [
    { id: 4, name: "Chicken + Rice + Vegetables", calories: 500 },
    { id: 5, name: "Complete Salad", calories: 400 },
    { id: 6, name: "Tuna–Tomato Pasta", calories: 550 },
  ],
  dinner: [
    { id: 7, name: "Salmon + Quinoa", calories: 480 },
    { id: 8, name: "Soup + Whole-Grain Bread", calories: 300 },
    { id: 9, name: "Tofu Stir-Fry", calories: 420 },
  ],
  snacks: [
    { id: 10, name: "Greek Yogurt", calories: 150 },
    { id: 11, name: "Protein Bar", calories: 180 },
    { id: 12, name: "Apples + Almonds", calories: 200 },
  ],
};

export default function HomeScreen({ user, navigateToProfile, onLogout }) {
  const [selectedMeals, setSelectedMeals] = useState([]);

  // Calculs
  const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);
  const bmr =
    user.gender === "male"
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
      : 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  const caloriesMax = Math.round(bmr * 1.55);

  // Calories consommées
  const caloriesConsumed = selectedMeals.reduce((sum, m) => sum + m.calories, 0);
  const caloriesLeft = Math.max(0, caloriesMax - caloriesConsumed);

  const toggleMeal = (meal) => {
    if (selectedMeals.find((m) => m.id === meal.id)) {
      setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
    } else if (caloriesConsumed + meal.calories <= caloriesMax) {
      setSelectedMeals([...selectedMeals, meal]);
    } else {
      alert("Tu dépasses ton quota calorique 😅");
    }
  };

  // Rendu d'un carrousel horizontal
  const renderCarousel = (title, data) => (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const selected = selectedMeals.some((m) => m.id === item.id);
          return (
            <TouchableOpacity
              style={[styles.mealCard, selected && styles.mealCardSelected]}
              onPress={() => toggleMeal(item)}
            >
              <Text style={styles.mealName}>{item.name}</Text>
              <Text style={styles.mealCalories}>{item.calories} kcal</Text>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  // Couleur selon statut
  const statusColor =
    bmi < 18.5 ? "#00BFFF" : bmi < 25 ? "#34C759" : bmi < 30 ? "#FF9500" : "#FF3B30";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bonjour, {user.firstName} 👋</Text>

      {/* Section infos santé */}
      <View style={[styles.infoCard, { borderColor: statusColor }]}>
        <Text style={styles.infoLabel}>BMI : <Text style={{ color: statusColor }}>{bmi}</Text></Text>
        <Text style={styles.infoLabel}>BMR : <Text style={{ color: "#007AFF" }}>{bmr.toFixed(0)} kcal</Text></Text>

  {/* BARRE BMI */}
  <View style={styles.scaleContainer}>
  <Text style={styles.scaleLabel}>BMI Status</Text>

  {/* Barre colorée */}
  <View style={styles.scaleBar}>
    <View style={[styles.scaleSegment, { backgroundColor: "#00BFFF", flex: 18.5 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#34C759", flex: 6.5 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#FF9500", flex: 5 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#FF3B30", flex: 10 }]} />

    {/* CURSEUR */}
    <View
      style={[
        styles.indicator,
        { left: `calc(${(bmi / 40) * 100}% - 1px)` }
      ]}
    />
    </View>

    {/* ÉTIQUETTES en dessous */}
    <View style={styles.scaleLabelsRow}>
      <Text style={styles.scaleNumber}>0</Text>
      <Text style={styles.scaleNumber}>18.5</Text>
      <Text style={styles.scaleNumber}>25</Text>
      <Text style={styles.scaleNumber}>30</Text>
      <Text style={styles.scaleNumber}>40</Text>
    </View>
  </View>


  {/* BARRE BMR */}
  <View style={styles.scaleContainer}>
  <Text style={styles.scaleLabel}>BMR level</Text>

  <View style={styles.scaleBar}>
    <View style={[styles.scaleSegment, { backgroundColor: "#00BFFF", flex: 1 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#34C759", flex: 2 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#FF9500", flex: 1 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#FF3B30", flex: 1 }]} />

    {/* CURSEUR */}
    <View
      style={[
        styles.indicator,
        { left: `calc(${((bmr - 1000) / 2000) * 100}% - 1px)` }
      ]}
    />
  </View>

  {/* ÉTIQUETTES en dessous */}
  <View style={styles.scaleLabelsRow}>
    <Text style={styles.scaleNumber}>1000</Text>
    <Text style={styles.scaleNumber}>1500</Text>
    <Text style={styles.scaleNumber}>2000</Text>
    <Text style={styles.scaleNumber}>2500</Text>
    <Text style={styles.scaleNumber}>3000</Text>
  </View>
</View>



        <Text style={styles.infoLabel}>Calories totales : <Text style={{ color: "#FF9500" }}>{caloriesMax}</Text></Text>
        <Text style={styles.infoLabel}>Consommées : <Text style={{ color: "#FF3B30" }}>{caloriesConsumed}</Text></Text>
        <Text style={styles.infoLabel}>Restantes : <Text style={{ color: "#34C759" }}>{caloriesLeft}</Text></Text>

        {/* Barre de progression */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(caloriesConsumed / caloriesMax) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Bouton profil */}
      <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
        <Text style={styles.profileButtonText}>Modifier mon profil</Text>
      </TouchableOpacity>

      {/* Carrousels */}
      {renderCarousel("🥣 Breakfast", MEALS.breakfast)}
      {renderCarousel("🍛 Lunch", MEALS.lunch)}
      {renderCarousel("🍲 Dinner", MEALS.dinner)}
      {renderCarousel("🍪 Snacks", MEALS.snacks)}

      {/* Déconnexion */}
      <TouchableOpacity style={[styles.logoutButton]} onPress={onLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: { padding: 20, backgroundColor: "#F8F9FA" },

  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    marginBottom: 20,
  },

  infoLabel: { fontSize: 16, marginBottom: 6 },

  progressBar: {
    height: 12,
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
    marginTop: 8,
  },

  progressFill: {
    height: 12,
    backgroundColor: "#34C759",
    borderRadius: 8,
  },

  profileButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },

  profileButtonText: { color: "#fff", fontWeight: "600" },

  carouselContainer: { marginBottom: 20 },

  carouselTitle: { fontSize: 20, fontWeight: "600", marginBottom: 10 },

  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  mealCardSelected: { borderColor: "#34C759", borderWidth: 2 },

  mealName: { fontSize: 16, fontWeight: "600", marginBottom: 6 },

  mealCalories: { fontSize: 14, color: "#555" },

  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },

  logoutText: { color: "#fff", fontWeight: "600" },

  scaleContainer: {
  marginTop: 15,
  marginBottom: 10,
  },

  scaleLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
  },

  scaleBar: {
    flexDirection: "row",
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
  },

  scaleSegment: {
    height: "100%",
  },

  indicator: {
    position: "absolute",
    top: -2,
    width: 2,
    height: 16,
    backgroundColor: "black",
  },


  scaleLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 4,
    paddingHorizontal: 2,
  },

  scaleNumber: {
    fontSize: 10,
    color: '#444',
    fontWeight: '600',
    textAlign: 'center',
    width: 30, 
  },



});
