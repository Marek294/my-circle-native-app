import React from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, Button,  H1, H2, H3, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles';

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <LinearGradient colors={['#b84476', '#0d2c5a']} start={{x: 0.0, y: 0.75}} end={{x: 0.6, y: 1.0}} style={styles.linearGradient}>
        <Grid style={styles.center}>
            <Row size={30} style={styles.homeLogo}>
            <Image
                style={styles.logo}
                source={require('../images/myCircle_logo.png')}
            />
            </Row>
            <Row size={70}>
                <View style={styles.container} >
                  <Text style={styles.textCenter}>Zarejestruj się,</Text>
                  <Text style={styles.textCenter}>aby przeglądać i tworzyć kręgi.</Text>
                  <View style={styles.buttons} >
                    <Button block style={styles.login} onPress={() => navigate('Login')}>
                         <Text>Logowanie</Text>
                    </Button>
                    <Button block style={styles.signup} onPress={() => navigate('Signup')}>
                         <Text>Rejestracja</Text>
                    </Button>
                  </View>
                </View>
            </Row>
        </Grid>
     </LinearGradient>
    );
  }
}

export default HomeScreen;
