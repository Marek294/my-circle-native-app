import React from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Title, Left, List, ListItem, Text, Button, Icon, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux'
import { getCurrentUser, getCircleListInterval, setCircles } from '../../actions/userActions'

import styles from '../../styles';

//import io from "socket.io-client/dist/socket.io";
import socket from '../../socket';

class CirclesListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.auth.user.username,
      circles: this.props.circleList.circles,
      loader: this.props.circleList.isFetching
    }

    this.circle = this.circle.bind(this);

    //this.socket = io('http://192.168.0.150:3000', {jsonp: false});
    //this.socket = socket;

  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        circles: nextProps.circleList.circles,
        loader: nextProps.circleList.isFetching
      })
    }

  circle(id, name) {
    this.props.screenProps(id,name);
  }

  addCircle() {
    const { navigate } = this.props.navigation;

    navigate('AddCircle');
  }

  render() {
    var circles = this.state.circles.map((circle,index) => {
      return (
          <ListItem key={index} style={styles.listItem}>
            <Button iconLeft transparent onPress={() => this.circle(circle.id, circle.name)}>
                <FontAwesomeIcon name="circle-o" style={styles.pinkIcon}/>
                <Text style={styles.blueColor}>{circle.name}</Text>
            </Button>
          </ListItem>
      )
    });

    return (
      <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
      <Container>
      <Header style={styles.header}>
          <Body>
              <Title>Witaj {this.state.username}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.addCircle()}>
              <Icon name="md-add-circle"/>
            </Button>
          </Right>
      </Header>
      <Content>
          <View style={styles.center}>
              <View style={styles.circlesContainer} >
                <Container>
                    <View style={styles.headerList}>
                      <Icon name="md-list-box" style={styles.pinkIcon}/>
                      <Text style={styles.pinkColor}>Dostępne kręgi:</Text>
                    </View>
                    {this.state.loader ? <ActivityIndicator animating={this.state.loader} style={{height: 80}} size="large" /> :
                   <Content>
                      <List>
                        {circles}
                      </List>
                   </Content>
                   }
                </Container>
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
    auth: state.auth,
    circleList: state.circleList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
    getCircleListInterval: () => dispatch(getCircleListInterval()),
    setCircles: (circles) => dispatch(setCircles(circles))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CirclesListScreen);
