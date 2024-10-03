const { getDefaultConfig } = require('@expo/metro-config'); // Use @expo/metro-config instead of metro-config

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname); // Get Expo's default config

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      ...defaultConfig.transformer, // Extend default transformer config from Expo
    },
    resolver: {
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // Remove 'svg' from assetExts
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Add 'svg' to sourceExts
    },
  };
})();