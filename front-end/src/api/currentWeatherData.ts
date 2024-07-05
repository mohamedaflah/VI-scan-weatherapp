import { weatherAxios } from "../config/weatherapiInstance";

export async function getCurrentWeatherByCity(city: string) {
  const { data } = await weatherAxios.get(
    `/weather?q=${city}&appid=${import.meta.env.VITE_WEATHERAPP_API_KEY}`
  );
  return data;
}
