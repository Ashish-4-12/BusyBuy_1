// HomePage.jsx
import React, { useEffect, useState, useContext } from "react";
import styles from "./HomePage.module.css";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
// import ProductList from "../../components/ProductList/ProductList"; // Assuming you have a ProductList component

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState({
    priceRange: 75000,
    categories: [],
  });

  useEffect(() => {
    // Fetch products on app mount
    fetchProducts();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    // Rerender products if search or filter parameters change
    fetchProducts();
  }, [searchTerm, filterParams]);

  const fetchProducts = () => {
    // Simulate API call or use your actual API
    setLoading(true);
    // Replace the following with your actual API call
    setTimeout(() => {
      // Simulated response
      const dummyData = [
        // Your product data
      ];
      setProducts(dummyData);
      setLoading(false);
    }, 1000); // Simulated delay of 1 second
  };

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
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductList products={products} />
        // Assuming you have a ProductList component that takes products as a prop
      )} */}
    </div>
  );
}

export default HomePage;
