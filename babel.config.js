module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.jpg', '.png', '.webp', 'json', '.ts', '.tsx', '.js', '.jsx'],
        alias: {
          '@feed': './src',
        },
      },
    ],
    ['transform-inline-environment-variables'],
  ],
};
