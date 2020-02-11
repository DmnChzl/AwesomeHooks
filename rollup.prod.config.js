import { terser } from 'rollup-plugin-terser';
import config, { output, plugins } from './rollup.config';

export default {
  ...config,
  output: {
    ...output,
    file: './dist/bundle.min.js'
  },
  plugins: [...plugins, terser()]
};
