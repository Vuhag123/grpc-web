  import { join } from 'path';
  import copy from 'rollup-plugin-copy';
  import commonjs from '@rollup/plugin-commonjs';
  import typescriptPlugin from 'rollup-plugin-typescript2';
  import typescript from 'typescript';
  import pkg from './package.json';
  
  // Path to your files downloaded by Yarn
const closureBlobsDir = './node_modules/closure-net/grpc_web/';
  
  const buildPlugins = [
    // 1. Copy the types and code files to the dist folder
    copy({
      targets: [
        {
          src: join(closureBlobsDir, 'grpc_web_blob_*.*'),
          dest: 'dist/'
        }
      ]
    }),
    
    // 2. Configure the TypeScript plugin
    typescriptPlugin({
      typescript,
      tsconfigOverride: {
        compilerOptions: {
          target: 'es2020',
          allowJs: true // Important: tells it to read the .js file!
        }
      }
    }),
    commonjs()
  ];
  
  /**
   * ESM build (Matching Firebase)
   */
  const esmBuilds = [
    {
      // 3. THIS IS THE FIX: Use the downloaded .js file directly as input!
      input: join(closureBlobsDir, 'grpc_web_blob_es2022.js'),
      
      output: [
        {
          // Points to where your package.json exports say it should go
          file: pkg.exports['./blob'].require, 
          format: 'cjs', // Keep CommonJS format for your usage
          sourcemap: true
        },
        {
          file: pkg.exports['./blob'].default, 
          format: 'es',
          sourcemap: true
        }
      ],
      plugins: buildPlugins
    }
  ];
  
  export default esmBuilds;
