import { TransformOptions } from '@babel/core';

const config: TransformOptions = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
};

export default config;

