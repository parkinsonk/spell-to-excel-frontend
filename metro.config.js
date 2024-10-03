const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      // Add support for PNG, JPG, and other formats as well as SVG
      assetExts: assetExts.filter(ext => ext !== "svg"), // Handle SVG separately
      sourceExts: [...sourceExts, "svg"], // Add SVG support
    },
  };
})();