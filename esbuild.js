require('esbuild').buildSync({
  entryPoints: ['app.ts'],
  bundle: true,
  minify: true,
  treeShaking: true,
  platform: 'node',
  target: ['node14'],
  outfile: '.esbuild/index.js'
});
