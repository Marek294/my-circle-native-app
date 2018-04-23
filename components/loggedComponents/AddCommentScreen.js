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
import { addComment, getComments, setComments } from '../../actions/userActions'

import styles from '../../styles';

class AddCommentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      errors: {},
      disable: false
    };

    this.createComment = this.createComment.bind(this);
  }

  createComment() {
    this.setState({ disable: true });

    const { navigate } = this.props.navigation;
    const postId = this.props.navigation.state.params.postId;

    var saveComment = {
      postId: postId,
      content: this.state.content
    }

    console.log(saveComment);

    this.props.addComment(saveComment).then((res) => {
        this.props.getComments(postId).then(res=> {
            this.props.setComments(res.data.post, res.data.commentaries);
        });
       navigate('CommentsScreen')
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
          <Button transparent onPress={() => navigate('CommentsScreen')}>
            <Icon name="md-return-left"/>
          </Button>
        </Left>
        <Body>
          <Title>Dodaj Komentarz</Title>
        </Body>
      </Header>
      <Content>
          <View style={styles.center}>
              <View style={styles.commentContainer}>
                 {this.state.errors.content ? <Text style={styles.error}>{this.state.errors.content}</Text> : null }
                 <Item regular style={styles.input}>
                   <Input name='content' placeholder='Treść' onChangeText={(content) => this.setState({content}) } />
                </Item>
                 <View>
                   <Button block style={{backgroundColor:'#0d2c5a'}} disabled={this.state.disable} onPress={() => this.createComment()}>
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
    addComment: (commentData) => dispatch(addComment(commentData)),
    getComments: (postId) => dispatch(getComments(postId)),
    setComments: (post, commentaries) => dispatch(setComments(post, commentaries))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(AddCommentScreen);
