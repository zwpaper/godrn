'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    AppRegistry,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import Start from './pages/start';
import Game from './pages/game';
import CreateRoom from './pages/createRoom';

export default class godOfWerewolves extends Component {
    render() {
        return (
            <Router navigationBarStyle={styles.navBar}>
                <Scene key="root">
                    <Scene key="Start" component={Start} title="God" initial={true}/>
                    <Scene key="Game" component={Game} title="Game"/>
                    <Scene key="CreateRoom" component={CreateRoom} title="CreateRoom"/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'deepskyblue' // changing navbar color
    }
});

AppRegistry.registerComponent('godOfWerewolves', () => godOfWerewolves);
