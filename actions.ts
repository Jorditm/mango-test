"use server";
import fetch from "node-fetch"


export const getPrices = async () => {
  const res = await fetch("http://demo3982827.mockable.io/product-prices", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 1234567890",
    },
  });
  const data = await res.json();
  return data;
};

export const getArrayPrices = async () => {
  const res = await fetch("http://demo3982827.mockable.io/array-prices", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 1234567890",
    },
  });
  const data = await res.json();
  return data;
};
