/* eslint-disable react-native/no-inline-styles */
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Text } from 'react-native';
import { isConfigSet, getConfig, env } from '../Config';

export const ChatView = ({ consultationId }: { consultationId: string }) => {
  if (!isConfigSet()) {
    if (__DEV__) {
      console.warn('ChatView: Please call setConfig() before using ChatView.');
    }
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>SDK not configured</Text>
        </View>
      </View>
    );
  }

  const config = getConfig();
  const injectedJavaScript = `
    localStorage.setItem('_cap_ApiKey', '${config.apiKey}');
    localStorage.setItem('_cap_platform', 'react_native');
    window.platform = 'react_native';
    localStorage.setItem('_cap_OrganizationId', '${config.organizationId}');
    localStorage.setItem('_cap_Locale', '${config.locale}');
    localStorage.setItem('_cap_isProd', '${config.env === env.production}');
    localStorage.setItem('_cap_isDev', '${config.env === env.development}');
    localStorage.setItem('_cap_env', '${config.env}');
    localStorage.setItem('_cap_AppName', '${config.appName}');
    true; // required for Android
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `${config.baseUrl}/clinic/consultation/${consultationId}`,
        }}
        originWhitelist={['*']}
        style={styles.webView}
        mixedContentMode="always"
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    width: '100%',
  },
  webView: {
    flex: 1,
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
