import React, { useRef, useEffect, useState } from "react";
import styles from "./RegisterPage.module.css";
import { useAuthValue } from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0)
  }, []);


  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { createUser } = useAuthValue();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    const userCreated = await createUser(data);
    // console.log(userCreated === undefined, userCreated);
    console.log(userCreated);

    if (userCreated === true) {
      navigate("/");
    }
  }
  // Create your state or ref here to store the value of the input fields

  // write the submit handler function to validate the forma and signup the user 
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className={styles.loginInput}
          ref={nameRef}
        />
        <input
          type="email"
          name="email"
          className={styles.loginInput}
          placeholder="Enter Email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          className={styles.loginInput}
          placeholder="Enter Password"
          ref={passwordRef}
        />
        <button className={styles.loginBtn}>
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
