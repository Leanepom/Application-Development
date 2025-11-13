import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function RegisterScreen({ onRegister, navigateToLogin, setLoading }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "male",
    activityLevel: "moyen",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister(form);
    }, 1200);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput style={styles.input} placeholder="Prénom" onChangeText={(v) => handleChange("firstName", v)} />
      <TextInput style={styles.input} placeholder="Nom" onChangeText={(v) => handleChange("lastName", v)} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={(v) => handleChange("email", v)} />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(v) => handleChange("password", v)}
      />
      <TextInput style={styles.input} placeholder="Âge" keyboardType="numeric" onChangeText={(v) => handleChange("age", v)} />
      <TextInput style={styles.input} placeholder="Taille (cm)" keyboardType="numeric" onChangeText={(v) => handleChange("height", v)} />
      <TextInput style={styles.input} placeholder="Poids (kg)" keyboardType="numeric" onChangeText={(v) => handleChange("weight", v)} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Créer mon compte</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.link}>Déjà un compte ? Connecte-toi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#007AFF", textAlign: "center", marginTop: 20 },
});
