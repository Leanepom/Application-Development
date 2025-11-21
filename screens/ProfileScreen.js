import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function ProfileScreen({ user, updateUser, goBack, onLogout }) {
  const [form, setForm] = useState({ ...user, mealPreferences: user.mealPreferences || [], });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  
  const handleTogglePreference = (category) => {
    const updated = form.mealPreferences.includes(category)
      ? form.mealPreferences.filter((c) => c !== category)
      : [...form.mealPreferences, category];

    setForm({ ...form, mealPreferences: updated });
  };

  const handleSave = () => {
    updateUser(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <TextInput style={styles.input} value={form.firstName} onChangeText={(v) => handleChange("firstName", v)} placeholder="First Name" />
      <TextInput style={styles.input} value={form.lastName} onChangeText={(v) => handleChange("lastName", v)} placeholder="Last Name" />
      <TextInput
        style={styles.input}
        value={form.age.toString()}
        onChangeText={(v) => handleChange("age", v)}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={form.height.toString()}
        onChangeText={(v) => handleChange("height", v)}
        placeholder="Height (cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={form.weight.toString()}
        onChangeText={(v) => handleChange("weight", v)}
        placeholder="Weight (kg)"
        keyboardType="numeric"
      />
      <View style={styles.genderGroup}>
            {["male", "female", "other"].map((v) => (
              <TouchableOpacity
                key={v}
                style={[
                  styles.genderButton,
                  form.gender === v && styles.genderButtonSelected,
                ]}
                onPress={() => handleChange("gender", v)}
              >
                <Text
                  style={[
                    styles.genderText,
                    form.gender === v && styles.genderTextSelected,
                  ]}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <Text style={styles.sectionTitle}>Activity Level</Text>
      <View style={styles.activityGroup}>
        {[
          { value: "sedentary", label: "Sedentary", description: "Little to no exercise" },
          { value: "light", label: "Light", description: "Light exercise 1-3 days/week" },
          { value: "medium", label: "Medium", description: "Moderate exercise 3-5 days/week" },
          { value: "active", label: "Active", description: "Hard exercise 6-7 days/week" },
          { value: "veryActive", label: "Very Active", description: "Physical job + daily exercise" }
        ].map((activity) => (
          <TouchableOpacity
            key={activity.value}
            style={[
              styles.activityButton,
              form.activityLevel === activity.value && styles.activityButtonSelected,
            ]}
            onPress={() => handleChange("activityLevel", activity.value)}
          >
            <Text style={[
              styles.activityLabel,
              form.activityLevel === activity.value && styles.activityLabelSelected
            ]}>
              {activity.label}
            </Text>
            <Text style={[
              styles.activityDescription,
              form.activityLevel === activity.value && styles.activityDescriptionSelected
            ]}>
              {activity.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Chose your meal plans</Text>

      <View style={styles.checkboxContainer}>
        {["Breakfast", "Lunch", "Dinner", "Snacks"].map((category) => {
          const isSelected = form.mealPreferences.includes(category);
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected,
              ]}
              onPress={() => handleTogglePreference(category)}
            >
              <Text
                style={[
                  styles.checkboxText,
                  isSelected && styles.checkboxTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Keep modifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={goBack}>
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={onLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#131F71",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondary: { backgroundColor: "#8E8E93" },
  logout: { backgroundColor: "#FF3B30" },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },

  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  checkbox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },

  checkboxSelected: {
    backgroundColor: "#131F71",
  },

  checkboxText: {
    fontSize: 16,
    color: "#333",
  },

  checkboxTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },

  genderGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  genderButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: "center",
  },

  genderButtonSelected: { backgroundColor: "#131F71" },

  genderText: { color: "#555" },

  genderTextSelected: { color: "#fff", fontWeight: "600" },
  activityGroup: {
  marginBottom: 20,
},

activityButton: {
  backgroundColor: "#f8f8f8",
  padding: 12,
  borderRadius: 8,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: "#e0e0e0",
},

activityButtonSelected: {
  backgroundColor: "#131F71",
  borderColor: "#131F71",
},

activityLabel: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
},

activityLabelSelected: {
  color: "#fff",
},

activityDescription: {
  fontSize: 12,
  color: "#666",
  marginTop: 2,
},

activityDescriptionSelected: {
  color: "#e0e0e0",
},
});
