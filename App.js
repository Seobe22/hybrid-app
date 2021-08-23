import React, { useEffect, useRef } from "react";
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/AntDesign";

export default function App() {
  const webView = useRef(null);

  const onAndroidBackPress = () => {
    if (webView.current) {
      webView.current.goBack();
      return true;
    }
    return false;
  };
  const onAndroidForwardPress = () => {
    if (webView.current) {
      webView.current.goForward();
      return true;
    }
    return false;
  };
  const onAndroidReloadPress = () => {
    if (webView.current) {
      webView.current.clearHistory();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, []);
  return (
    <View style={styles.container}>
      <WebView
        style={{
          marginTop: 22,
          flex: 10,
        }}
        source={{ uri: "https://www.naver.com" }}
        ref={webView}
        mediaPlaybackRequiresUserAction={true}
        allowsbackforwardnavigationgestures={true}
      />
      <View style={styles.ButtonBar}>
        <TouchableOpacity onPress={onAndroidBackPress} >
          <Icon name="left" size={25} style={{ color: "white" }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{location.href('https://www.naver.com')}}>
          <Icon name="home" size={25} style={{ color: "white" }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAndroidForwardPress}>
          <Icon name="right" size={25} style={{ color: "white" }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {BackHandler.exitApp()}}>
          <Icon name="closecircle" size={25} style={{ color: "white" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ButtonBar: {
    flex: 0.05,
    backgroundColor: "#2c2c2c",
    flexDirection : 'row',
    justifyContent : "space-around",
    alignItems : "center"
  },
});
