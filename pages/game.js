import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Game extends Component {
    constructor(progs) {
        super(progs);
        this.state = {status: "Not Start", todo: "Start"}
    }
    render() {
        var actor = [];
        for (var i = 2; i < this.props.number+1; i++) {
            let key = "player"+i;
            actor.push(
                <View
                    key={key}
                    style={styles.actor}>
                    <Image
                        source={require('./img/actor.png')}
                        style={styles.actorPic}
                    />
                    <Text style={styles.actorName}>{i}. Passby</Text>
                </View>);
        }
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='never'>
                <View style={styles.roomNumber}>
                    <Text style={styles.textProgress}>Room Number:</Text>
                    <Text style={styles.textProgress}>{this.props.id}</Text>
                </View>
                <View style={styles.actors}>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/actor.png')}
                            style={styles.actorPic}
                        />
                        <Text style={styles.actorName}>1. {this.props.name}</Text>
                    </View>
                    {actor}
                </View>
                <View
                    style={styles.pregress}>
                    <Text style={styles.textProgress}>Progress:</Text>
                    <Text style={styles.textProgress}>{this.state.status}</Text>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.start()}>
                    <Text style={styles.text}>{this.state.todo}</Text>
                </TouchableOpacity>
            </ScrollView>

        );
    }

    async start() {
        try {
            // let response = await fetch(ServerAddress + '/rooms', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         room: this.state.input,
            //     })
            // });
            // let responseJson = await response.json();
            // console.log(this.state.input);6
        } catch (error) {
            console.error(JSON.stringify({
                room: this.state.input,
            }));
            console.error(error);
        }
    }
}

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 70,
    },
    roomNumber: {
        flex: 1,
        alignItems: 'center',
    },
    actors: {
        flex: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF'
    },
    actor: {
        marginLeft: width / 70,
        marginRight: width / 70,
        marginTop: 10,
    },
    actorPic: {
        width: width / 5,
        height: width / 5,
    },
    actorName: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    beforeStart:{
        opacity: 0,
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    },
    textProgress: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#000'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF'
    },

    btn: {
        alignSelf: 'stretch', //非常重要，覆盖父样式
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'coral',
        height: 40,
        borderRadius: 0,
        marginTop: 10
    },
});
