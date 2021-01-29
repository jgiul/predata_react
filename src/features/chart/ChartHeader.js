import React from "react";
import styles from "./Chart.module.css";
// import styles from "./Chart.module.css";

// TODO: Implement
export const ChartHeader = ({ text }) => (
  <div>
    <div className={styles.header__label}>
      Title
    </div>
      <div className={styles.header__text}>{text}</div>
  </div>
);
