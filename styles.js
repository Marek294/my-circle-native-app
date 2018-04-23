import responsive from './responsive'

export default {
  container: {
      width: responsive.CARD_WIDTH,
      height: responsive.CARD_HEIGHT,
      padding: responsive.CARD_PADDING_X,
      paddingTop: responsive.CARD_PADDING_Y,
      paddingBottom: responsive.CARD_PADDING_Y,
      backgroundColor: 'white',
      borderRadius: 10
    },

  loginContainer: {
        width: responsive.CARD_WIDTH,
        height: responsive.CARD_HEIGHT*1.5,
        padding: responsive.CARD_PADDING_X,
        paddingTop: responsive.CARD_PADDING_Y*2,
        paddingBottom: responsive.CARD_PADDING_Y,
        marginTop: responsive.CARD_PADDING_Y*5,
        backgroundColor: 'white',
        borderRadius: 10
      },

  commentContainer: {
      width: responsive.CARD_WIDTH,
      height: responsive.CARD_HEIGHT,
      padding: responsive.CARD_PADDING_X,
      paddingTop: responsive.CARD_PADDING_Y*2,
      paddingBottom: responsive.CARD_PADDING_Y,
      marginTop: responsive.CARD_PADDING_Y*5,
      backgroundColor: 'white',
      borderRadius: 10
  },

  signupContainer: {
          width: responsive.CARD_WIDTH,
          height: responsive.CARD_HEIGHT*2.3,
          padding: responsive.CARD_PADDING_X,
          paddingTop: responsive.CARD_PADDING_Y*2,
          paddingBottom: responsive.CARD_PADDING_Y,
          marginTop: responsive.CARD_PADDING_Y*2,
          backgroundColor: 'white',
          borderRadius: 10
        },

  circlesContainer: {
          width: responsive.CARD_WIDTH,
          height: responsive.CARD_HEIGHT*2.2,
          padding: responsive.CARD_PADDING_X,
          paddingTop: responsive.CARD_PADDING_Y,
          paddingBottom: responsive.CARD_PADDING_Y,
          marginTop: responsive.CARD_PADDING_Y,
          backgroundColor: 'white',
          borderRadius: 10
        },

  postContainer: {
        width: responsive.CARD_WIDTH,
        padding: responsive.CARD_PADDING_X,
        paddingTop: responsive.CARD_PADDING_Y,
        paddingBottom: responsive.CARD_PADDING_Y,
        backgroundColor: 'white',
        borderRadius: 10
      },

  menuContainer: {
        width: responsive.CARD_WIDTH,
        height: responsive.CARD_HEIGHT,
        padding: responsive.CARD_PADDING_X,
        paddingTop: responsive.CARD_PADDING_Y,
        paddingBottom: responsive.CARD_PADDING_Y,
        marginTop: responsive.CARD_PADDING_X,
        backgroundColor: 'white',
        borderRadius: 10
      },

  usersContainer: {
    width: responsive.CARD_WIDTH,
    height: responsive.CARD_HEIGHT*2.2,
    padding: responsive.CARD_PADDING_X,
    paddingTop: responsive.CARD_PADDING_Y,
    paddingBottom: responsive.CARD_PADDING_Y,
    marginTop: responsive.CARD_PADDING_Y,
    backgroundColor: 'white',
    borderRadius: 10
  },

  postTitle: {
    textAlign: 'left',
    fontSize: responsive.FONT_SIZE_TITLE,
    fontWeight: 'bold',
  },

  titleAndDate: {
    marginLeft: responsive.CARD_PADDING_X*0.5,
  },

  titleAndUsername: {
    flexDirection: 'column',
    width: responsive.CARD_WIDTH*0.5
  },

  postHeader: {
    flexDirection: 'row',
    marginBottom: responsive.CARD_PADDING_Y,
  },

  postVotes: {
    textAlign: 'right',
    fontSize: responsive.FONT_SIZE_TITLE*1.2,
    fontWeight: 'bold',
  },

  removeButton: {
    alignSelf: 'flex-end',
  },

  postVotesInComments: {
      width: responsive.UNIT*3,
      textAlign: 'center',
      fontSize: responsive.FONT_SIZE_TITLE*1.2,
      fontWeight: 'bold',
    },

  votes: {
      marginTop: responsive.UNIT*2,
      marginLeft: responsive.UNIT*4.2,
      flexDirection: 'row',
      alignItems: 'center',
  },

  minus: {
      borderRadius: 50,
      marginRight: responsive.CARD_PADDING_X,
      width: responsive.UNIT*3,
      height: responsive.UNIT*3,
      opacity: 0.5
  },

  checkedMinus: {
        borderRadius: 50,
        marginRight: responsive.CARD_PADDING_X,
        width: responsive.UNIT*3,
        height: responsive.UNIT*3,
        opacity: 1
  },

  plus: {
      borderRadius: 50,
      marginLeft: responsive.CARD_PADDING_X,
      width: responsive.UNIT*3,
      height: responsive.UNIT*3,
      opacity: 0.5
  },

  checkedPlus: {
        borderRadius: 50,
        marginLeft: responsive.CARD_PADDING_X,
        width: responsive.UNIT*3,
        height: responsive.UNIT*3,
        opacity: 1
    },

  voteIcon: {
    color: 'white',
    padding: 0,
    margin: 0,
  },

  touchablePost: {
    borderRadius: 10,
    marginBottom: responsive.CARD_PADDING_Y,
  },

  postInComments: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: responsive.DEVICE_WIDTH,
    padding: responsive.CARD_PADDING_X,
    paddingTop: responsive.CARD_PADDING_Y,
    paddingBottom: responsive.CARD_PADDING_Y,
  },

  dateInComments: {
    fontSize: 10,
    textAlign: 'right',
    marginLeft: responsive.CARD_PADDING_X
  },

  commentTitle: {
    width: responsive.DEVICE_WIDTH
  },

  icon: {
      width: 26,
      height: 26,
  },

  linearGradient: {
      flex: 1
  },

  center:{
      alignItems: 'center'
  },

  homeLogo: {
    paddingTop: responsive.CARD_PADDING_Y + 20,
    paddingBottom: responsive.CARD_PADDING_Y + 20,
  },

  logo: {
      flex: 1,
      width: 150,
      height: 150,
      resizeMode: 'contain'
  },

  textCenter: {
    textAlign: 'center'
  },

  buttons: {
    paddingTop: responsive.CARD_PADDING_Y,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerList: {
      flexDirection: 'row',
      alignItems: 'center',
  },

  pinkColor: {
    color: '#b84476'
  },

  pinkIcon: {
      marginRight: responsive.UNIT,
      color: '#b84476'
  },

  listItem: {
    borderBottomWidth: 0,
    height: responsive.UNIT*4,
    marginTop: responsive.UNIT*0.2,
  },

  radioText: {
    marginLeft: responsive.UNIT,
    color: '#b84476'
  },

  addCircleButton: {
    backgroundColor:'#0d2c5a',
    marginTop: responsive.UNIT
  },

  addButton: {
    borderColor: '#b84476',
    borderWidth: 2,
    borderRadius: 10,
    width: responsive.CARD_WIDTH*0.8
  },

  pink: {
    backgroundColor: '#b84476'
  },

  login: {
      backgroundColor: '#b84476',
      marginRight: responsive.UNIT,
      flex: 1
  },

  signup: {
      backgroundColor: '#0d2c5a',
      flex: 1
  },

  blueColor: {
      color: '#0d2c5a'
    },

  header: {
    backgroundColor: '#0d2c5a'
  },

  tabNavHeader: {
    backgroundColor: '#b84476'
  },

  sideBarHeader: {
    backgroundColor: '#b84476'
  },

  sideBarButton: {
    backgroundColor: '#0d2c5a',
    borderColor: '#b84476',
    borderWidth: 0,
    borderBottomWidth: 2
  },

  sideBarContainer: {
    backgroundColor: '#b84476'
  },

  sideBarIcon: {
    marginRight: responsive.UNIT*0.7,
    color: 'white'
  },

  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsive.FONT_SIZE_TITLE*2,
    fontWeight: 'bold',
    marginTop: responsive.CARD_PADDING_Y*2,
    marginBottom: responsive.CARD_PADDING_Y*1.5
  },

  userText: {
      textAlign: 'center',
      color: 'white',
      fontSize: responsive.FONT_SIZE_TITLE*2,
      fontWeight: 'bold',
      marginTop: responsive.CARD_PADDING_Y*1.5,
      marginBottom: responsive.CARD_PADDING_Y*0.5
  },

  input: {
      marginBottom: responsive.UNIT
  },

  inputError: {
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: responsive.UNIT
  },

  error: {
    color: 'red',
    fontSize: 12,

  }
}
