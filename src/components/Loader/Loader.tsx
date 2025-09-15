import React from "react";
import styles from './Loader.module.css';

const Loader: React.FC = () => {
    return <p className={styles.css}>Loading movies, please wait...</p>
};

export default Loader;