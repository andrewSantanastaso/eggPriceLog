import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as productService from "../services/productService";
import Chart from "../components/Chart";

const App = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.loadProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<div>Hello World!</div>} />
        <Route path="/chart" element={<Chart products={products} />} />
      </Routes>
    </>
  );
};

export default App;
