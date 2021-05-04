module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.19'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
};
