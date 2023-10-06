import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter3',
  appName: 'Alarma Antirrobo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
    //url: "http://192.168.1.36:8100",
    //cleartext: true
  },
  plugins: {
  },
};

export default config;
