const axios = require('axios');

async function getDataApi(parameters) {
  try {
    const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${parameters}&limit=4`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getDataById(id) {
  try {
    const apiUrl = `https://api.mercadolibre.com/items/${id}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getDataDescription(id) {
  try {
    const apiUrl = `https://api.mercadolibre.com/items/${id}/description`;
    const response = await axios.get(apiUrl);
    return response.data.plain_text;
  } catch (error) {
    throw error;
  }
}

async function getCategories(category_id) {
  try {
    const apiUrl = `https://api.mercadolibre.com/categories/${category_id}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { getDataApi, getDataById, getCategories, getDataDescription };