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
import { addPost, getPosts, setPosts } from '../../actions/userActions'

import styles from '../../styles';

import socket from '../../socket';

class AddPostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      errors: {},
      disable: false
    };

    this.createPost = this.createPost.bind(this);
  }

  createPost() {
    this.setState({ disable: true });
    const id = this.props.navigation.state.params.id;
    const name = this.props.navigation.state.params.name;
    const { navigate } = this.props.navigation;

    var savePost = {
      circleId: id,
      title: this.state.title,
      content: this.state.content
    }

    this.props.addPost(savePost).then((res) => {
        this.props.getPosts(id, name).then(res => {
          this.props.setPosts(id, name, res.data);
       });
       navigate('CircleScreen');
       socket.emit('ADD_POST', res.data);
    }, (err) => {
       this.setState({
            errors: err.response.data });
    });

//    socket.on('SERVER_NEW_POST:'+id, function(data) {
//      console.log(data);
//    });
  }

  render() {
    const id = this.props.navigation.state.params.id;
    const name = this.props.navigation.state.params.name;
    const { navigate } = this.props.navigation;
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
          <Title>Dodaj Post</Title>
        </Body>
      </Header>
      <Content>
          <View style={styles.center}>
              <View style={styles.loginContainer}>
                 {this.state.errors.name ? <Text style={styles.error}>{this.state.errors.name}</Text> : null }
                 <Item regular style={styles.input}>
                    <Input name='title' placeholder='Tytuł' onChangeText={(title) => this.setState({title}) } />
                 </Item>
                 <Item regular style={styles.input}>
                   <Input name='content' placeholder='Treść' onChangeText={(content) => this.setState({content}) } />
                </Item>
                 <View>
                   <Button block style={{backgroundColor:'#0d2c5a'}} disabled={this.state.disable} onPress={() => this.createPost()}>
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
    circle: state.circle
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (postData) => dispatch(addPost(postData)),
    getPosts: (id) => dispatch(getPosts(id)),
    setPosts: (id, name, posts) => dispatch(setPosts(id, name, posts))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(AddPostScreen);
