const config = {
	module: {
	  rules: [
		{
		  test: /\.tsx?$/,
		  use: 'ts-loader',
		  exclude: /node_modules/,
		},
		{ test: /\.js$/, loader: 'source-map-loader' },
	  ],
	},
	resolve: {
	  extensions: ['.tsx', '.ts', '.js'],
	},
  };
  
  module.exports = config;
  