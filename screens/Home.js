import React, { useState } from "react";
import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";

const MEALS = {
  breakfast: [
    { id: 0, name: "Coffee", calories: 2, protein: 0, image:require("../assets/noimage.png") },
    { id: 1, name: "Vegetable Omelette", calories: 250, protein: 18, image:require("../assets/noimage.png") },
    { id: 2, name: "Oat–Banana Porridge", calories: 300, protein: 12, image:require("../assets/noimage.png") },
    { id: 3, name: "Protein Smoothie", calories: 220, protein: 25, image:require("../assets/noimage.png") },
    { id: 4, name: "Croissant", calories: 250, protein: 4.5, image:require("../assets/noimage.png") },
    { id: 5, name: "Natural yogurt", calories: 53, protein: 8.5, image:require("../assets/noimage.png") },
    { id: 6, name: "Pancakes", calories: 245, protein: 7, image:require("../assets/noimage.png") },
    { id: 7, name: "Bread with butter and jam", calories: 225, protein: 4.5, image:require("../assets/noimage.png")}, 
    { id: 8, name: "Cereal", calories: 190, protein: 8, image:require("../assets/noimage.png") },
    { id: 9, name: "Hot chocolate", calories: 135, protein: 6.5, image:require("../assets/noimage.png") }
  ],
  lunch: [
    { id: 10, name: "Chicken + Rice + Vegetables", calories: 500, protein: 38, image:require("../assets/noimage.png") },
    { id: 11, name: "Tuna–Tomato Pasta", calories: 550, protein: 32, image:require("../assets/noimage.png") },
    { id: 12, name: "1/2 Four-cheese pizza", calories: 475, protein: 18.5, image:require("../assets/noimage.png") },
    { id: 13, name: "Lasagna bolognese", calories: 390, protein: 22, image:require("../assets/noimage.png") },
    { id: 14, name: "Caesar salad", calories: 600, protein: 30, image:require("../assets/noimage.png") },
    { id: 15, name: "Tartiflette", calories: 675, protein: 27.5, image:require("../assets/noimage.png") },
    { id: 16, name: "Sushi", calories: 500, protein: 27.5, image:require("../assets/noimage.png") },
    { id: 17, name: "Salmon and avocado wrap", calories: 365, protein: 21, image:require("../assets/noimage.png") },
    { id: 18, name: "Gnocchi with chicken and creamy parmesan sauce", calories: 500, protein: 35, image:require("../assets/noimage.png") }, 
    { id: 19, name: "Roast duck breast with celery root mash", calories: 575, protein: 36.5, image:require("../assets/noimage.png") }
  ],
  dinner: [
    { id: 20, name: "Salmon + Quinoa", calories: 480, protein: 34, image:require("../assets/noimage.png") },
    { id: 21, name: "Grilled veal with roasted potatoes", calories: 500, protein: 36, image:require("../assets/noimage.png") },
    { id: 22, name: "Tofu Stir-Fry", calories: 420, protein: 20, image:require("../assets/noimage.png") },
    { id: 23, name: "Creamy pumpkin and potato soup", calories: 150, protein: 2.5, image:require("../assets/noimage.png") },
    { id: 24, name: "Quiche Lorraine", calories: 400, protein: 9, image:require("../assets/noimage.png") },
    { id: 25, name: "Complete Salad", calories: 400, protein: 22, image:require("../assets/noimage.png") },
    { id: 26, name: "Tuna cake", calories: 300, protein: 21, image:require("../assets/noimage.png") }, 
    { id: 27, name: "Oven-roasted turkey roast + vegetable", calories: 325, protein: 32, image:require("../assets/noimage.png") },
    { id: 28, name: "Eggplant & Lentil Curry", calories: 400, protein: 20, image:require("../assets/noimage.png") },
    { id: 29, name: "Roast chicken with sweet potato mash", calories: 375, protein: 35, image:require("../assets/noimage.png")},
  ],
  snacks: [
    { id: 30, name: "Greek Yogurt", calories: 150, protein: 10, image:require("../assets/noimage.png") },
    { id: 31, name: "Protein Bar", calories: 180, protein: 20, image:require("../assets/noimage.png") },
    { id: 32, name: "Apples + Almonds", calories: 200, protein: 6, image:require("../assets/noimage.png") },
    { id: 33, name: "Brownie", calories: 400, protein: 5, image:require("../assets/noimage.png") },
    { id: 34, name: "Hummus with vegetable sticks", calories: 165, protein: 4.5, image:require("../assets/noimage.png") },
    { id: 35, name: "Carrot sticks with tzatziki", calories: 90, protein: 3, image:require("../assets/noimage.png") },
    { id: 36, name: "Deviled eggs", calories: 200, protein: 13, image:require("../assets/noimage.png") },
    { id: 37, name: "Protein muffin", calories: 150, protein: 10, image:require("../assets/noimage.png") },
    { id: 38, name: "Sweet Popcorn", calories: 140, protein: 2, image:require("../assets/noimage.png") },
    { id: 39, name: "Olives with feta cheese", calories: 150, protein: 5, image:require("../assets/noimage.png") }
  ],
};

export default function HomeScreen({ user, navigateToProfile}) {
  const [selectedMeals, setSelectedMeals] = useState([]);

  // Calculs
  const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);
  const bmr =
    user.gender === "male"
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
      : 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  const caloriesMax = Math.round(bmr * 1.55);

  // Objectif protéines (1.6 g/kg)
  const proteinGoal = Math.round(user.weight * 1.6);

  // Totaux consommés
  const caloriesConsumed = selectedMeals.reduce((s, m) => s + m.calories, 0);
  const proteinConsumed = selectedMeals.reduce((s, m) => s + m.protein, 0);

  const caloriesLeft = Math.max(0, caloriesMax - caloriesConsumed);



  const toggleMeal = (meal) => {
    if (selectedMeals.find((m) => m.id === meal.id)) {
      setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  // Rendu carrousel
  const renderCarousel = (title, data) => (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = selectedMeals.some((m) => m.id === item.id);
          return (
            <TouchableOpacity
              style={[styles.mealCard, selected && styles.mealCardSelected]}
              onPress={() => toggleMeal(item)}
            >
              <Image source={item.image} style={{ width: 150, height: 120, borderRadius: 10 }}/>
              <Text style={styles.mealName}>{item.name}</Text>
              <Text style={styles.mealCalories}>{item.calories} kcal</Text>
              <Text style={styles.mealProtein}>{item.protein} g protéines</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  // Couleur selon statut
  const statusColor =
    bmi < 18.5 ? "#00BFFF" : bmi < 25 ? "#34C759" : bmi < 30 ? "#FF9500" : "#FF3B30";
// Logique barres calories
  const calRatio = caloriesMax > 0 ? caloriesConsumed / caloriesMax : 0;
  const calRemaining = Math.max(0, 1 - calRatio);
  const calSurplusRatio =
    caloriesConsumed > caloriesMax ? (caloriesConsumed - caloriesMax) / caloriesMax : 0;

  let calColor = "#34C759";
  if (caloriesConsumed >= caloriesMax) calColor = "#FF3B30";
  else if (calRemaining <= 0.2) calColor = "#FF9500";

  // Logique barre protéines
  const protRatio = proteinConsumed / proteinGoal;
  const protRemaining = Math.max(0, 1 - protRatio);
  const protSurplusRatio =
    proteinConsumed > proteinGoal ? (proteinConsumed - proteinGoal) / proteinGoal : 0;

  let protColor = "#34C759";
  if (proteinConsumed >= proteinGoal) protColor = "#FF3B30";
  else if (protRemaining <= 0.2) protColor = "#FF9500";

  // Percentages BMI/BMR
  const bmiPct = Math.min(100, Math.max(0, (bmi / 40) * 100));
  const bmrPct = Math.min(100, Math.max(0, ((bmr - 1000) / 2000) * 100));

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Image source={require("../assets/bluebell.png")} style={{ width: 120, height: 120, borderRadius: 10 }}/>
      <Text style={styles.title}>Hi, {user.firstName} 👋</Text>

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
      <Text style={[styles.scaleNumber, { position: "absolute", left: "0%", transform: [{ translateX: -5 }] }]}>0</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: `${(18.5 / 40) * 100}%`, transform: [{ translateX: -10 }] }]}>18.5</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: `${(25 / 40) * 100}%`, transform: [{ translateX: -10 }] }]}>25</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: `${(30 / 40) * 100}%`, transform: [{ translateX: -10 }] }]}>30</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: "100%", transform: [{ translateX: -20 }] }]}>40</Text>
    </View>
  </View>


  {/* BARRE BMR */}
  <View style={styles.scaleContainer}>
  <Text style={styles.scaleLabel}>BMR level</Text>

  <View style={[styles.scaleBar, { width: 250 }]}>
    <View style={[styles.scaleSegment, { backgroundColor: "#00BFFF", flex: 200 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#34C759", flex: 400 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#FF9500", flex: 400 }]} />
    <View style={[styles.scaleSegment, { backgroundColor: "#FF3B30", flex: 300 }]} />

    {/* CURSEUR */}
    <View
      style={[
        styles.indicator,
        { left: `calc(${((bmr - 1000) / 2000) * 100}% - 1px)` }
      ]}
    />
  </View>

  {/* ÉTIQUETTES en dessous */}
  <View style={{ width: 250, position: "relative", height: 16, marginTop: 4 }}>
      <Text style={[styles.scaleNumber, { position: "absolute", left: 0 }]}>1200</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: ((1400-1200)/1300)*250 - 15 }]}>1400</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: ((1800-1200)/1300)*250 - 15 }]}>1800</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: ((2200-1200)/1300)*250 - 15 }]}>2200</Text>
      <Text style={[styles.scaleNumber, { position: "absolute", left: 250 - 30 }]}>2500</Text>
    </View>
  </View>
        {/* CALORIES BAR */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.infoLabel}>Today calories</Text>

          <View style={styles.calorieRow}>
            <View style={styles.calorieBar}>
              {caloriesConsumed <= caloriesMax && (
                <View
                  style={[
                    styles.calorieFill,
                    { width: `${Math.max(0, calRemaining * 100)}%`, backgroundColor: calColor },
                  ]}
                />
              )}

              {caloriesConsumed > caloriesMax && (
                <View
                  style={[
                    styles.calorieFill,
                    {
                      width: `${Math.min(200, calSurplusRatio * 100)}%`,
                      backgroundColor: "#FF3B30",
                      position: "absolute",
                      right: 0,
                    },
                  ]}
                />
              )}
            </View>

            <Text style={styles.calorieText}>
              {caloriesConsumed} / {caloriesMax} kcal
            </Text>
          </View>
        </View>

        {/* PROTEIN BAR */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.infoLabel}>Today protein</Text>

          <View style={styles.calorieRow}>
            <View style={styles.calorieBar}>
              {proteinConsumed <= proteinGoal && (
                <View
                  style={[
                    styles.calorieFill,
                    { width: `${Math.max(0, protRemaining * 100)}%`, backgroundColor: protColor },
                  ]}
                />
              )}

              {proteinConsumed > proteinGoal && (
                <View
                  style={[
                    styles.calorieFill,
                    {
                      width: `${Math.min(200, protSurplusRatio * 100)}%`,
                      backgroundColor: "#FF3B30",
                      position: "absolute",
                      right: 0,
                    },
                  ]}
                />
              )}
            </View>

            <Text style={styles.calorieText}>
              {proteinConsumed} / {proteinGoal} g
            </Text>
          </View>
        </View>
      </View>


      {/* Bouton profil */}
      <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
        <Text style={styles.profileButtonText}>Change my profile</Text>
      </TouchableOpacity>

      {/* CAROUSELS AFFICHÉS SELON LES PRÉFÉRENCES */}
      {user.mealPreferences?.includes("Breakfast") &&
        renderCarousel("🥣 Breakfast", MEALS.breakfast)}

      {user.mealPreferences?.includes("Lunch") &&
        renderCarousel("🍛 Lunch", MEALS.lunch)}

      {user.mealPreferences?.includes("Dinner") &&
        renderCarousel("🍲 Dinner", MEALS.dinner)}

      {user.mealPreferences?.includes("Snacks") &&
        renderCarousel("🍪 Snacks", MEALS.snacks)}


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
  profileButton: {
    backgroundColor: "#131F71",
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
    position: "relative", 
    height: 16
  },

  scaleNumber: {
    fontSize: 10,
    color: '#444',
    fontWeight: '600',
    textAlign: 'center',
    width: 30, 
  },
  // CAL & PROT BARS
  calorieRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  calorieBar: {
    flex: 1,
    height: 16,
    backgroundColor: "#E5E5EA",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    position: "relative",
  },
  calorieFill: {
    height: "100%",
    borderRadius: 10,
  },
  calorieText: {
    fontSize: 14,
    fontWeight: "600",
    width: 110,
    textAlign: "right",
  },

});


