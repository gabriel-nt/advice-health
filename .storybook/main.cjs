module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-sass-postcss',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.base = '/ignite-design-system/'
    }

    return config
  },
}
