/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import styles from './dark-mode.module.css';

function DarkThemeIcon({ theme, themeToggleHandler }) {
  return (
    <span
      onClick={themeToggleHandler}
      onKeyDown={themeToggleHandler}
      className={styles.container}
    >
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faSun} size="lg" className={styles.sun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} size="lg" className={styles.moon} />
      )}
    </span>
  );
}

export default DarkThemeIcon;
