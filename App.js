// App.js
import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";

/**
 * Si tu n'as pas encore ces fichiers, crée-les comme écrans basiques
 * (les exemples précédents fournis dans la conversation fonctionnent).
 */
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  // 'login' | 'register' | 'home' | 'profile'
  const [screen, setScreen] = useState("login");
  // user peut être un object { uid, email, firstName, ... } ou null
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = (target) => {
    setScreen(target);
  };

  const onLogin = (userObj) => {
    // appelé par LoginScreen / RegisterScreen après authentification
    setUser(userObj);
    setScreen("home");
  };

  const onLogout = () => {
    // tu peux aussi vider Firebase auth ici si tu l'ajoutes plus tard
    setUser(null);
    setScreen("login");
  };

  // Affiche un loader si besoin
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render selon l'écran courant
  switch (screen) {
    case "login":
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <LoginScreen
            onLogin={onLogin}
            navigateToRegister={() => navigate("register")}
            setLoading={setLoading}
          />
        </View>
      );

    case "register":
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <RegisterScreen
            onRegister={onLogin} // après inscription, on considère l'utilisateur connecté
            navigateToLogin={() => navigate("login")}
            setLoading={setLoading}
          />
        </View>
      );

    case "home":
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <HomeScreen
            user={user}
            navigateToProfile={() => navigate("profile")}
            onLogout={onLogout}
            // si besoin, expose une fonction pour mettre à jour user depuis ProfileScreen
            updateUser={(newUser) => setUser((u) => ({ ...u, ...newUser }))}
          />
        </View>
      );

    case "profile":
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <ProfileScreen
            user={user}
            goBack={() => navigate("home")}
            updateUser={(newUser) => {
              setUser((u) => ({ ...u, ...newUser }));
              navigate("home");
            }}
            onLogout={onLogout}
          />
        </View>
      );

    default:
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
