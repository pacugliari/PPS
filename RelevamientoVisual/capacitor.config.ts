import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Relevamiento Visual',
  webDir: 'www',
  server: {
    url: "http://192.168.1.36:8100",
    cleartext: true
  },
  plugins: {
  },
};

export default config;
//    androidScheme: 'https',