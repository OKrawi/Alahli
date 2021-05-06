export default {
  name: "Alahli",
  displayName: 'Alahli',
  version: "1.0.0",
  expo: {
    name: "Alahli",
    slug: "Alahli",
    description: "Aqar Alahli Bank Mortgage Calculator Challenge",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "alahli.aqar.demo"
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
}
