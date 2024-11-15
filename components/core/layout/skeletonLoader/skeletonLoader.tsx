import React from "react";
import styles from "./skeletonLoader.module.css";

interface Props {
    spacing?: number;
    gridTemplateCols?: string;
    gridTemplateRows?: string;
    cards?: number; // Number of skeleton cards to display
}

export function SkeletonLoader({ cards = 3, gridTemplateRows, gridTemplateCols, spacing }: Props) {
  return (
    <div className={styles.skeletonContainer} style={{ 
        gridTemplateRows, 
        gridTemplateColumns: gridTemplateCols,
        padding: `${spacing}rem`
    }}>
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
        </div>
      ))}
    </div>
  );
};