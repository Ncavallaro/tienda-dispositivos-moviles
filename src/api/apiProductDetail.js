import axios from 'axios';

const URL = `https://front-test-api.herokuapp.com/api/product/${productId}`;
const CACHE_PREFIX = 'productDetail';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hora

const getProductDetail = async (productId) => {
  const cachedData = getCachedData(productId);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(URL);
    const data = response.data;
    cacheData(productId, data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCachedData = (productId) => {
  const cachedData = JSON.parse(localStorage.getItem(getCacheKey(productId)));
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
    return cachedData.data;
  }
  return null;
};

const cacheData = (productId, data) => {
  const cachedData = {
    timestamp: Date.now(),
    data: data,
  };
  localStorage.setItem(getCacheKey(productId), JSON.stringify(cachedData));
};

const getCacheKey = (productId) => {
  return `${CACHE_PREFIX}_${productId}`;
};

export default getProductDetail;
