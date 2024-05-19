import { useState, useEffect } from "react";
import axios from "axios";

const app_id = "c6bba2f9";
const app_key = "039ae1b36c1465f3cf917b986c88038d";

export const useFetchFoodData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const options = {
    method: "GET",
    url: `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${query}&nutrition-type=cooking`,
    params: { query: query },
    headers: {
      Accept: "application/json",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return { data, isLoading, error, setQuery };
};

export const useFetchSpecificFood = (foodId, quantity, measureURI) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    ingredients: [
      {
        quantity: quantity,
        measureURI: measureURI,
        qualifiers: [],
        foodId: foodId,
      },
    ],
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const url = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${app_id}&app_key=${app_key}`;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, options, config);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};
