import React from 'react'
import { AppRegistry } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux'

import { Container, Content, ListItem, Text, CheckBox, Header, Button, Left, Icon, Body, Title, Image, Root } from 'native-base';

import Drawer from 'react-native-drawer'

import configureStore from './configureStore'

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import MainUser from './components/loggedComponents/MainUser';
import SideBar from './components/SideBar';

import styles from './styles';

const store = configureStore();

const App = DrawerNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  User: { screen: MainUser }
});

console.disableYellowBox = true;

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
      this.refs.drawer.close()
  }

  open() {
      this.refs.drawer.open()
  }

  render() {

    return (
       <Provider store={store}>
            <Root>
                <App />
            </Root>
        </Provider>

      )
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 15}
}

export default RootComponent;
