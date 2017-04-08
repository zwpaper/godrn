import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button, TouchableHighlight
} from 'react-native';
import {getUniqueID} from "react-native-device-info";
import {Actions} from 'react-native-router-flux';

export default class Game extends Component {
    constructor(progs) {
        super(progs);
        this.state = {status: "Not Start", todo: "Start", user: "Not in", actors: [], number: 0};
        if (!this.enterRoom(this.props.room_id)) {
            Actions.pop();
        }
    }

    render() {
        var actorList = [];
        this.state.actors.forEach((value, index) => {
            let key = index + 1;
            actorList.push(
                <View
                    key={key}
                    style={styles.actor}>
                    <TouchableHighlight
                        style={styles.actorPic}>
                        <Text style={styles.actorPicText}>{index + 1}</Text>
                    </TouchableHighlight>
                    <Text style={styles.actorName}>{value.Name}</Text>
                </View>);
        });
        for (var i = this.state.actors.length; i < this.state.number; i++) {
            let key = "player" + i;
            actorList.push(
                <View
                    key={key}
                    style={styles.actor}>
                    <TouchableHighlight
                        style={styles.actorPic}>
                        <Text style={styles.actorPicText}>{i + 1}</Text>
                    </TouchableHighlight>
                    <Text style={styles.actorName}>{this.state.user}</Text>
                </View>);
        }

        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='never'>
                <View style={styles.roomNumber}>
                    <Text style={styles.textProgress}>Room Number:</Text>
                    <Text style={styles.textProgress}>{this.props.room_id}</Text>
                </View>
                <View style={styles.actors}>
                    {actorList}
                </View>
                <View
                    style={styles.progress}>
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

    enterRoom(number) {
        if (number === "" || number === null) {
            Alert.alert("No Room number provided", "Please input a number");
            return
        }
        try {
            const CONST_DATA = require("./global.js");
            let ws = new WebSocket(CONST_DATA.WEB_SOCKET_URL + '/room/' + number + "/player");
            ws.onopen = () => {
                // connection opened
                ws.send(JSON.stringify({
                    op: "enter",
                    uid: getUniqueID().replace(/-/g, ""),
                    name: this.props.name,
                    room_id: number,
                })); // send a message
            };
            ws.onmessage = (e) => {
                // a message was received
                let responseJson = JSON.parse(e.data);
                this.setState({number: responseJson.number, id: responseJson.room_id, actors: responseJson.players});
            };
            ws.onerror = (e) => {
                // an error occurred
                console.log(e.message);
            };
            ws.onclose = (e) => {
                // connection closed
                console.log(e.code, e.reason);
            };

            return true
        } catch (error) {
            Alert.alert('Enter room error', error.toString());
            return false
        }
    }
}

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#42A5F5',
        paddingTop: 70,
    },
    roomNumber: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#42A5F5'
    },
    actors: {
        flex: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#64B5F6',
        borderRadius:7,
        paddingTop: 10,
        paddingBottom: 10,

    },
    actor: {
        paddingLeft: width / 70,
        paddingRight: width / 70,
        paddingTop: 10,
        backgroundColor:'#64B5F6',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#42A5F5',
    },
    // actorPic: {
    //     width: width / 5,
    //     height: width / 5,
    // },
    actorPic: {
        backgroundColor:'#FBC23D',
        borderRadius:64,
        borderWidth: 1,
        borderColor: '#fff',
        width: width / 5,
        height: width / 5,
    },
    actorPicText: {
        marginTop: width / 10,
        marginRight: width / 30,
        textAlign: 'right',
        fontSize: 20,
        color: "#FFF",
        fontWeight: 'bold',
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    actorName: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    beforeStart: {
        opacity: 0,
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textProgress: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
    },

    btn: {
        alignSelf: 'stretch', //非常重要，覆盖父样式
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ee940',
        height: 40,
        borderRadius: 0,
        marginTop: 10
    },
});
