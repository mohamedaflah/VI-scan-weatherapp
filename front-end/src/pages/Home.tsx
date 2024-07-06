import { CloudDrizzle, CloudSun, LucideTrash, MapPin } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import { HeaderBar } from "../components/Home/Header";
import { CityAddModal } from "../components/Home/CityAddModa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { setSelectedCity } from "../redux/reducers/user.reducer";
import { cn } from "../lib/utils";

import toast from "react-hot-toast";
import { WeatherData } from "../types/weather";
import { getCurrentWeatherByCity } from "../api/currentWeatherData";
import { getPast7DayHistoricalData } from "../api/getPast7dayData";
import { get7DayForecast } from "../api/get7dayforcast";
import { WeatherBit7DayResponse } from "../types/weatherbitpast7dayres";
import { ForecastWeatherData } from "../types/weatherForcaseweatherbit";
import { format } from "date-fns";

const Home = () => {
  const { user, selectedCity } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedCity(user?.favouriteCities?.[0]?.cityname));
  }, []);
  // useEffect(() => {
  //   if (user?.favouriteCities) {
  //     if (user?.favouriteCities?.length < 2) {
  //       dispatch(setSelectedCity(user?.favouriteCities?.[0]?.cityname));
  //     }
  //   }
  // }, [dispatch, user?.favouriteCities]);
  const [currentCityWeather, setCurrentCityWeather] =
    useState<WeatherData | null>(null);
  const [pastWeather, setPastweather] = useState<
    WeatherBit7DayResponse[] | null
  >(null);
  const [sevenDayForcast, setForcast] = useState<ForecastWeatherData[] | null>(
    null
  );
  useEffect(() => {
    if (!selectedCity) {
      return;
    }
    getCurrentWeatherByCity(selectedCity)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        setCurrentCityWeather(res);
      })
      .catch((err) => {
        console.log("🚀 ~ .then ~ err:", err);
        toast.error(`Weather ${err.message}`);
      });
    getPast7DayHistoricalData(selectedCity).then((res) => {
      setPastweather(res);
    });
    
    get7DayForecast(selectedCity).then((res) => {
      console.log("🚀 ~ get7DayForecast ~ res:", res)
      setForcast(res);
    });

  }, [selectedCity]);
  return (
    <main className="min-h-screen w-full p-5 flex flex-col gap-5 ">
      <HeaderBar />
      <section className="w-full grid gap-5 md:grid-cols-12 min-h-56 grid-cols-1 ">
        <div className="md:col-span-8 w-full h-full rounded-2xl border shadow-sm p-3 grid grid-rows-2">
          <div className="w-full h-full flex gap-8 items-center justify-between flex-wrap  ">
            <img
              src="/images/8501970-removebg-preview.png"
              className="h-24 drop-shadow-sm -ml-2"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-medium text-1xl sm:text-2xl  md:text-3xl">
                {currentCityWeather?.name}
              </h2>
              <span className="text-sm font-medium">
                {currentCityWeather?.sys?.country}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-1xl sm:text-2xl  md:text-3xl">
                +{currentCityWeather?.main?.temp}°
              </h2>
              <span className="text-sm font-medium">Temprature</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-1xl sm:text-2xl  md:text-3xl">
                +{currentCityWeather?.main?.humidity}°
              </h2>
              <span className="text-sm font-medium">Humidity</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-1xl sm:text-2xl  md:text-3xl">
                {currentCityWeather?.wind?.speed}km
              </h2>
              <span className="text-sm font-medium">wind speed</span>
            </div>
            <div></div>
          </div>
          <div className="w-full h-full overflow-x-auto ">
            <div className="inline-block">
              <div className="h-full w-20 shadow-sm border rounded-2xl p-2 flex flex-col items-center justify-between">
                <div>
                  <span className="text-sm font-medium">
                    {format(Date.now(), "h:mm a")}
                  </span>
                </div>
                <CloudSun size={27} />
                <div>
                  <span className="text-sm font-medium">
                    {currentCityWeather?.main.temp}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 w-full h-56 md:h-full rounded-2xl border shadow-sm p-2 relative bg-[url(/images/worldmap-background-design_1127-2318.avif)] bg-center bg-cover">
          <div className="absolute inset-0 bg-[rgba(240,248,255,0.45)]"></div>{" "}
          <div className="min-h-20 min-w-36 rounded-2xl border absolute left-10 top-7 bg-white/25 shadow-sm flex flex-col p-2">
            <div className="flex gap-1 text-gray-500 items-center">
              <MapPin className="w-5" />
              <span className="text-sm">
                {currentCityWeather?.name}, {currentCityWeather?.sys?.country}
              </span>
            </div>
            <div className="flex flex-col pl-2 ">
              <span className="text-[12px] font-medium text-gray-600">
                {currentCityWeather?.main?.temp}° mostly cloudy
              </span>
              <span className="text-[12px] font-medium text-gray-600">
                {currentCityWeather?.main?.humidity}% humidity
              </span>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section className="w-full grid md:grid-cols-3 gap-5 min-h-80 grid-cols-1">
        <div className="w-full h-full rounded-2xl p-4 border shadow-sm">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-[18px]">Favorite cities</h1>
              <CityAddModal />
            </div>
            <ScrollArea className="w-full h-[280px] ">
              {user?.favouriteCities?.map((city) => (
                <div
                  onClick={() => {
                    dispatch(setSelectedCity(city.cityname));
                  }}
                  key={city.cityname}
                  className={cn(
                    "h-14 rounded-2xl w-full border my-2 cursor-pointer px-3 flex items-center font-<medium justify-between",
                    {
                      "bg-slate-100": String(selectedCity) == city?.cityname,
                    }
                  )}
                >
                  <div>
                    <h1>{city.cityname}</h1>
                  </div>
                  <div className="size-10 rounded-2xl border shadow-sm flex items-center justify-center">
                    <LucideTrash className="w-5 font-thin text-gray-600" />
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="w-full h-full rounded-2xl p-4 border shadow-sm">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-[18px]">Past 7 days report</h1>
            </div>
            <ScrollArea className="w-full h-[280px]   space-y-2">
              {pastWeather?.map((weahter, I) => (
                <div
                  key={I}
                  className="w-full min-h-36 rounded-2xl border p-3 my-2"
                >
                  <div className="w-full items-center flex gap-2">
                    <img
                      src="/images/3d-icon-weather-conditions-with-thunderstorm_23-2150108721-removebg-preview-min.png"
                      className="h-16 "
                      alt=""
                    />
                    <h1>
                      {format(new Date(weahter?.datetime), "EEE, d MMM, yyyy")}
                    </h1>
                  </div>
                  <div className="flex px-2 flex-col gap-1">
                    <div className="flex gap-2 text-sm font-medium">
                      <CloudDrizzle className="text-gray-500 w-5" />
                      <h3>{weahter.temp}% cloud</h3>
                    </div>
                    <div className="flex gap-2 text-sm font-medium">
                      <CloudDrizzle className="text-gray-500 w-5" />
                      <h3>{weahter.clouds}% humidity</h3>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="w-full h-full rounded-2xl p-4 border shadow-sm">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-[18px]">
                7 days weather forcast
              </h1>
            </div>
            <ScrollArea className="w-full h-[280px]   space-y-2">
              {sevenDayForcast?.map((weather, id) => (
                <div
                  key={id}
                  className="w-full min-h-36 rounded-2xl border p-3 my-2"
                >
                  <div className="w-full items-center flex gap-2">
                    <img
                      src="/images/3d-icon-weather-conditions-with-thunderstorm_23-2150108721-removebg-preview-min.png"
                      className="h-16 "
                      alt=""
                    />
                    <h1>
                      {format(new Date(weather?.datetime), "EEE, d MMM, yyyy")}
                    </h1>
                  </div>
                  <div className="flex px-2 flex-col gap-1">
                    <div className="flex gap-2 text-sm font-medium">
                      <CloudDrizzle className="text-gray-500 w-5" />
                      <h3>{weather.temp}% cloud</h3>
                    </div>
                    <div className="flex gap-2 text-sm font-medium">
                      <CloudDrizzle className="text-gray-500 w-5" />
                      <h3>{weather.app_max_temp}% humidity</h3>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
