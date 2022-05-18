import {
  FAVORITE_WEATHER_KEY,
  SAVED_RESPONSES_KEY,
  SAVED_WEATHER_RESPONSES_KEY,
} from './constants';

const saveResponses = (parsedData) => {
  let savedData = localStorage.getItem(SAVED_RESPONSES_KEY);
  if (savedData) {
    try {
      savedData = JSON.parse(savedData);
      parsedData = [...parsedData, ...savedData];
      parsedData = [...new Set(parsedData)];
    } catch (error) {
      console.log(error);
    }
  }
  const stringifiedData = JSON.stringify(parsedData);
  localStorage.setItem(SAVED_RESPONSES_KEY, stringifiedData);
};

export const parseLocationSearchData = (data) => {
  let parsedData = data.map(({ LocalizedName, Key }) => ({
    name: LocalizedName,
    key: Key,
  }));
  parsedData = [...new Set(parsedData)]; // API sometime returns duplicates, which may result in react errors. Removing dups here
  saveResponses(parsedData);
  return parsedData;
};

export const getParsedLocalStorageData = (key) => {
  let data = localStorage.getItem(key);
  if (data?.length) {
    return JSON.parse(data);
  }
  return null;
};

export const searchLocationFromLocal = (query) => {
  query = query.toLowerCase();
  let savedData = getParsedLocalStorageData(SAVED_RESPONSES_KEY);
  if (savedData) {
    savedData = savedData.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
    return savedData;
  }
  return [];
};

export const parseWeatherData = (data, city, key) => {
  data = data[0];
  const {
    WeatherText,
    Temperature: { Metric, Imperial },
  } = data;
  const parsedData = {
    weatherText: WeatherText,
    temperature: {
      metric: Metric.Value,
      imperial: Imperial.Value,
    },
    city,
    key,
  };
  let savedData = getParsedLocalStorageData(SAVED_WEATHER_RESPONSES_KEY);
  if (savedData) {
    savedData[key] = parsedData;
    savedData = JSON.stringify(savedData);
    localStorage.setItem(SAVED_WEATHER_RESPONSES_KEY, savedData);
  } else {
    let toLocalStorage = {
      [key]: parsedData,
    };
    toLocalStorage = JSON.stringify(toLocalStorage);
    localStorage.setItem(SAVED_WEATHER_RESPONSES_KEY, toLocalStorage);
  }
  return parsedData;
};

export const searchWeatherFromLocal = (key) => {
  let savedData = getParsedLocalStorageData(SAVED_WEATHER_RESPONSES_KEY);
  if (savedData) {
    return savedData[key];
  }
  return null;
};

export const handleFavoriteActions = (data) => {
  /*
    This is a 2 way function,
    it will add to favorite, if not currently added
    and remove if already added
   */
  let updatedData;
  let savedData = getParsedLocalStorageData(FAVORITE_WEATHER_KEY);
  if (savedData?.length) {
    if (isFavorite(data.key)) {
      updatedData = savedData.filter((item) => item.key !== data.key);
    } else {
      updatedData = [...savedData, data];
    }
  } else {
    updatedData = [data];
  }
  updatedData = JSON.stringify(updatedData);
  localStorage.setItem(FAVORITE_WEATHER_KEY, updatedData);
};

export const isFavorite = (key) => {
  let savedData = getParsedLocalStorageData(FAVORITE_WEATHER_KEY);
  if (savedData?.length) {
    return savedData.filter((item) => item.key === key).length;
  }
  return false;
};
