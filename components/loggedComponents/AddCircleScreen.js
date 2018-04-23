import React from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Title, Left, List, ListItem, Text, Button, Icon, Radio, Item, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import { addCircle, getCircleList, setCircles } from '../../actions/userActions'

import styles from '../../styles';


class AddCircleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isPublic: true,
      errors: {},
      disable: false
    };

    this.createCircle = this.createCircle.bind(this);

  }

  createCircle() {
    this.setState({ disable: true });

    const { navigate } = this.props.navigation;

//    socket.on('SERVER_ADD_CIRCLE', function() {
//              console.log('Chodza sluchy ze dodano krąg');
//            });

    this.props.addCircle(this.state).then((res) => {
             this.props.getCircleList().then(res => {
                this.props.setCircles(res.data);
             });
             navigate('CirclesList')
          }, (err) => {
             this.setState({
                  errors: err.response.data });
          });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
      <Container>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigate('CirclesList')}>
            <Icon name="md-return-left"/>
          </Button>
        </Left>
        <Body>
          <Title>Dodaj krąg</Title>
        </Body>
      </Header>
      <Content>
          <View style={styles.center}>
              <View style={styles.loginContainer}>
                 {this.state.errors.name ? <Text style={styles.error}>{this.state.errors.name}</Text> : null }
                 <Item regular style={styles.input}>
                    <Input name='name' placeholder='Nazwa kręgu' onChangeText={(name) => this.setState({name}) } />
                 </Item>
                 <Button transparent onPress={() => this.setState({ isPublic: true })}>
                    <Radio selected={this.state.isPublic}/>
                    <Text style={styles.radioText}>Publiczny</Text>
                 </Button>
                 <Button transparent onPress={() => this.setState({ isPublic: false })}>
                  <Radio selected={!this.state.isPublic}/>
                  <Text style={styles.radioText}>Prywatny</Text>
                 </Button>
                 <View>
                   <Button block style={styles.addCircleButton} disabled={this.state.disable} onPress={() => this.createCircle()}>
                      <Text>Utwórz</Text>
                   </Button>
                 </View>
              </View>
          </View>
      </Content>
      </Container>
      </LinearGradient>
    );
  }
}

function mapStateToProps (state) {
  return {
    appData: state.appData,
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCircle: (circleData) => dispatch(addCircle(circleData)),
    getCircleList: () => dispatch(getCircleList()),
    setCircles: (circles) => dispatch(setCircles(circles))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(AddCircleScreen);
