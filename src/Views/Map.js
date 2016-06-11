var React = require('react');
var {
  View,
  StyleSheet,
  MapView,
  ListView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  DeviceEventEmitter
} = require('react-native');

var friends = [
  {
    name: 'Spongebob Squarepants',
    picUrl: 'http://coolspotters.com/files/photos/910773/spongebob-squarepants-profile.jpg',
    userID: '1'
  },
  {
    name: 'Patrick Star',
    picUrl: 'http://cdn.bleacherreport.net/images_root/users/photos/002/561/373/iloveyou_crop_150x150.png?1381122847',
    userID: '1'
  },
  {
    name: 'Squidward Tentacles',
    picUrl: 'https://lh5.googleusercontent.com/-_ukxyc8gYIo/AAAAAAAAAAI/AAAAAAAAAJ0/fLYJaFe3GDg/w800-h800/photo.jpg',
    userID: '1'
  },
  {
    name: 'Eugene Krabs',
    picUrl: 'http://www.jewornotjew.com/img/people/m/mr__krabs.jpg',
    userID: '1'
  }
];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = React.createClass({
  getInitialState: function() {
    // var list = friends.map((val) => {
    //   var regex = new RegExp(this.state.search);
    //   return val.match(regex);
    // })
    console.log('statessdfsd');
    return {
      dataSource: ds.cloneWithRows(friends),
      search: ''
    };
  },
  render: function() {
    console.log('search', typeof this.state.search);
    return (
      <Animated.View style={styles.container}>
        <MapView
          style={styles.map}
        />
        <View style={styles.nav}>
          <View style={styles.search}>
            <TextInput
              style={styles.searchInput}
              value={this.state.search}
              placeholder={'Search...'}
              placeholderTextColor={'#757363'}
              onChangeText={(text) => {
                this.setState({
                  search: text,
                  dataSource: ds.cloneWithRows(friends.filter((val) => {
                    var regex = new RegExp(text.toLowerCase());
                    return regex.test(val.name.toLowerCase());
                  }))
                })
              }}
            />
          </View>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            enableEmptySections={true}
          />
          <TouchableOpacity>
            <Image
              style={styles.sendAll}
              source={require('../Assets/sendAll.png')}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  },
  renderRow: function(row) {
    return (
      <View style={styles.row}>
        <Image
          source={{uri: row.picUrl}}
          style={styles.profilePic}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.rowName}>
            {row.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.button, styles.notify]}>
              <Text style={styles.buttonText}>
                Notify
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.hide]}>
              <Text style={styles.buttonText}>
                Hide
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
  componentDidMount: function() {
    _keyboardWillShowSubscription = DeviceEventEmitter.addListener('keyboardWillShow', (e) => console.log('keyboardWillShow', e));
    _keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', (e) => console.log('keyboardWillHide', e));
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -110
  },
  map: {
    flex: 3
  },
  nav: {
    flex: 2,
    backgroundColor: '#272822'
  },
  search: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#49483E'
  },
  searchInput:{
    flex: 1,
    borderColor: 'yellow',
    fontSize: 20,
    color: '#fff',
    marginLeft: 15
  },
  list: {
    flex: 5
  },
  row: {
    flexDirection: 'row',
    margin: 10
  },
  profilePic: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  rowName: {
    fontSize: 20,
    marginLeft: 10,
    color: '#fff'
  },
  notify: {
    borderColor: '#0083ef',
    backgroundColor: '#1f91ef',
    width: 160
  },
  hide: {
    borderColor: '#dd111f',
    backgroundColor: '#df6b74',
    width: 80,
    marginLeft: 0
  },
  button: {
    borderWidth: 1,
    margin: 10,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  sendAll: {
    alignSelf: 'flex-end',
    height: 45,
    width: 45,
    marginTop: -55,
    marginRight: 10
  }
});
