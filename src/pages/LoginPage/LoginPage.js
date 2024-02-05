import React, { useRef, useContext, useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/Auth/AuthContext";

const LoginPage = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { signIn } = useAuthValue();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    const status = await signIn(data);
    if (status === true) navigate("/");
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.loginTitle}>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className={styles.loginInput}
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className={styles.loginInput}
          ref={passwordRef}
        />
        <button className={styles.loginBtn}>
          {loading ? "Sign Up" : "Sign In"}
        </button>
        <NavLink to="/signup"
          style={{
            textDecoration: "none",
            color: "#224957",
            fontFamily: "Quicksand",
          }}>
          <p style={{ fontWeight: "600", margin: 0 }}>Or SignUp instead</p>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
