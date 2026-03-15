export const DEFAULT_DAILY_SODIUM = 1500;
export const DEFAULT_DAILY_CALORIES = 2000;
export const DEFAULT_DAILY_SAT_FAT = 13; // grams (AHA recommendation)

export function getSodiumLevel(sodiumMg, dailyTarget = DEFAULT_DAILY_SODIUM) {
  const perMealTarget = dailyTarget / 3;
  if (sodiumMg <= perMealTarget * 0.8) return 'green';
  if (sodiumMg <= perMealTarget * 1.2) return 'yellow';
  return 'red';
}

export function getSodiumColor(level) {
  switch (level) {
    case 'green': return '#53c5ab';
    case 'yellow': return '#e9a345';
    case 'red': return '#e94560';
    default: return '#D4C5A0';
  }
}

export function getSodiumPercent(sodiumMg, dailyTarget = DEFAULT_DAILY_SODIUM) {
  return Math.min((sodiumMg / dailyTarget) * 100, 100);
}

export function getSatFatFromFat(totalFat) {
  // Approximate: sat fat is roughly 35-40% of total fat for fast food
  return Math.round(totalFat * 0.38);
}

export function totalNutrition(orderItems) {
  return orderItems.reduce(
    (totals, item) => ({
      calories: totals.calories + item.nutrition.calories * (item.quantity || 1),
      sodium: totals.sodium + item.nutrition.sodium * (item.quantity || 1),
      fat: totals.fat + item.nutrition.fat * (item.quantity || 1),
      satFat: totals.satFat + getSatFatFromFat(item.nutrition.fat) * (item.quantity || 1),
      carbs: totals.carbs + item.nutrition.carbs * (item.quantity || 1),
      protein: totals.protein + item.nutrition.protein * (item.quantity || 1),
      sugar: totals.sugar + item.nutrition.sugar * (item.quantity || 1),
    }),
    { calories: 0, sodium: 0, fat: 0, satFat: 0, carbs: 0, protein: 0, sugar: 0 }
  );
}

export function formatMg(mg) {
  if (mg >= 1000) return `${(mg / 1000).toFixed(1)}g`;
  return `${Math.round(mg)}mg`;
}

export function getPipMood(totals, sodiumTarget = DEFAULT_DAILY_SODIUM) {
  const perMealNa = sodiumTarget / 3;
  const naRatio = totals.sodium / perMealNa;
  if (naRatio <= 0.7) return 'thrilled';
  if (naRatio <= 1.0) return 'happy';
  if (naRatio <= 1.4) return 'thinking';
  return 'worried';
}

export function getLetterGrade(value, target) {
  const ratio = value / target;
  if (ratio <= 0.5) return 'A+';
  if (ratio <= 0.7) return 'A';
  if (ratio <= 0.9) return 'B+';
  if (ratio <= 1.0) return 'B';
  if (ratio <= 1.2) return 'C';
  if (ratio <= 1.5) return 'D';
  return 'F';
}

export function getGradeColor(grade) {
  if (grade.startsWith('A')) return '#2d8a74';
  if (grade.startsWith('B')) return '#53c5ab';
  if (grade === 'C') return '#e9a345';
  return '#e94560';
}

export function getPipMessage(mood, totals, sodiumTarget) {
  const perMeal = Math.round(sodiumTarget / 3);
  switch (mood) {
    case 'thrilled':
      return `Wow, amazing choices! Only ${totals.sodium}mg sodium — your heart is doing a happy dance right now!`;
    case 'happy':
      return `Nice work! ${totals.sodium}mg sodium is right around the ${perMeal}mg per-meal target. Solid choices!`;
    case 'thinking':
      return `Hmm, ${totals.sodium}mg sodium is getting a bit high. Want me to suggest some swaps?`;
    case 'worried':
      return `Uh oh! ${totals.sodium}mg sodium is way over your ${perMeal}mg per-meal target. Let's look at some swaps...`;
    default:
      return 'Pick some items and I\'ll let you know how you\'re doing!';
  }
}
