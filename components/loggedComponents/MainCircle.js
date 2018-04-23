import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import CircleScreen from './CircleScreen';
import AddPostScreen from './AddPostScreen';
import AddUserScreen from './AddUserScreen';
import CommentsScreen from './CommentsScreen';
import AddCommentScreen from './AddCommentScreen';
import RemoveUserScreen from './RemoveUserScreen';

import { Icon } from 'native-base';


import styles from '../../styles';

const Circle = DrawerNavigator({
  CircleScreen: {
    screen: CircleScreen,
  },
  CommentsScreen: {
      screen: CommentsScreen
    },
  AddPost: {
    screen: AddPostScreen,
  },
  AddUser: {
    screen: AddUserScreen
  },
  RemoveUser: {
      screen: RemoveUserScreen
  },
  AddCommentScreen: {
    screen: AddCommentScreen
  }
});

class MainCircle extends React.Component {
    static navigationOptions = {
          tabBarIcon: ({tinColor}) => (
              <Icon name={'ios-clipboard-outline'} size={26} style={{color: 'white'}} />
            )
        };
  constructor(props) {
      super(props);

      this.state = {
        id: 0,
        name: ''
      }
    }

    componentWillReceiveProps(nextProps) {
    const id = nextProps.navigation.state.params.id;
    const name = nextProps.navigation.state.params.name;

     this.setState({
        id: id,
        name: name
     })
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Circle screenProps={() => navigate('Home')}/>
    );
  }
}

//<Circle screenProps={this.state} />

export default MainCircle;
