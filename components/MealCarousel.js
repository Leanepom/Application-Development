import React from "react";
import { View, FlatList, Text } from "react-native";
import MealCard from "./MealCard";

const MealCarousel = ({ meals, maxCalories }) => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard meal={item} maxCalories={maxCalories} />
        )}
      />
    </View>
  );
};

export default MealCarousel;
