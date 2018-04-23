import React from 'react';
import {
  AppRegistry,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { Container, Content, Header, Body, Title, Form, Item, Input, Button, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import { login } from '../actions/loginActions'

import styles from '../styles';

class LoginScreen extends React.Component {
static navigationOptions = ({ navigation }) => ({
    title: `Login`,
  });

  constructor(props) {
    super(props);

    this.state = {
        usernameOrEmail: '',
        password: '',
        errors: {}
    }

    this.login = this.login.bind(this);
  }

  login() {
      const { navigate } = this.props.navigation;

      this.props.login(this.state).then((res) => {
         navigate('User')
      }, (err) => {
         this.setState({
              errors: err.response.data.errors });
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    //var response = this.props.appData.data.data;
    //console.log(this.props.appData.data);
    return (
        <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
        <KeyboardAwareScrollView>
        <Container>
          <Header style={styles.header}>
              <Body>
                  <Title>Logowanie</Title>
              </Body>
          </Header>
          <Content>
              <View style={styles.center}>
                    <View style={styles.loginContainer}>
                       {this.state.errors.form ? <Text style={styles.error}>Błędna nazwa użytkownika lub hasło</Text> : null }
                       <Item regular style={styles.input}>
                          <Input name='usernameOrEmail' placeholder='Nazwa użytkownika lub email' onChangeText={(usernameOrEmail) => this.setState({usernameOrEmail, errors: { usernameOrEmail: ''}}) } />
                       </Item>
                       <Item regular style={styles.input}>
                          <Input name='password' placeholder='Hasło' secureTextEntry={true} onChangeText={(password) => this.setState({password, errors: { password: ''}}) } />
                       </Item>
                       <View>
                         <Button block style={{backgroundColor:'#b84476'}} onPress={() => this.login()}>
                            <Text>Zaloguj</Text>
                         </Button>
                         <Button transparent onPress={() => navigate('Signup')}>
                             <Text style={{color:'#b84476'}}>...lub załóż nowe konto</Text>
                         </Button>
                       </View>
                    </View>
            </View>
        </Content>
        </Container>
        </KeyboardAwareScrollView>
        </LinearGradient>
    );
  }
}

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (loginData) => dispatch(login(loginData))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(LoginScreen);
