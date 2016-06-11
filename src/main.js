var React = require('react');
var {
  View,
  StyleSheet,
  Navigator
} = require('react-native');

var Map = require('./Views/Map.js');

var ROUTES = {
  map: Map
}

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'map'}}
          renderScene={this.renderScene}
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        />
      </View>
    );
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[`${route.name}`];
    return (
      <Component

      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
