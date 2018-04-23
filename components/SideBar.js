import React from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, Button, Text, Icon, Header, Body, Title, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import EntypoIcon from 'react-native-vector-icons/Entypo';

import styles from '../styles';

class SideBar extends React.Component {
  render() {
    //const { navigate } = this.props.navigation;

    var userMenu = (
        <Content>
            <Button iconLeft full style={styles.sideBarButton} onPress={() => this.props.addPost()}>
              <Icon name='md-add-circle' />
              <Text>Dodaj post</Text>
            </Button>
        </Content>
    );

    var adminMenu = (
        <Content>
            <Button iconLeft full style={styles.sideBarButton} onPress={() => this.props.addPost()}>
              <Icon name='md-add-circle' />
              <Text>Dodaj post</Text>
            </Button>
            <Button iconLeft full style={styles.sideBarButton} onPress={() => this.props.addUser()}>
              <EntypoIcon name='add-user' style={styles.sideBarIcon} size={20} />
              <Text>Dodaj użytkownika</Text>
            </Button>
            <Button iconLeft full style={styles.sideBarButton}>
              <EntypoIcon name='remove-user' style={styles.sideBarIcon} size={20} />
              <Text>Usuń użytkownika</Text>
            </Button>
         </Content>
    );

    return (
      <Container style={styles.sideBarContainer}>
          <Header style={styles.sideBarHeader}>
              <Body>
                  <Title>Menu</Title>
              </Body>
              <Right>
                  <Button transparent onPress={() => this.props.close()}>
                     <Icon name='arrow-forward' />
                  </Button>
              </Right>
          </Header>
          {this.props.isAdmin ? adminMenu : userMenu}
      </Container>
    );
  }
}



export default SideBar;
