const {
  getDataApi,
  getDataById,
  getDataDescription,
  getCategories,
} = require("../services");

async function serializeData(query) {
  try {
    const totalObject = {
      author: {
        name: "Lina Xiomara",
        lastname: "Pinilla Cuevas",
      },
      items: [],
      categories: [],
    };

    const { results, filters } = await getDataApi(query);
    totalObject.items = results.map((item) => ({
      id: item.id,
      title: item.title,
      price: formatPrice(item.price, item.currency_id),
      picture: item.thumbnail,
      free_shipping: item.shipping && item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: item.plain_text,
    }));
    totalObject.categories =
      filters && filters.length > 0
        ? filters
            .find((filter) => filter.id === "category")
            .values[0].path_from_root.map((category) => category.name)
        : [];

    return totalObject;
  } catch (error) {
    throw error;
  }
}

const formatPrice = (price, currencyId) => {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currencyId,
  }).format(price);

  return formattedPrice;
};

async function serializeDataById(id) {
  try {
    const detailedItem = await getDataById(id);

    if (!detailedItem) {
      throw new Error("No se pudo obtener información detallada del producto.");
    }

    const totalObject = {
      author: {
        name: "Lina Xiomara",
        lastname: "Pinilla Cuevas",
      },
      item: {
        id: detailedItem.id,
        title: detailedItem.title,
        picture: detailedItem.thumbnail,
        description: await getDataDescription(detailedItem.id),
        price: await formatPrice(detailedItem.price, detailedItem.currency_id),
        initial_quantity: detailedItem.initial_quantity,
      },
      categories: await getCategoriesFromFilters(detailedItem.category_id),
    };
    return totalObject;
  } catch (error) {
    throw error;
  }
}

async function getCategoriesFromFilters(category_id) {
  try {
    const categories = await getCategories(category_id);

    const categoryNames = categories.path_from_root.map(
      (category) => category.name
    );

    return categoryNames;
  } catch (error) {
    return [];
  }
}

module.exports = { serializeData, serializeDataById };
