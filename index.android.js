'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  NativeModules,
  Navigator,
  ToolbarAndroid,
  View,
  Text,
  TouchableOpacity,
  BackAndroid
} = React;

var PostsView = require('./App/Views/Posts');
var PostView = require('./App/Views/Post');
var WebView = require('./App/Views/Web');
var _navigator;

let {
  ExponentConstants
} = NativeModules;

var NavToolbar = React.createClass({

  componentWillMount: function() {
    var navigator = this.props.navigator;
  },

  render: function () {
    if (this.props.navIcon) {
      return (
        <View style={{backgroundColor: '#FF6600'}}>
          <ToolbarAndroid
            style={styles.toolbar}
            navIcon={{uri: "https://d3lwq5rlu14cro.cloudfront.net/hackernews/ic_arrow_back_white_24dp.png"}}
            onIconClicked={this.props.navigator.pop}
            titleColor="#ffffff"
            title='Hacker News - Top Stories' />
        </View>
      )
    }
    return (
      <View style={{backgroundColor: '#FF6600'}}>
        <ToolbarAndroid
          style={styles.toolbar}
          onIconClicked={this.props.navigator.pop}
          titleColor="#ffffff"
          title='Hacker News - Top Stories' />
      </View>
    )
  }
})

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

var HackerNews = React.createClass({

  renderScene: function(route, navigator) {
    _navigator = navigator;
    if (route.id === 'Home') {
      return (
        <View style={{flex: 1}}>
        <NavToolbar navigator={navigator}/>
        <PostsView nav = {navigator} name = { route.name }/>
        </View>
      );
    }
    if (route.id === 'Post') {
      return (
        <View style={{flex: 1}}>
        <NavToolbar navIcon={true} navigator={navigator}/>
        <PostView index = {route.index} post={route.post} nav={navigator}  />
        </View>
      )
    }

    if (route.id === 'WebView') {
      return (
        <View style={{flex: 1}}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <WebView index = {route.index + 1}  title={route.title} url={route.url} />
          </View>
      )
    }
  },
  render: function() {
    return (
      <Navigator
      initialRoute = {{id: 'Home', index: 0}}
      configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      renderScene={this.renderScene}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    backgroundColor: '#FF6600',
    marginTop: ExponentConstants.statusBarHeight,
    height: 56,
  }
});

module.exports = HackerNews;
