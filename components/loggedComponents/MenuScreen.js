import React from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, Header, Body, Title, Button,  H1, H2, H3, Text, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import { getCurrentUser, getCircleList } from '../../actions/userActions'
import { logout } from '../../actions/loginActions'

//import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles';

class CirclesListScreen extends React.Component {
  static navigationOptions = {
      tabBarIcon: ({tinColor}) => (
          <Icon name={'ios-settings-outline'} size={26} style={{color: 'white'}} />
        )
    };
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    this.props.screenProps();
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
      <Container>
          <Header style={styles.header}>
              <Body>
                  <Title>Menu</Title>
              </Body>
          </Header>
          <Content>
            <View style={styles.center}>
              <View style={styles.menuContainer} >
                <Button iconLeft style={styles.pink} onPress={() => {this.logout()}}>
                    <Icon name='ios-log-out-outline' />
                    <Text>Wyloguj</Text>
                </Button>
              </View>
            </View>
          </Content>
      </Container>

      </LinearGradient>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect( null, mapDispatchToProps)(CirclesListScreen);
