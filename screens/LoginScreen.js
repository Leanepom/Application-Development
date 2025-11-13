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

export default function LoginScreen({ onLogin, navigateToRegister, setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setLoading(true);
    // Mock login simulation
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
        activityLevel: "medium",
      });
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.secondaryButton} onPress={navigateToRegister}>
          <Text style={styles.secondaryText}>Don’t have an account? Sign up</Text>
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
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    color: "#3e6b47",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
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

  button: {
    marginTop: 28,
    backgroundColor: "#3e6b47",
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
    color: "#3e6b47",
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
