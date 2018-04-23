import React from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, List, ListItem, Header, Body, Title, Icon, Button, Text, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import EntypoIcon from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux'
import { removeUserFromCircle, stopFetch } from '../../actions/userActions'

import styles from '../../styles';

class RemoveUserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loader: this.props.circle.isFetching,
      circleId: this.props.circle.id,
      disable: false,
    }

    this.removeUser = this.removeUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.circle.usersInCircle,
      loader: nextProps.circle.isFetching,
    })
  }

  removeUser(userId) {
    this.setState({ disable: true });

    const { navigate } = this.props.navigation;

    this.props.removeUserFromCircle(userId, this.state.circleId).then(res => {
      this.props.stopFetch();
      navigate('CircleScreen');
    })

  }

  render() {
    const { navigate } = this.props.navigation;

    var users = this.state.users.map((user,index) => {
      return (
          <ListItem key={index} style={styles.listItem}>
            <Button iconLeft transparent style={{backgroundColor: 'white'}} disabled={this.state.disable} onPress={() => this.removeUser(user.id)}>
                <EntypoIcon name="add-user" style={styles.pinkIcon}/>
                <Text style={styles.blueColor}>{user.username}</Text>
            </Button>
          </ListItem>
      )
    })

    return (
      <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
      <Container>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigate('CircleScreen')}>
            <Icon name="md-return-left"/>
          </Button>
        </Left>
        <Body>
          <Title>Usuń Użytkownika</Title>
        </Body>
      </Header>
      <Content>
          <View style={styles.center}>
              <View style={styles.usersContainer}>
                <Container>
                    <View style={styles.headerList}>
                      <EntypoIcon name="users" style={styles.pinkIcon}/>
                      <Text style={styles.pinkColor}>Dostępni użytkownicy:</Text>
                    </View>
                    {this.state.loader ? <ActivityIndicator animating={this.state.loader} style={{height: 80}} size="large" /> :
                         <Content>
                            <List>
                              {users}
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
    circle: state.circle
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removeUserFromCircle: (userId, circleId) => dispatch(removeUserFromCircle(userId, circleId)),
    stopFetch: () => dispatch(stopFetch())
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(RemoveUserScreen);
