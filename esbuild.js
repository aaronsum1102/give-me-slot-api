require('esbuild').buildSync({
  entryPoints: ['api/index.ts'],
  bundle: true,
  minify: true,
  treeShaking: true,
  platform: 'node',
  target: ['node16'],
  outfile: '.esbuild/index.js'
});
