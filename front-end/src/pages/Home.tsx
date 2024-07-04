import {
  CloudDrizzle,
  CloudSun,
  LucideLogOut,
  LucideTrash,
  MapPin,
  Plus,
} from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen w-full p-5 flex flex-col gap-5 ">
      <header className="w-full h-16 flex items-center rounded-2xl shadow-sm border px-3 justify-between">
        <div className="flex gap-2 h-full items-center">
          <img
            src={"/images/user.jpg"}
            className="rounded-full object-cover size-12"
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-sm">Hi, Aflah</span>
            <h3 className="font-medium">Mon, 17 May, 2023</h3>
          </div>
        </div>
        <div className="size-12 rounded-2xl border flex items-center justify-center cursor-pointer">
          <LucideLogOut className="w-5 font-thin text-gray-600" />
        </div>
      </header>
      <section className="w-full grid gap-5 md:grid-cols-12 min-h-56 grid-cols-1 ">
        {/* 8501970-removebg-preview.png */}
        <div className="md:col-span-8 w-full h-full rounded-2xl border shadow-sm p-3 grid grid-rows-2">
          <div className="w-full h-full flex gap-8 items-center justify-between  ">
            <img
              src="/images/8501970-removebg-preview.png"
              className="h-24 drop-shadow-sm -ml-2"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-3xl">Berlin</h2>
              <span className="text-sm font-medium">India</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-3xl">+20°</h2>
              <span className="text-sm font-medium">Temprature</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-3xl">+20°</h2>
              <span className="text-sm font-medium">Humidity</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium  text-3xl">12km</h2>
              <span className="text-sm font-medium">wind speed</span>
            </div>
            <div></div>
          </div>
          <div className="w-full h-full overflow-x-auto ">
            <div className="inline-block">
              <div className="h-full w-20 shadow-sm border rounded-2xl p-2 flex flex-col items-center justify-between">
                <div>
                  <span className="text-sm font-medium">10 am</span>
                </div>
                <CloudSun size={27} />
                <div>
                  <span className="text-sm font-medium">24°</span>
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
              <span className="text-sm">Berlin, Germany</span>
            </div>
            <div className="flex flex-col pl-2 ">
              <span className="text-[12px] font-medium text-gray-600">
                20° mostly cloudy
              </span>
              <span className="text-[12px] font-medium text-gray-600">
                20% humidity
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
              <div className="size-10 border rounded-2xl flex items-center justify-center cursor-pointer">
                <Plus className="w-5" />
              </div>
            </div>
            <div className="w-full h-[280px] overflow-y-auto mt-2 space-y-2">
              <div className="h-14 rounded-2xl w-full border px-3 flex items-center font-<medium justify-between">
                <div>
                  <h1>Berlin</h1>
                </div>
                <div className="size-10 rounded-2xl border shadow-sm flex items-center justify-center">
                  <LucideTrash className="w-5 font-thin text-gray-600" />
                </div>
              </div>
              <div className="h-14 rounded-2xl w-full border px-3 flex items-center font-<medium justify-between bg-slate-100">
                <div>
                  <h1>Berlin</h1>
                </div>
                <div className="size-10 rounded-2xl border shadow-sm flex items-center justify-center">
                  <LucideTrash className="w-5 font-thin text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full rounded-2xl p-4 border shadow-sm">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-[18px]">Past 7 days report</h1>
            </div>
            <div className="w-full h-[280px] overflow-y-auto mt-2 space-y-2">
              <div className="w-full h-36 rounded-2xl border p-3"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-full rounded-2xl p-4 border shadow-sm">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-[18px]">
                7 days weather forcast
              </h1>
            </div>
            <div className="w-full h-[280px] overflow-y-auto mt-2 space-y-2">
              <div className="w-full min-h-36 rounded-2xl border p-3">
                <div className="w-full items-center flex gap-2">
                  <img
                    src="/images/3d-icon-weather-conditions-with-thunderstorm_23-2150108721-removebg-preview-min.png"
                    className="h-16 "
                    alt=""
                  />
                  <h1>Mon, 17, 2023</h1>
                </div>
                <div className="flex px-2 flex-col gap-1">
                  <div className="flex gap-2 text-sm font-medium">
                    <CloudDrizzle className="text-gray-500 w-5" />
                    <h3>20% cloud</h3>
                  </div>
                  <div className="flex gap-2 text-sm font-medium">
                    <CloudDrizzle className="text-gray-500 w-5" />
                    <h3>20% humidity</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
