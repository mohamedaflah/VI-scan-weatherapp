/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
interface HistoricalWeatherResponse {
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
export const getPast7DayHistoricalData = async (
  city: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 7);

    const endpoint = `https://api.weatherbit.io/v2.0/history/daily?key=${
      import.meta.env.VITE_WEATHERBITO_API_KEY
    }&city=${city}&start_date=${pastDate
      .toISOString()
      .slice(0, 10)}&end_date=${today.toISOString().slice(0, 10)}`;

    const response = await axios.get<HistoricalWeatherResponse>(endpoint);

    return response.data.data;
    // Handle the data as needed
  } catch (error: any) {
    console.error("Error fetching past historical data:", error.message);
    // Handle errors
  }
};
