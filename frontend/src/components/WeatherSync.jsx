import { useEffect } from "react";

// Open-Meteo free, no key. Coordinates: Herning, Denmark.
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=56.1367&longitude=8.9683" +
  "&current=precipitation,cloud_cover,wind_speed_10m,is_day" +
  "&daily=sunset,sunrise&timezone=auto&forecast_days=1";

function deriveState(data) {
  const c = data?.current || {};
  const d = data?.daily || {};
  const precipitation = c.precipitation ?? 0;
  const cloudCover = c.cloud_cover ?? 50;
  const windSpeed = c.wind_speed_10m ?? 0; // km/h from Open-Meteo by default
  const isDay = !!c.is_day;

  const now = new Date();
  const sunset = d.sunset ? new Date(d.sunset[0]) : null;
  const sunrise = d.sunrise ? new Date(d.sunrise[0]) : null;

  // Time mode
  let timeMode = "day";
  if (sunset && Math.abs(now - sunset) < 60 * 60 * 1000) timeMode = "sunset";
  else if (sunrise && Math.abs(now - sunrise) < 60 * 60 * 1000) timeMode = "sunrise";
  else if (!isDay) timeMode = "night";

  // Weather mode
  let weather = "clear";
  if (precipitation > 0.1) weather = "rain";
  else if (!isDay && cloudCover < 30) weather = "clear-night";
  else if (cloudCover > 70) weather = "cloudy";

  const windy = windSpeed > 20; // km/h
  return { weather, timeMode, windy, raw: { precipitation, cloudCover, windSpeed, isDay } };
}

export default function WeatherSync() {
  useEffect(() => {
    let cancelled = false;
    const apply = (state) => {
      if (cancelled) return;
      const root = document.documentElement;
      root.dataset.weather = state.weather;
      root.dataset.timeMode = state.timeMode;
      root.dataset.windy = state.windy ? "true" : "false";
      // Expose to other components via custom event
      window.dispatchEvent(new CustomEvent("larsen:weather", { detail: state }));
    };

    const fetchWeather = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("weather fetch failed");
        const data = await res.json();
        const state = deriveState(data);
        apply(state);
      } catch (e) {
        // Graceful fallback by time of day
        const h = new Date().getHours();
        apply({
          weather: "clear",
          timeMode: h >= 17 && h <= 19 ? "sunset" : h >= 20 || h < 6 ? "night" : "day",
          windy: false,
        });
      }
    };

    fetchWeather();
    const id = setInterval(fetchWeather, 15 * 60 * 1000); // every 15 min
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return null;
}
