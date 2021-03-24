import React, { useCallback, useEffect, useState } from 'react';
import { setCookieValue, getCookieValue } from '../utils/helpers';
import Svg from '../components/svg';
import TickIcon from '../components/svg/icons/tick-icon';

import themeOptions from '../components/theme/theme-options';
import styles from '../css/dark-mode.module.css'

const DarkMode = React.memo(() => {
	const [theme, setTheme] = useState(themeOptions.LIGHT);
	const themeSelected = themeOptions[theme] || themeOptions.LIGHT;
    
    const handleDarkMode = useCallback(() => {
		const val = themeSelected === 'dark' ? 'LIGHT' : 'DARK';
		setCookieValue('g-theme', val, 2147483647, '/');
		setTimeout(() => {
			global.window.location.reload();
			return false;
		}, 0);
	}, [theme]);
    
    useEffect(() => {
        setTheme(getCookieValue('g-theme'));
	}, []);

	return (
		<a
			className={`${styles.btnContainer} ${styles.link} ${styles.noUnderline}`}
			onClick={handleDarkMode}
		>
			<span className={styles.title}>Dark Mode</span>
			<span
				className={`${styles.tickIconContainer} ${
					themeSelected === 'dark' ? `${styles.darkThemeSelected}` : ''
				}`}
			>
				<Svg
					classes={styles.darkModeIconStyles}
					spriteIcon={TickIcon}
					avoidDefault={false}
					viewBox="0 0 32 24"
					width="20px"
					height="20px"
					style={{
						strokeWidth: '4px',
						padding: '2px',
					}}
				/>
			</span>
		</a>
	);
});


export default DarkMode;
