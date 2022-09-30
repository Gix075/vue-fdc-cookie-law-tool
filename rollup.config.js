import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
//import scss from 'rollup-plugin-scss'
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/vue-fdc-cookie-law-tool.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/vue-fdc-cookie-law-tool.js'
      }
    ],
    plugins: [
      vue(), peerDepsExternal(),
      postcss({
        extract: false,
        modules: false,
        use: ['sass']
      })
    ]
  }
]