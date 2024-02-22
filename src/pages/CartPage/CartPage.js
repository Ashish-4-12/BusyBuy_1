import React, { useEffect, useContext, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./CartPage.module.css";
import { db } from "../../config/firebase"
import { collection, getDocs } from "firebase/firestore";
import data from "../../utils/data";
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import ProductGrid from "../../components/Product/ProductGrid/ProductGrid";

const getCart = async () => {
  console.log("getCrt")
  const cartCollection = collection(db, 'cart');
  const cartSnapshot = await getDocs(cartCollection);

  if (cartSnapshot.empty) {
    return [];
  }

  const cartItems = cartSnapshot.docs.map((doc) => ({
    productId: doc._document.data.value.mapValue.fields.id,
    quantity: doc._document.data.value.mapValue.fields.qty
  }));
  return cartItems;
};

const extractProductDetails = (cartSnapshot) => {
  console.log("extractProductDetails")
  const products = [];
  if (cartSnapshot.length === 0) {
    console.log("No cart data found");
    return products;
  }
  else {
    Object.values(cartSnapshot).forEach((doc) => {
      const productid = doc.productId;

      const matchingProduct = data.find((product) => product.id == productid.integerValue);

      if (matchingProduct) {
        products.push({
          quantity: doc.quantity.integerValue,
          ...matchingProduct,
        });
      }
    });
    return products;
  }
};

const CartPage = () => {

  const [cartDetails, setCartDetails] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);


  useEffect(() => {
    const fetchCartData = async () => {
      const cartSnapshot = await getCart();
      const cartData = extractProductDetails(cartSnapshot);
      console.log("cartdata", cartData)
      setCartDetails(cartData);
      console.log("cart state", cartDetails);
    };
    fetchCartData();
  }, [cartDetails]);

  useEffect(() => {
    let total = 0;
    if (Array.isArray(cartDetails)) {
      cartDetails.map((data) => {
        total += data.quantity * data.price;
      });
    }
    setTotalPrice(total);
  }, [cartDetails]);


  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.cartPageContainer}>
        <div className={styles.totalPrice}>
          <p>TotalPrice:- ₹{totalPrice}/-</p>
          <button className={styles.purchaseBtn}>Purchase</button>
        </div>
      </div>
      <ProductGrid>
        {cartDetails.map((product, idx) => {
          return (
            <ProductCard
              product={product}
              key={idx}
              onCart={true}
            />
          );
        })}
      </ProductGrid>
    </>
  );
};

export default CartPage;
