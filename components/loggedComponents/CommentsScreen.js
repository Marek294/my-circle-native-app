import React from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  View,
  Text,
  Alert,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, List, ListItem, Header, Body, Title, Icon, Button, Left, Right, ActionSheet, Thumbnail, Radio} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import EntypoIcon from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux'
import { getVote, setVote, getPosts, setPosts, deletePost, deleteComment, getComments, setComments } from '../../actions/userActions'

import styles from '../../styles';

class CommentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.circle.post,
      commentaries: this.props.circle.commentaries,
      vote: '',
      loader: this.props.circle.isFetching,
      userIsAdmin: this.props.circle.isAdmin
    }

    this.props.getVote(this.props.circle.post.id).then(res => {
      if(res.data) {
        this.setState({
          vote: res.data.type
        })
      } else {
        this.setState({
          vote: ''
        })
      }
    })

    this.minus = this.minus.bind(this);
    this.plus = this.plus.bind(this);
    this.goBack = this.goBack.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        post: nextProps.circle.post,
        commentaries: nextProps.circle.commentaries,
        loader: nextProps.circle.isFetching,
        userIsAdmin: nextProps.circle.isAdmin
      });

      this.props.getVote(nextProps.circle.post.id).then(res => {
        if(res.data) {
          this.setState({
            vote: res.data.type
          })
        } else {
          this.setState({
            vote: ''
          })
        }
      })
    }

  minus() {
    var sendObject = {
      postId: this.state.post.id,
      voteType: 'minus'
    }

    this.props.setVote(sendObject).then(res => {
      var post = res.data;
      post.username = this.state.post.username;

      if(this.state.vote == 'minus') {
        this.setState({
          vote: '',
          post: post
        });
      } else {
        this.setState({
          vote: 'minus',
          post: post
        });
      }
    });
  }

  plus() {
    var sendObject = {
      postId: this.state.post.id,
      voteType: 'plus'
    }

    this.props.setVote(sendObject).then(res => {
        var post = res.data;
        post.username = this.state.post.username;

        if(this.state.vote == 'plus') {
          this.setState({
            vote: '',
            post: post
          });
        } else {
          this.setState({
            vote: 'plus',
            post: post
          });
        }
    });
  }

  goBack() {
    const { navigate } = this.props.navigation;

    this.props.getPosts(this.props.circle.id).then(res => {
        this.props.setPosts(this.props.circle.id, this.props.circle.name, res.data);
     });

     navigate('CircleScreen')
  }

  addComment() {
    const { navigate } = this.props.navigation;

    navigate('AddCommentScreen', {postId: this.state.post.id});
  }

  deletePostAlert() {
        Alert.alert( 'Usuń post', 'Jesteś pewien, że chcesz usunąć permanentnie ten post?',
         [ {text: 'Nie'},
           {text: 'Tak', onPress: () => this.deletePost()} ],
            { cancelable: false });
    }

  deletePost() {
      const { navigate } = this.props.navigation;

      this.props.deletePost(this.state.post.id).then(res => {
        this.props.getPosts(this.props.circle.id).then(res => {
            this.props.setPosts(this.props.circle.id, this.props.circle.name, res.data);
         });
      });

      navigate('CircleScreen');

  }

  deleteCommentAlert(commentId) {
    Alert.alert( 'Usuń komentarz', 'Jesteś pewien, że chcesz usunąć permanentnie ten komentarz?',
             [ {text: 'Nie'},
               {text: 'Tak', onPress: () => this.deleteComment(commentId)} ],
                { cancelable: false });
  }

  deleteComment(commentId) {
    this.props.deleteComment(commentId).then(res => {
        this.props.getComments(this.state.post.id).then(res=> {
            this.props.setComments(res.data.post, res.data.commentaries);
        });
    });
  }

  render() {
    var date = new Date(this.state.post.created_at);
    var stringDate = printDate(date);

    var commentaries = this.state.commentaries;

    commentaries.sort(function(a, b){
            var keyA = new Date(a.created_at),
                keyB = new Date(b.created_at);
            // Compare the 2 dates
            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
        });

    var comments = commentaries.map((comment,index) => {
        var commentDate = new Date(comment.created_at);
        var commentStringDate = printDate(commentDate);

        return (
          <ListItem key={index} style={styles.postInComments}>
              <View>
                <View style={styles.postHeader}>
                  <Icon name="md-paper" />
                  <View style={styles.titleAndDate}>
                    <View style={styles.titleAndUsername}>
                      <Text>{comment.username}</Text>
                    </View>
                  </View>
                  <Text style={styles.dateInComments}>{commentStringDate}</Text>
                </View>
                <Text>{comment.content}</Text>
                { this.props.auth.user.id == comment.user_id || this.state.userIsAdmin ?
                <View>
                  <Button transparent danger icon style={styles.removeButton} onPress={() => this.deleteCommentAlert(comment.id)}>
                    <Icon name="md-remove-circle" />
                  </Button>
                </View> : null
                }
              </View>
          </ListItem>
        );
    });

    var noComments = (
    <ListItem style={styles.postInComments}>
        <View>
          <Text style={styles.commentTitle}>Brak komentarzy</Text>
        </View>
    </ListItem>
    )

    var OPTIONS = this.state.userIsAdmin ? [
      'Dodaj komentarz',
      'Usuń post'
    ] :
    [
      'Dodaj komentarz'
    ];

    var DESTRUCTIVE_INDEX = 1;

    return (
     <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
     {this.state.loader ? <ActivityIndicator animating={this.state.loader} style={{height: 80}} size="large" /> :
     <Container>
     <Header style={styles.header}>
       <Left>
         <Button transparent onPress={() => this.goBack()}>
           <Icon name="md-return-left"/>
         </Button>
       </Left>
       <Body>
         <Title>{this.state.post.title}</Title>
       </Body>
       <Right>
         <Button transparent onPress={()=> ActionSheet.show(
          {
            options: OPTIONS,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            title: 'Menu'
          },
          (buttonIndex) => {
            if(this.state.userIsAdmin) {
               if(buttonIndex == 0) this.addComment();
               if(buttonIndex == 1) this.deletePostAlert();
            } else {
               if(buttonIndex == 0) this.addComment();
            }
          }
          )}>
            <Icon name="md-menu"/>
          </Button>
       </Right>
     </Header>
     <Content>
     <View>
        <List>
        <ListItem style={styles.postInComments}>
            <View>
              <View style={styles.postHeader}>
                <Icon name="md-paper" />
                <View style={styles.titleAndDate}>
                  <View style={styles.titleAndUsername}>
                    <Text>{this.state.post.username}</Text>
                  </View>
                </View>
                <Text style={styles.dateInComments}>{stringDate}</Text>
              </View>
              <Text>{this.state.post.content}</Text>



            </View>
        </ListItem>
        <ListItem itemDivider>
          <Text style={styles.commentTitle}>Komentarze</Text>
        </ListItem>
        {comments.length ? comments : noComments}
        </List>
     </View>
     </Content>
     </Container>
     }
     </LinearGradient>
    );
  }
}

              /*<View style={[styles.votes,styles.center]}>
                <Button iconLeft danger style={this.state.vote == 'minus' ? styles.checkedMinus : styles.minus} onPress={() => this.minus()}>
                  <EntypoIcon name='minus' size={10} style={styles.voteIcon} />
                </Button>
                <Text style={[
                      styles.postVotesInComments,
                      this.state.post.vote_summary > 0 ? {color: 'green'} : null,
                      this.state.post.vote_summary < 0 ? {color: 'red'} : null
                      ]}>{this.state.post.vote_summary}</Text>
                <Button iconLeft success style={this.state.vote == 'plus' ? styles.checkedPlus : styles.plus} onPress={() => this.plus()}>
                  <EntypoIcon name='plus' size={10} style={styles.voteIcon} />
                </Button>
              </View>*/

function printDate(date) {
    return  padStr(date.getDate()) + '.' +
            padStr(1 + date.getMonth()) + '.' +
            padStr(date.getFullYear()) + ' ' +
            padStr(date.getHours()) + ':' +
            padStr(date.getMinutes()) + ':' +
            padStr(date.getSeconds());
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function mapStateToProps (state) {
  return {
    circle: state.circle,
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getVote: (postId) => dispatch(getVote(postId)),
    setVote: (voteObject) => dispatch(setVote(voteObject)),
    getPosts: (id) => dispatch(getPosts(id)),
    setPosts: (id, name, posts) => dispatch(setPosts(id, name, posts)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    getComments: (postId) => dispatch(getComments(postId)),
    setComments: (post, commentaries) => dispatch(setComments(post, commentaries)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CommentsScreen);
