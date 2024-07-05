import axios from "axios";

interface WeatherData {
  time: string;
  temperature: number;
}

const WEATHERBIT_API_KEY = import.meta.env.VITE_WEATHERBITO_API_KEY;
const BASE_URL = "https://api.weatherbit.io/v2.0";
export const getCurrentDayWeatherByTime = async (
  city: string
): Promise<WeatherData[]> => {
  const currentDate = new Date();
  const startHour = 0;
  const endHour = 23;
  const intervalHours = 1;

  const weatherDataPromises: Promise<WeatherData>[] = [];

  for (let hour = startHour; hour <= endHour; hour += intervalHours) {
    const requestTime =
      new Date(currentDate.setHours(hour)).toISOString().slice(0, 13) +
      ":00:00";
    const apiUrl = `${BASE_URL}/forecast/hourly?key=${WEATHERBIT_API_KEY}&city=${city}&hours=1&start_time=${requestTime}`;

    const promise = axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.data[0];
        const weather: WeatherData = {
          time: data.timestamp_local,
          temperature: data.temp,
          // Add more properties as needed based on Weatherbit API response
        };
        return weather;
      })
      .catch((error) => {
        console.error(
          `Error fetching weather data for ${requestTime}: ${error}`
        );
        return null;
      });

    weatherDataPromises.push(promise as Promise<WeatherData>);
  }

  const weatherDataList = await Promise.all(weatherDataPromises);

  return weatherDataList.filter((data) => data !== null) as WeatherData[];
};
