import axios from "axios";

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_SKU,
  GET_PRODUCT_LIST,
  LOGIN,
  REGISTER,
  UPDATE_PRODUCT,
} from "./endpoints";

export const register = ({ email, password }) => {
  const body = {
    email,
    password,
  };
  const data = axios
    .post(REGISTER, body)
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return data;
};

export const login = async ({ email, password }) => {
  const body = {
    email,
    password,
  };

  const data = await axios
    .post(LOGIN, body)
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return data;
};

export const addProduct = async (values) => {
  const body = { ...values, status: 1 };

  const data = await axios
    .post(ADD_PRODUCT, body)
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return data;
};

export const getProductList = async (values) => {
  const data = await axios.get(GET_PRODUCT_LIST).then((response) => {
    return response;
  });
  return data;
};

export const updateProduct = async (values) => {
  const body = { ...values, status: 1 };

  const data = await axios
    .post(UPDATE_PRODUCT, body)
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return data;
};

export const deleteProduct = async (sku) => {
  const body = { sku };

  await axios.post(DELETE_PRODUCT, body);
};

export const getProductBySku = async (sku) => {
  const body = { sku };

  const data = await axios
    .post(GET_PRODUCT_BY_SKU, body)
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return data;
};
