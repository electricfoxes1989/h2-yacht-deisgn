import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dhren5s2',
    dataset: 'production',
  },
  studioHost: 'h2yachtdesign',
  deployment: {
    appId: 'f3td4otrhr2hzcne2brbtaha',
    autoUpdates: true,
  },
})
