import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

async function loginUser(inputEmail, inputPassword) {
  // Récupération du compte enregistré
  const savedUserJSON = await AsyncStorage.getItem(inputEmail);

  if (!savedUserJSON) {
    throw new Error("Aucun utilisateur enregistré.");
  }

  const savedUser = JSON.parse(savedUserJSON);

  // Vérification email & mot de passe
  if (savedUser.email === inputEmail && savedUser.password === inputPassword) {
    return savedUser;  // On retourne toutes les infos du compte
  } else {
    throw new Error("Email ou mot de passe incorrect.");
  }
}

export default function LoginScreen({ onLogin, navigateToRegister, setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    // Mock login simulation
    setTimeout(async () => {
      setLoading(false);
      try {
        const user = await loginUser(email, password);
        if (!user.mealPreferences || user.mealPreferences.length === 0) {
          user.mealPreferences = ["Breakfast", "Lunch", "Dinner", "Snacks"];
          // Sauvegarde la mise à jour dans AsyncStorage
          await AsyncStorage.setItem(user.email, JSON.stringify(user));
      }
        onLogin(user);    // tu appelles ton callback pour ouvrir l'app
      } catch (err) {
        alert(err.message);
      }
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
      <Image source={require("../assets/bluebell.png")} style={{ width: 150, height: 150,alignSelf:"center" }}/>
        <Text style={styles.bigtitle}>Blueberry</Text>
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
    color: "#131F71",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },

  bigtitle: { 
    fontSize: 46, 
    color: "#131F71",
    fontWeight: "700",
    marginBottom: 24, 
    textAlign: "center" 
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
});
