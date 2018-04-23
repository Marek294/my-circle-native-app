import React from 'react';
import { TabNavigator } from 'react-navigation';

import MainCirclesList from './MainCirclesList';
import MainCircle from './MainCircle';
import MenuScreen from './MenuScreen';
import Screen from './MenuScreen';

import styles from '../../styles';

import { connect } from 'react-redux'
import { getCircleList, setCircles } from '../../actions/userActions'

const UserApp = TabNavigator({
  Home: {
    screen: MainCirclesList,
  },
  Circle: {
    screen: MainCircle,
  },
  Menu: {
      screen: MenuScreen,
    }
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    upperCaseLabel: false,
    activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#b84476',
        borderBottomWidth: 1
      },
  },
});

class MainUser extends React.Component {
  constructor(props) {
      super(props);

      this.logout = this.logout.bind(this);
  }

   componentWillMount() {
     this.props.getCircleList().then(res => {
        this.props.setCircles(res.data);
     });
  }

  logout() {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  render() {
    return (
        <UserApp screenProps={() => this.logout()}/>
    );
  }
}

//export default MainUser;

function mapDispatchToProps (dispatch) {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
    getCircleList: () => dispatch(getCircleList()),
    setCircles: (circles) => dispatch(setCircles(circles))
  }
}

export default connect( null, mapDispatchToProps)(MainUser);

