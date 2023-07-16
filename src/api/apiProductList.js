import axios from 'axios';

const CACHE_KEY = 'productList';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hora

const getProductList = async () => {

  const URL = 'https://front-test-api.herokuapp.com/api/product';
  const proxyUrl = 'https://allorigins.win/get?url=' + encodeURIComponent(URL);

  const cachedData = getCachedData();
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(proxyUrl);
    const data = response.data;
    cacheData("data: "+data);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCachedData = () => {
  const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
    console.log("cacheData: " + cachedData.data);
    return cachedData.data;
  }
  return null;
};

const cacheData = (data) => {
  const cachedData = {
    timestamp: Date.now(),
    data: data,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
};

export default getProductList;
