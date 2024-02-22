import React, { useState, useContext } from "react";
import styles from "./ProductDetails.module.css"
import { useNavigate } from 'react-router-dom';
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { AuthContext } from "../../../../context/Auth/AuthContext"; // Assuming an AuthContext\
import { db } from "../../../../config/firebase"
import { addDoc, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ProductDetails = ({
  productId,
  title,
  price,
  onCart,
  quantity,
}) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);
  const [Qty, setQty] = useState(quantity);

  const { userLoggedIn, signOut } = useContext(AuthContext);
  const isAuthenticated = userLoggedIn;
  const navigate = useNavigate();

  const handleAddClick = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    } else {
      const cartCollection = collection(db, 'cart');
      const querySnapshot = await getDocs(
        query(cartCollection, where('id', '==', productId))
      );
      if (querySnapshot.empty) {
        await addDoc(cartCollection, {
          id: productId,
          qty: 1
        });
      }
    }
  };

  const handleRemoveClick = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    } else {
      try {
        const cartCollection = collection(db, 'cart');
        const querySnapshot = await getDocs(
          query(cartCollection, where('id', '==', productId))
        );

        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          await deleteDoc(doc(cartCollection, docId));
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const dec = async () => {
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to sign-in");
      navigate("/signin");
      return;
    } else {
      try {
        const cartCollection = collection(db, 'cart');
        const querySnapshot = await getDocs(
          query(cartCollection, where('id', '==', productId))
        );

        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0];
          const docId = existingDoc.id;

          if (existingDoc.data().qty > 0) {
            const newQty = existingDoc.data().qty - 1;
            await updateDoc(doc(cartCollection, docId), { qty: newQty });
            setQty(newQty);
          } else {
            console.log("Quantity is already 0, removing the item");
            await deleteDoc(doc(cartCollection, docId));
          }
        } else {
          console.log("Item not found in the cart");
        }
      } catch (error) {
        console.error("Error handling remove click:", error.message);
      }
    }
  };


  const inc = async () => {
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to sign-in");
      navigate("/signin");
      return;
    } else {
      try {
        const cartCollection = collection(db, 'cart');
        const querySnapshot = await getDocs(
          query(cartCollection, where('id', '==', productId))
        );

        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0];
          const docId = existingDoc.id;
          const currentQty = existingDoc.data().qty || 0;
          const newQty = currentQty + 1;
          setQty(newQty);

          await updateDoc(doc(cartCollection, docId), { qty: newQty });
          console.log("Quantity updated successfully");
        } else {
          console.log("Item not found in the cart");
        }
      } catch (error) {
        console.error("Error incrementing quantity:", error.message);
      }
    }
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
              handleRemove={dec}
              disabled={productRemovingFromCart}
            />
            <span>{Qty}</span>
            <PlusIcon
              handleAdd={inc}
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
          disabled={productAddingToCart} // Disable button during addition
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={handleRemoveClick}
          disabled={productRemovingFromCart} // Disable button during removal
        >
          {productRemovingFromCart ? "Removing" : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
