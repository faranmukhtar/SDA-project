import React from "react";
import { useRouteError, Link } from "react-router-dom";
import styles from "../styles/ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className={styles["error-container"]}>
      <div className={styles["error-content"]}>
        <h1 className={styles.heading}>Sorry...</h1>
        <br></br>
        <p className={styles.subtext}>
          We didn't have the budget for this page
        </p>

        <p className={styles["error-message"]}>
          <i>{error?.statusText || error?.message || "Unknown Err"}</i>
        </p>

        <Link to="/" className={styles["home-button"]}>
          Take me home
        </Link>
      </div>
    </div>
  );
}
