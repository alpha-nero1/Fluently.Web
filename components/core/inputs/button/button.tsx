import React from 'react'
import { ComponentProps } from '~/components/types/componentProps';
import styles from './button.module.css';

interface Props extends ComponentProps {
    children: any;
}

/**
 *  Button component. 
 */
export function Button({ children, id }: Props) {
  return (
    <button id={id} className={styles.button}>{children}</button>
  )
}
