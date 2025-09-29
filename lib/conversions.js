// Conversion categories and units

export const units = {
  distance: {
    meter: 1,
    kilometer: 1000,
    mile: 1609.34,
    foot: 0.3048,
    inch: 0.0254,
  },
  area: {
    "square meter": 1,
    "square kilometer": 1e6,
    acre: 4046.86,
    hectare: 10000,
    "square mile": 2.59e6,
  },
  speed: {
    "m/s": 1,
    "km/h": 0.277778,
    "mph": 0.44704,
    "ft/s": 0.3048,
  },
  acceleration: {
    "m/s²": 1,
    "km/h²": 7.716e-5,
    "ft/s²": 0.3048,
    "g": 9.80665,
  },
  temperature: {
    // special handling below
    celsius: "c",
    fahrenheit: "f",
    kelvin: "k",
  },
};

// Generic conversion for non-temperature
export function convertValue(category, fromUnit, toUnit, value) {
  if (category === "temperature") {
    return convertTemperature(fromUnit, toUnit, value);
  }
  const base = value * units[category][fromUnit];
  const result = base / units[category][toUnit];
  return result;
}

// Temperature conversion
function convertTemperature(from, to, value) {
  let celsius;
  if (from === "celsius") celsius = value;
  else if (from === "fahrenheit") celsius = (value - 32) * (5 / 9);
  else if (from === "kelvin") celsius = value - 273.15;

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return celsius * (9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
}
