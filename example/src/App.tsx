import { useEffect, useState } from 'react';
import {
  ChatView,
  setConfig,
  isConfigSet,
  env,
  locale,
  type LibraryConfig,
} from 'react-native-cura-sdk';
import { View, StyleSheet, Text, Alert, Platform } from 'react-native';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isConfigSet()) {
      try {
        setConfig({
          env: env.development,
          locale: locale.ar,
          apiKey: '87acb9b6-795e-46c2-a35a-8e117f16bdb0',
          organizationId: 'd7a8c56e-9f3b-11ed-a8fc-0242ac120002',
          appName:
            Platform.OS === 'android' ? 'com.ubieva.cura' : 'com.ubieva.cura',
        } as LibraryConfig);
      } catch (err) {
        Alert.alert('Config Error', (err as Error).message);
      }
    }

    setReady(true);
  }, []);

  if (!ready) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChatView consultationId="1187" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoadingSpinner = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);
