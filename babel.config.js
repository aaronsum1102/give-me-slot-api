module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.13'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    // '@babel/plugin-syntax-class-properties',
    '@babel/plugin-proposal-class-properties'
    // '@babel/plugin-syntax-dynamic-import'
  ]
};
