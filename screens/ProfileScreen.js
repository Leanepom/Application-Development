import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function ProfileScreen({ user, updateUser, goBack, onLogout }) {
  const [form, setForm] = useState({ ...user });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSave = () => {
    updateUser(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      <TextInput style={styles.input} value={form.firstName} onChangeText={(v) => handleChange("firstName", v)} placeholder="Prénom" />
      <TextInput style={styles.input} value={form.lastName} onChangeText={(v) => handleChange("lastName", v)} placeholder="Nom" />
      <TextInput
        style={styles.input}
        value={form.age.toString()}
        onChangeText={(v) => handleChange("age", v)}
        placeholder="Âge"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={form.height.toString()}
        onChangeText={(v) => handleChange("height", v)}
        placeholder="Taille (cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={form.weight.toString()}
        onChangeText={(v) => handleChange("weight", v)}
        placeholder="Poids (kg)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={goBack}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={onLogout}>
        <Text style={styles.buttonText}>Déconnexion</Text>
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
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondary: { backgroundColor: "#8E8E93" },
  logout: { backgroundColor: "#FF3B30" },
});
