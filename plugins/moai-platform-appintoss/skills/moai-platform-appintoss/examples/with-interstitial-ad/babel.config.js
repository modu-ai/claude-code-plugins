function resolve(id) {
  return require.resolve(id);
}

module.exports = (api) => {
  const isTest = api?.env('test');

  const baseConfig = {
    presets: [[resolve('@babel/preset-typescript')], [resolve('@babel/preset-react'), { runtime: 'automatic' }]],
    plugins: [
      [resolve('@babel/plugin-transform-flow-strip-types')],
      [resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      [resolve('@babel/plugin-proposal-private-property-in-object'), { loose: true }],
      [resolve('@babel/plugin-proposal-private-methods'), { loose: true }],
    ],
  };

  if (isTest) {
    baseConfig.presets.unshift([
      resolve('@babel/preset-env'),
      {
        targets: {
          node: 'current',
        },
      },
    ]);
  } else {
    baseConfig.presets.unshift([
      resolve('@babel/preset-env'),
      {
        targets: {
          ie: 11,
        },
      },
    ]);
  }

  return baseConfig;
};
