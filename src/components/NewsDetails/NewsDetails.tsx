import React, { useCallback, useEffect, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { cacheAdd } from '@feed/store/reducers/cache';

interface Props {
  url: string;
}

export default (props: Props) => {
  const { url } = props;
  const [html, setHtml] = useState<string | null>(null);
  const [cached, setCached] = useState(true);
  const dispatch = useDispatch();
  const [urlDataSaved, setUrlDataSaved] = useState('');

  const injectedJavascript = `(function() {
      window.postMessage = function(data) {
         window.ReactNativeWebView.postMessage(data);
         return true;
      };
     window.postMessage(new XMLSerializer().serializeToString(document))
})()`;

  const saveHTML = useCallback(
    (e: WebViewMessageEvent) => {
      const htmlString = e.nativeEvent.data;
      if (htmlString?.length > 100 && urlDataSaved !== url) {
        setUrlDataSaved(url);
        dispatch(cacheAdd(url, htmlString));
      }
    },
    [dispatch, url, urlDataSaved],
  );

  const readHTML = useCallback(async (cachedUrl: string) => {
    try {
      const result = await AsyncStorage.getItem(cachedUrl);
      setHtml(result);
      if (!result) {
        setCached(false);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    setCached(true);
    readHTML(url);
  }, [readHTML, dispatch, url]);

  return (
    <View style={style.container}>
      {((cached && html) || !cached) && (
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          injectedJavaScript={injectedJavascript}
          onMessage={saveHTML}
          scalesPageToFit={true}
          //@ts-ignore
          source={cached ? { html } : { uri: url }}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
  },
});
