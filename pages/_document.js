import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import themeOptions from '../components/theme/theme-options';
const path = require('path');
const { readdirSync, readFileSync, lstatSync } = require('fs');
       
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const { req: request = {} } = ctx;
		const initialProps = await Document.getInitialProps(ctx);
		const { cookies = {} } = request || {};
		
		/* Colors */
        const themeBaseDirPath = path.join(process.cwd(), 'theme-css');
        let themeMap = {};            
        if (lstatSync(themeBaseDirPath).isDirectory()) {
            const themeDirs = readdirSync(themeBaseDirPath);
            for (const fi of themeDirs) {
                const fileName = fi.replace(/_([^-]*)-[^.]*\.css$/g, '$1');
                themeMap[fileName] = readFileSync(`${themeBaseDirPath}/${fi}`, 'utf8');
            }
        
            global.themeCss = themeMap;
        }
       return {
			...initialProps,
			theme: cookies['g-theme'],
            themeMap,
			};
	}

	render() {
		const { theme, themeMap } = this.props;
		const themeFileName = themeOptions[theme] || themeOptions.LIGHT;
		const themeCss = themeMap ? themeMap[themeFileName] : '';
		
		/* eslint-disable react/no-danger, jam3/no-sanitizer-with-danger */
        return  <Html>
       			<Head />
				<body>
					{themeCss ? (
						<style
							dangerouslySetInnerHTML={{
								__html: `${themeCss} #__next { flex-grow: 1; width: 100%; height: 100%; }`,
							}}
						/>
					) : null}
					<Main />
					<NextScript />
				</body>
			</Html>
		/* eslint-enable react/no-danger, jam3/no-sanitizer-with-danger */
	}
}
