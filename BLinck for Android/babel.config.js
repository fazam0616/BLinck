module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver',
      {
        alias: {
          'local-lib-alias-name': '../relative/path/to/local/lib',
        },
      },
    ],
  ],
};
