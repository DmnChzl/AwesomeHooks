import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { name as libraryName } from './package.json';

export const output = {
  file: './dist/bundle.js',
  format: 'cjs',
  name: libraryName,
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};

export const plugins = [
  babel({
    exclude: 'node_modules/**'
  }),
  commonjs()
];

export default {
  input: './src/index.js',
  output,
  external: ['react', 'react-dom'],
  plugins
};
