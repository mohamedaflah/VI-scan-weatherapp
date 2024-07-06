/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";

interface ForecastWeatherResponse {
  data: {
    data: Array<{
      datetime: string;
      temp: number;
      weather: {
        description: string;
      };
    }>;
  };
}

export const get7DayForecast = async (city: string): Promise<any> => {
  try {
    const endpoint = `https://api.weatherbit.io/v2.0/forecast/daily?key=${
      import.meta.env.VITE_WEATHERBITO_API_KEY
    }&city=${city}&days=7`;

    const response = await axios.get<ForecastWeatherResponse>(endpoint);

    console.log("7-day forecast data:", response.data.data);
    // Handle the data as needed
    return response.data.data;
  } catch (error: any) {
    console.log(
      "Error fetching 7-day forecast data: ------------>",
      error
    );
    toast.error(error.message)
    // Handle errors
  }
};
