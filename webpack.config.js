const autoprefixer = require('autoprefixer');

const path = require('path')
// const webpack = require('webpack') // to access built-in plugins

const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const sourceMap = mode === 'development'
const devtool = 'source-map'

const srcs = {
	themes: './src/main/resources/theme/',
	theme: {
		AP: './annapastry',
	},
}

const dist = './src/main/resources/static/'

function tryResolve_(url, sourceFilename) {
	// Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
	// when the importer throws
	try {
		return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
	} catch (e) {
		return '';
	}
}

function tryResolveScss(url, sourceFilename) {
	// Support omission of .scss and leading _
	const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
	return tryResolve_(normalizedUrl, sourceFilename) ||
	tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
	sourceFilename);
}

function materialImporter(url, prev) {
	if (url.startsWith('@material')) {
		const resolved = tryResolveScss(url, prev);
		return {file: resolved || url};
	}
	return {file: url};
}

module.exports = [].concat(
	Object.entries(srcs.theme).map(([themeName, themePath]) => {

		let alias = {}
		alias['@dd'] = path.resolve(__dirname, srcs.themes, 'common')
		alias['@' + themeName.toLowerCase()] = path.resolve(__dirname, srcs.themes, themePath, 'modules')

		let scss = [
			path.resolve(__dirname, srcs.themes, 'common'),
			path.resolve(__dirname, srcs.themes, themePath),
			'./node_modules',
		]

		console.log({alias, scss})

		return {
			mode,
			devtool,

			entry: {
				app: {
					import: [
            path.resolve(__dirname, srcs.themes, themePath, 'main.scss'),
						path.resolve(__dirname, srcs.themes, themePath, 'main.ts')
					]
				}
			},

			output: {
				path: path.resolve(__dirname, dist, themePath),
				filename: 'bundle.js', // themeName.concat('.bundle.js'),
			},

			resolve: {
				extensions: ['.ts', '.js', '.scss', '.css'],
				alias: alias,
			},

			plugins: [
				// new CopyPlugin({
				// 	patterns: [
				// 		{ from: './resources/tinymce/langs',
				// 			to: path.resolve(__dirname, srcpath.themes, themePath, srcpath.dist, 'langs') },
				// 		{ from: './node_modules/tinymce/themes',
				// 			to: path.resolve(__dirname, srcpath.themes, themePath, srcpath.dist, 'themes') },
				// 		{ from: './node_modules/tinymce/models',
				// 			to: path.resolve(__dirname, srcpath.themes, themePath, srcpath.dist, 'models') },
				// 		{ from: './node_modules/tinymce/skins',
				// 			to: path.resolve(__dirname, srcpath.themes, themePath, srcpath.dist, 'skins') },
				// 		{ from: './node_modules/tinymce/icons',
				// 			to: path.resolve(__dirname, srcpath.themes, themePath, srcpath.dist, 'icons') },
				// 		{ from: './node_modules/tinymce/plugins',
				// 			to: path.resolve(__dirname, srcpath.themes, themePath, srcpath.dist, 'plugins') },
				// 	],
				// }),
			],

			module: {
				rules: [
					{
						test: /\.scss$/,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: 'bundle.css', // themeName.concat('.bundle.css'),
								},
							},
							{loader: 'extract-loader'},
							{
								loader: 'css-loader',
								options: {
									sourceMap
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									postcssOptions: {
										plugins: [
											autoprefixer()
										]
									}
								}
							},
							{
								loader: 'sass-loader',
								options: {
									// Prefer Dart Sass
									implementation: require('sass'),

									// See https://github.com/webpack-contrib/sass-loader/issues/804
									webpackImporter: false,
									sassOptions: {
										importer: materialImporter,
										includePaths: scss,
									},
								},
							}
						],
					},
					{
						test: /\.ts/,
						loader: 'ts-loader',
						options: {
							onlyCompileBundledFiles: true,
							allowTsInNodeModules: true
						},
						// exclude: /node_modules/,
					},
				],
			},
		}
	})
)

if (module.exports.length > 0) {
	module.exports[0] = {
		...module.exports[0],
		devServer: {
			devMiddleware: {
				index: true,
				serverSideRender: true,
				writeToDisk: true,
			},

			static: [
        {
          serveIndex: true,
          directory: path.resolve(__dirname, srcs.themes), // use array to be more specific and avoid wasting resources with watching
          publicPath: '/', // default: '/'
          watch: true,
        },
        {
          directory: path.resolve(__dirname, dist),
          publicPath: '/static',
          watch: false
        }
      ],

			compress: true,

			client: {
				progress: true,
				reconnect: true,
				overlay: {
					errors: true,
					warnings: false
				}
			},

			port: 3000,
			open: {
				target: "/"
				// app: {
				// 	name: 'chromium',
				// 	arguments: ['--incognito']
				// }
			}
		}
	}
}