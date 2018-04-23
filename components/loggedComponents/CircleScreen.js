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
import { Container, Content, List, ListItem, Header, Body, Title, Icon, Button, Left, Right, ActionSheet} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

//import Drawer from 'react-native-drawer'

import { connect } from 'react-redux'
import { getPosts, setPosts, getUsersNotInCircle, setUsersNotInCircle, setError, getComments, setComments, getCircleList, setCircles, leaveCircle, getUsersInCircle, setUsersInCircle, deleteCircle, stopFetch, pushPost } from '../../actions/userActions'

//import SideBar from '../SideBar';

import styles from '../../styles';

import socket from '../../socket';

class CircleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: this.props.circle.id,
        name: this.props.circle.name,
        posts: this.props.circle.posts,
        loader: this.props.circle.isFetching,
        userIsAdmin: this.props.circle.isAdmin
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showComments = this.showComments.bind(this);
    this.leaveCircle = this.leaveCircle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    socket.removeAllListeners('SERVER_NEW_POST:'+this.state.id);

    this.setState({
      id: nextProps.circle.id,
      name: nextProps.circle.name,
      posts: nextProps.circle.posts,
      loader: nextProps.circle.isFetching,
      userIsAdmin: nextProps.circle.isAdmin
    })

    //console.log(nextProps.circle.id);
    socket.on('SERVER_NEW_POST:'+nextProps.circle.id, (data) => {
          // console.log(data);
          this.props.pushPost(data);
        });
  }

  closeMenu() {
      this.refs.drawer.close()
  }

  openMenu() {
      this.refs.drawer.open();
  }

  addUser() {
      const { navigate } = this.props.navigation;

      this.props.getUsersNotInCircle(this.state.id).then(res=> {
          this.props.setUsersNotInCircle(res.data);
      }, (err) => {
          this.props.setError(err.response.data.errors);
      });

      navigate('AddUser');
  }

  removeUser() {
        const { navigate } = this.props.navigation;

        this.props.getUsersInCircle(this.state.id).then(res=> {
            this.props.setUsersInCircle(res.data);
        }, (err) => {
            this.props.setError(err.response.data.errors);
        });

        navigate('RemoveUser');
    }

  addPost() {
      const { navigate } = this.props.navigation;

      navigate('AddPost',{ id: this.state.id, name: this.state.name });
  }

  showComments(postId) {
      const { navigate } = this.props.navigation;

      this.props.getComments(postId).then(res=> {
          this.props.setComments(res.data.post, res.data.commentaries);
      });

      navigate('CommentsScreen');
  }

  showAlert() {
    Alert.alert( 'Opuść krąg', 'Jesteś pewien, że chcesz opuścić ten krąg?',
     [ {text: 'Nie'},
       {text: 'Tak', onPress: () => this.leaveCircle()} ],
        { cancelable: false });
  }

  leaveCircle() {
      this.props.leaveCircle(this.state.id).then(res => {
        this.props.getCircleList().then(res => {
            this.props.setCircles(res.data);
            this.props.screenProps();
         });
      })
  }

  deleteAlert() {
      Alert.alert( 'Usuń krąg', 'Jesteś pewien, że chcesz usunąć permanentnie ten krąg?',
       [ {text: 'Nie'},
         {text: 'Tak', onPress: () => this.deleteCircle()} ],
          { cancelable: false });
  }

  deleteCircle() {
      this.props.deleteCircle(this.state.id).then(res => {
        this.props.getCircleList().then(res => {
            console.log(res.data);
            this.props.setCircles(res.data);

            this.props.stopFetch();

            this.props.screenProps();
         });
      })
  }

  render() {

    var posts = this.state.posts;

    posts.sort(function(a, b){
        var keyA = new Date(a.created_at),
            keyB = new Date(b.created_at);
        // Compare the 2 dates
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
    });
    var posts = posts.map((post,index) => {
          var date = new Date(post.created_at);
          var stringDate = printDate(date);
          return (
              <ListItem key={index}>
                <TouchableHighlight style={styles.touchablePost} onPress={() => this.showComments(post.id)}>
                <View style={styles.postContainer}>
                  <View style={styles.postHeader}>
                    <Icon name="md-paper" />
                    <View style={styles.titleAndDate}>
                      <View style={styles.titleAndUsername}>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text>{post.username}</Text>
                      </View>
                    </View>
                    <Text style={{fontSize: 10, textAlign: 'right'}}>{stringDate}</Text>
                  </View>
                  <Text>{post.content}</Text>



                </View>
                </TouchableHighlight>
              </ListItem>
          )
        });

/*<View>
                    <Text style={[
                          styles.postVotes,
                          post.vote_summary > 0 ? {color: 'green'} : null,
                          post.vote_summary < 0 ? {color: 'red'} : null
                          ]}>{post.vote_summary}</Text>
                  </View>*/

    var noPosts = (
      <ListItem>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Icon name="ios-sad-outline" />
            <View style={styles.titleAndDate}>
              <View style={styles.titleAndUsername}>
                <Text style={styles.postTitle}>Brak postów</Text>
              </View>
            </View>
          </View>
          <Text>Wróć później bądź dodaj nowy post!</Text>
        </View>
      </ListItem>
    )

    var noCircle = (
      <ListItem>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Icon name="ios-sad-outline" />
            <View style={styles.titleAndDate}>
              <View style={styles.titleAndUsername}>
                <Text style={styles.postTitle}>Nie wybrano kręgu</Text>
              </View>
            </View>
          </View>
          <Text>Wybierz krąg z listy dostępnych kręgów bądź utwórz nowy krąg</Text>
        </View>
      </ListItem>
    )

    var noCircleHeader = (
      <Header style={styles.header}>
        <Body>
          <Title>Wybierz krąg</Title>
        </Body>
      </Header>
    )

    var OPTIONS = this.state.userIsAdmin ? [
      'Dodaj post',
      'Dodaj użytkownika do kręgu',
      'Usuń użytkownika z kręgu',
      'Opuść krąg',
      'Usuń krąg'
    ] :
    [
      'Dodaj post',
      'Opuść krąg'
    ];

    var DESTRUCTIVE_INDEX = 4;


    var circleHeader = (
      <Header style={styles.header}>
        <Body>
            <Title>{this.state.name}</Title>
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
                   if(buttonIndex == 0) this.addPost();
                   if(buttonIndex == 1) this.addUser();
                   if(buttonIndex == 2) this.removeUser();
                   if(buttonIndex == 3) this.showAlert();
                   if(buttonIndex == 4) this.deleteAlert();
                } else {
                   if(buttonIndex == 0) this.addPost();
                   if(buttonIndex == 1) this.showAlert();
                }
              }
              )}>
                <Icon name="md-menu"/>
          </Button>
        </Right>
      </Header>
    )

    return (
     <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
     <View style={styles.center}>
       {this.state.loader ? <ActivityIndicator animating={this.state.loader} style={{height: 80}} size="large" /> :
       <View>
       <Container>
           {this.state.name ? circleHeader : noCircleHeader}
           <Content>
             <List>
                 {posts.length ? posts : this.state.name? noPosts : noCircle}
             </List>
           </Content>
       </Container>
       </View>
       }
     </View>
     </LinearGradient>
    );
  }
}

//const drawerStyles = {
//  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 15}
//}

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
    circle: state.circle
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (id) => dispatch(getPosts(id)),
    setPosts: (id, name, posts) => dispatch(setPosts(id, name, posts)),
    getUsersNotInCircle: (circleId) => dispatch(getUsersNotInCircle(circleId)),
    setUsersNotInCircle: (users) => dispatch(setUsersNotInCircle(users)),
    setError: (errors) => dispatch(setError(errors)),
    getComments: (postId) => dispatch(getComments(postId)),
    setComments: (post, commentaries) => dispatch(setComments(post, commentaries)),
    getCircleList: () => dispatch(getCircleList()),
    setCircles: (circles) => dispatch(setCircles(circles)),
    leaveCircle: (circleId) => dispatch(leaveCircle(circleId)),
    getUsersInCircle: (circleId) => dispatch(getUsersInCircle(circleId)),
    setUsersInCircle: (users) => dispatch(setUsersInCircle(users)),
    deleteCircle: (circleId) => dispatch(deleteCircle(circleId)),
    stopFetch: () => dispatch(stopFetch()),
    pushPost: (data) => dispatch(pushPost(data))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CircleScreen);



//    <Drawer
//     ref='drawer'
//     type='overlay'
//     side='right'
//     content={<SideBar close={() => this.closeMenu()} addUser={() => this.addUser()} addPost={() => this.addPost()} isAdmin={this.state.userIsAdmin} />}
//     openDrawerOffset={100}
//     tapToClose={true}
//     acceptPan={false}
//     styles={drawerStyles}
//     >
