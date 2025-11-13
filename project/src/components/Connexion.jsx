import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Connexion({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Connexion avec : ${email}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onSignup}>
          <Text style={styles.secondaryText}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: { 
    fontSize: 28, 
    color: "#3e6b47", 
    fontWeight: "700", 
    marginBottom: 30 },

  label: { 
    fontSize: 13, 
    color: "#7a7a7a", 
    marginTop: 18, 
    marginBottom: 6 },

  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },

  button: { 
    marginTop: 28, 
    backgroundColor: "#3e6b47", 
    borderRadius: 8, 
    paddingVertical: 14, 
    alignItems: "center" },

  buttonText: { 
    color: "white", 
    fontWeight: "700", 
    fontSize: 16 },

  secondaryButton: { 
    marginTop: 16, 
    alignItems: "center" },

  secondaryText: { 
    color: "#3e6b47", fontWeight: "600" },
});
