export async function isValidCity(cityName: string): Promise<boolean> {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
    import.meta.env.VITE_WEATHERAPP_API_KEY
  }`;

  try {
    const response = await fetch(url);

    if (response.status === 200) {
      return true; // City is valid
    } else if (response.status === 404) {
      return false; // City not found
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching data from OpenWeather API: ${error}`);
    throw error; // Rethrow the error after logging it
  }
}
