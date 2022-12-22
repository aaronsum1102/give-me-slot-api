require('esbuild').buildSync({
  entryPoints: ['src/app.ts'],
  bundle: true,
  minify: true,
  treeShaking: true,
  platform: 'node',
  target: ['node16'],
  outfile: '.esbuild/index.js'
});
