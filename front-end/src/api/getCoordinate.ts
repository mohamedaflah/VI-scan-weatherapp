import { weatherAxios } from "../config/weatherapiInstance";

export async function getCoordinates(
  city: string
): Promise<{ lat: number; lon: number }> {
  const response = await weatherAxios.get(
    `/weather?q=${city}&appid=${import.meta.env.VITE_WEATHERAPP_API_KEY}`
  );
  const { coord } = response.data;
  return { lat: coord.lat, lon: coord.lon };
}
