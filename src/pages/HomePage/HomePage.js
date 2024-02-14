// HomePage.jsx
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductList from "../../components/Product/ProductList/ProductList";
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function HomePage() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState({
    priceRange: 75000,
    categories: [],
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await getDocs(collection(db, 'products'));
        const productsData = productsCollection.docs.map((doc) => {
          const productData = doc.data();
          return { title: productData.title, price: productData.price, image: productData.image, id: productData.id, quantity: productData.quantity };
        });
        setProducts(productsData);
        // console.log(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleSearchChange = () => {
      console.log(searchTerm);
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);

    };

    handleSearchChange();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
  };

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setCategories={(categories) =>
          handleFilterChange({ ...filterParams, categories })
        }
        setPriceRange={(priceRange) =>
          handleFilterChange({ ...filterParams, priceRange })
        }
        priceRange={filterParams.priceRange}
      />
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      <ProductList products={products} />
    </div>
  );
}

export default HomePage;
