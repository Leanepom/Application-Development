import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ onLogin, navigateToRegister, setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setLoading(true);
    // Ici, on simule une connexion (mock)
    setTimeout(() => {
      setLoading(false);
      onLogin({
        firstName: "Alex",
        lastName: "Martin",
        email,
        age: 25,
        height: 175,
        weight: 70,
        gender: "male",
        activityLevel: "moyen",
      });
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.link}>Pas encore de compte ? Inscris-toi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24, textAlign: "center" },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#007AFF", textAlign: "center", marginTop: 16 },
});
