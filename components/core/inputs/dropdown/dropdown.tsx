"use client"

import React, { useState } from "react";
import styles from "./dropdown.module.css";
import { ComponentProps } from "~/components/types/componentProps";

interface Props<TOption> extends ComponentProps {
    placeholder: string;
    options: TOption[];
    onSelect: (opt: TOption) => any;
    display: (opt: TOption) => string;
}

export function Dropdown<TOption>({ options, placeholder, onSelect, display }: Props<TOption>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TOption | null>(null);

  const handleSelect = (option: TOption) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? <span className={styles.dropdownSelected}>{display(selected)}</span> : placeholder || "Select an option"}
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {display(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};