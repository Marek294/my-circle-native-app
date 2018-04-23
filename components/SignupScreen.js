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
import { signup } from '../actions/signupActions'

import styles from '../styles';

class SignupScreen extends React.Component {
static navigationOptions = ({ navigation }) => ({
    title: `Signup`,
  });

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
        disable: false
    }

    this.signup = this.signup.bind(this);
  }

  signup() {
      this.setState({ disable: true });

      const { navigate } = this.props.navigation;

      this.props.signup(this.state).then((res) => {
         navigate('User')
      }, (err) => {
         this.setState({
              errors: err.response.data,
              disable: false });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    //var response = this.props.appData.data.data;
    //console.log(this.props.appData.data);
    //{this.state.errors.form ? <Text style={styles.error}>Błędna nazwa użytkownika lub hasło</Text> : null }
    return (
        <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
        <KeyboardAwareScrollView>
        <Container>
        <Header style={styles.header}>
            <Body>
                <Title>Rejestracja</Title>
            </Body>
        </Header>
        <Content>
            <View style={styles.center}>
                <View style={styles.signupContainer}>
                  {this.state.errors.code == 'ER_DUP_ENTRY' ? <Text style={styles.error}>Istnieje użytkownik o podanej nazwie lub emailu</Text> : null}
                  {this.state.errors.username ? <Text style={styles.error}>{this.state.errors.username}</Text> : null }
                   <Item regular style={this.state.errors.username ? styles.inputError : styles.input}>
                      <Input name='username' placeholder='Nazwa użytkownika' onChangeText={(username) => this.setState({username, errors: { username: ''}}) } />
                   </Item>

                   {this.state.errors.email ? <Text style={styles.error}>{this.state.errors.email}</Text> : null }
                   <Item regular style={this.state.errors.email ? styles.inputError : styles.input}>
                      <Input name='username' placeholder='Adres email' onChangeText={(email) => this.setState({email, errors: { email: ''}}) } />
                    </Item>

                    {this.state.errors.password ? <Text style={styles.error}>{this.state.errors.password}</Text> : null }
                   <Item regular style={this.state.errors.password ? styles.inputError : styles.input}>
                      <Input name='password' placeholder='Hasło' secureTextEntry={true} onChangeText={(password) => this.setState({password, errors: { password: ''}}) } />
                   </Item>

                   {this.state.errors.confirmPassword ? <Text style={styles.error}>{this.state.errors.confirmPassword}</Text> : null }
                   <Item regular style={this.state.errors.confirmPassword ? styles.inputError : styles.input}>
                      <Input name='confirmPassword' placeholder='Potwierdź hasło' secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({confirmPassword, errors: { confirmPassword: ''}}) } />
                    </Item>

                   <View>
                   <Button block style={{backgroundColor:'#b84476'}} disabled={this.state.disable} onPress={() => this.signup()}>
                      <Text>Zarejestruj się</Text>
                   </Button>
                   <Button transparent style={styles.navigateButton} onPress={() => navigate('Login')}>
                       <Text style={{color:'#b84476'}}>...lub przejdź do logowania</Text>
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
    signup: (signupData) => dispatch(signup(signupData))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(SignupScreen);
