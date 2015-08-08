'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} = React;

var { Icon, } = require('react-native-icons');
var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

var FacebookTabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

	renderTabOption(name, page) {
		var isTabActive = this.props.activeTab === page;
		var numberOfTabs = this.props.tabs.length;
		var iconWidth;
		var iconHeight;
		var iconSize;
//	console.log(name);

		iconWidth = 30;
		iconHeight = 30;
		iconSize = 30;
		var iconPadding = deviceWidth / (2 * numberOfTabs) - iconWidth / 2;
		return (
			<TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
				<View style={[styles.tab]}>
					<Icon name={name} size={iconSize} color='#3B5998' style={{width: iconWidth, height: iconHeight, position: 'absolute', top: 0, left: iconPadding}}
						ref={(icon) => { this.selectedTabIcons[page] = icon }}/>
					<Icon name={name} size={iconSize} color='#ccc' style={{width: iconWidth, height: iconHeight, position: 'absolute', top: 0, left: iconPadding}}
						ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
				</View>
			</TouchableOpacity>
		);
	},

  setAnimationValue(value) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      if (value - i >= 0 && value - i <= 1) {
        icon.setNativeProps({opacity: value - i});
      }
      if (i - value >= 0 &&  i - value <= 1) {
        icon.setNativeProps({opacity: i - value});
      }
    });
  },

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  },
});

module.exports = FacebookTabBar;
