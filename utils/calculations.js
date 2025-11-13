export const getBMI = (weight, height) => (weight / (height / 100) ** 2).toFixed(1);

export const getBMR = (gender, weight, height, age) => {
  return gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
};

export const getCaloriesNeeded = (bmr, activityLevel) => {
  const activityFactor = {
    faible: 1.2,
    moyen: 1.55,
    intense: 1.725,
  };
  return Math.round(bmr * (activityFactor[activityLevel] || 1.2));
};
