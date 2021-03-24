const fs = require('fs');
const path = require('path');
const del = require('del');
const makeDir = require('make-dir');
const cssnano = require('cssnano');
const postcss = require('postcss');

process.setMaxListeners(0);
const cssFilesDirPath = path.resolve(__dirname, './css/theme');
const criticalCssBaseDirPath = path.resolve(__dirname, './theme-css');

async function makeThemeCss() {
	await del([criticalCssBaseDirPath]);
	await makeDir(criticalCssBaseDirPath);

	const cssFiles = fs.readdirSync(cssFilesDirPath);
	return Promise.all(
		cssFiles.map(async file => {
			const filePath = `${cssFilesDirPath}/${file}`;
			const newFilePath = `${criticalCssBaseDirPath}/${file}`;
			const css = fs.readFileSync(filePath, 'utf8');
			const minifiedCss = await postcss([cssnano]).process(css);
			fs.writeFileSync(newFilePath, minifiedCss.css);
		}),
	);
}

makeThemeCss();
