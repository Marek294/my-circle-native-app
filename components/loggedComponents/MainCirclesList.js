import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import CirclesListScreen from './CirclesListScreen';
import AddCircleScreen from './AddCircleScreen';

import { Icon } from 'native-base';

import { connect } from 'react-redux'
import { getPosts, setPosts, userIsAdmin, setUserIsAdmin } from '../../actions/userActions'


import styles from '../../styles';

const CirclesList = DrawerNavigator({
  CirclesList: {
    screen: CirclesListScreen,
  },
  AddCircle: {
    screen: AddCircleScreen,
  }
});

class MainCirclesList extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({tinColor}) => (
            <Icon name={'ios-color-filter-outline'} size={26} style={{color: 'white'}} />
          )
      };
  constructor(props) {
      super(props);
  }

  circle(id, name) {
    const { navigate } = this.props.navigation;

    this.props.getPosts(id).then(res => {
        this.props.setPosts(id, name, res.data);
     });

     this.props.userIsAdmin(id).then(res => {
        this.props.setUserIsAdmin(res.data);
     });


    navigate('Circle')
  }

  render() {
    return (
        <CirclesList screenProps={(id,name) => this.circle(id,name)}/>
    );
  }
}

//export default MainCirclesList;

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (id) => dispatch(getPosts(id)),
    setPosts: (id, name, posts) => dispatch(setPosts(id, name, posts)),
    userIsAdmin: (id) => dispatch(userIsAdmin(id)),
    setUserIsAdmin: (data) => dispatch(setUserIsAdmin(data))
  }
}

export default connect( null, mapDispatchToProps)(MainCirclesList);
