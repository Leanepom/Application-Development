import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegisterScreen({ onRegister, navigateToLogin, setLoading }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    activityLevel: "medium",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async () => {
  setLoading(true);

  setTimeout(async () => {
    try {
      // enregistre les infos dans ton fichier texte
      await AsyncStorage.setItem("user", JSON.stringify(form));

      onRegister(form);     // callback de ton app
      setLoading(false);

    } catch (e) {
      alert("Erreur enregistrement fichier :", e);
      setLoading(false);
    }
  }, 1200);
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/bluebell.png")} style={{ width: 120, height: 120, borderRadius: 10 }}/>
        <Text style={styles.title}>Create Blueberry Account !</Text>
        <View style={styles.form}>
          

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(v) => handleChange("firstName", v)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(v) => handleChange("lastName", v)}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderGroup}>
            {["male", "female", "other"].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  form.gender === g && styles.genderButtonSelected,
                ]}
                onPress={() => handleChange("gender", g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    form.gender === g && styles.genderTextSelected,
                  ]}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={form.age}
            onChangeText={(v) => handleChange("age", v)}
          />

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Height"
            keyboardType="numeric"
            value={form.height}
            onChangeText={(v) => handleChange("height", v)}
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Weight"
            keyboardType="numeric"
            value={form.weight}
            onChangeText={(v) => handleChange("weight", v)}
          />
          <Text style={styles.label}>Activity Level</Text>
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

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(v) => handleChange("password", v)}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={navigateToLogin}>
            <Text style={styles.secondaryText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    marginTop : 10,
    color: "#131F71",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 30,
    fontWeight: "700",
  },

  form: {
    width: "100%",
    maxWidth: 360,
  },

  label: {
    fontSize: 13,
    color: "#7a7a7a",
    marginTop: 18,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
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

  button: {
    marginTop: 28,
    backgroundColor: "#131F71",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textTransform: "uppercase",
  },

  secondaryButton: {
    marginTop: 16,
    alignItems: "center",
  },

  secondaryText: {
    color: "#131F71",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  activityGroup: {
  marginTop: 10,
  marginBottom: 20,
},

activityButton: {
  backgroundColor: "#f0f0f0",
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 14,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#e5e5e5",
},

activityButtonSelected: {
  backgroundColor: "#131F71",
  borderColor: "#131F71",
},

activityLabel: {
  fontSize: 13,
  fontWeight: "700",
  color: "#333",
  textTransform: "uppercase",
  letterSpacing: 0.5,
},

activityLabelSelected: {
  color: "#fff",
},

activityDescription: {
  fontSize: 12.5,
  color: "#666",
  marginTop: 4,
  lineHeight: 16,
},

activityDescriptionSelected: {
  color: "#e8e8e8",

},
});
