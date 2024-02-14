// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";

const ProductDetails = ({
  title,
  price,
  onCart,
  handleAddToCart,
  handleRemoveFromCart,
  quantity,
}) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);

  const handleAddClick = () => {
    setProductAddingToCart(true);
    setTimeout(() => {
      setProductAddingToCart(false);
    }, 1000);
    handleAddToCart(); // Call your add to cart function here
  };

  const handleRemoveClick = () => {
    setProductRemovingCart(true);
    setTimeout(() => {
      setProductRemovingCart(false);
    }, 1000);
    handleRemoveFromCart(); // Call your remove from cart function here
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 35)}...`}</p>
      </div>
      <div className={styles.productOptions}>
        <p> &#8377; {price}</p>
        {onCart && (
          <div className={styles.quantityContainer}>
            <MinusIcon
              handleRemove={handleRemoveClick}
              disabled={productRemovingFromCart}
            />
            <span>{quantity}</span>
            <PlusIcon
              handleAdd={handleAddClick}
              disabled={productAddingToCart}
            />
          </div>
        )}
      </div>
      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          onClick={handleAddClick}
          disabled={productAddingToCart}
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={handleRemoveClick}
          disabled={productRemovingFromCart}
        >
          {productRemovingFromCart ? "Removing" : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
