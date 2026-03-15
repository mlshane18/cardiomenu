export function getSwapSuggestions(orderItems, allItems) {
  const itemMap = new Map();
  allItems.forEach(item => itemMap.set(item.id, item));

  return orderItems
    .filter(item => item.swapSuggestion && item.nutrition.sodium > 400)
    .map(item => {
      const swap = itemMap.get(item.swapSuggestion);
      if (!swap) return null;
      const savedSodium = item.nutrition.sodium - swap.nutrition.sodium;
      const savedCalories = item.nutrition.calories - swap.nutrition.calories;
      return {
        original: item,
        suggestion: swap,
        savedSodium,
        savedCalories,
      };
    })
    .filter(s => s && s.savedSodium > 0)
    .sort((a, b) => b.savedSodium - a.savedSodium);
}

export function getAllItems(menuData) {
  return menuData.categories.flatMap(cat => cat.items);
}
