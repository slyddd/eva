/**
 * Custom Babel preset that mirrors react-native-css-interop's preset
 * but intentionally omits the "react-native-worklets/plugin" entry.
 *
 * This avoids forcing a dependency on react-native-worklets (which
 * conflicts with react-native-reanimated's own worklet runtime in v3),
 * while still enabling CSS interop transformation and automatic JSX runtime.
 *
 * Usage in babel.config.js:
 *   presets: [
 *     ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
 *     './babelInteropNoWorklets.js',
 *     'nativewind/babel',
 *   ]
 */

module.exports = function babelInteropNoWorklets() {
  return {
    plugins: [
      // Core css-interop Babel plugin
      require('react-native-css-interop/dist/babel-plugin').default,

      // Standard JSX transform (same as original preset), configured to
      // use react-native-css-interop as the importSource to resolve style props.
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
          importSource: 'react-native-css-interop',
        },
      ],

      // NOTE: The following original line is intentionally removed:
      // "react-native-worklets/plugin"
      // Reanimated 3 provides its own worklet system; adding the above causes
      // an unnecessary dependency and duplicate dex classes on Android.
    ],
  };
};
