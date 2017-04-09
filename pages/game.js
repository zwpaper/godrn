import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,Navigator
} from 'react-native';
import {getUniqueID} from "react-native-device-info";
import {Actions} from 'react-native-router-flux';

export default class Game extends Component {
    constructor(progs) {
        super(progs);
        this.state = {
            status: "Not Start",
            todo: "Waiting",
            user: "Not in",
            actors: [],
            number: 0,
            btn: styles.btnDisable,
            btnDisable: true};
        let machine = this.stateMachine();
        this.targetID = getUniqueID().replace(/-/g, "");
        if (!this.enterRoom(this.props.room_id)) {
            Actions.pop();
        }

    }

    render() {
        var actorList = [];
        this.state.actors.sort((a, b)=> {return a.order - b.order});
        this.state.actors.forEach((value, index) => {
            let key = index + 1;
            var order;
            if (value.status == "ready") {
                order = "✓";

            } else {
                order = index + 1;
            }
            actorList.push(
                <View
                    key={key}
                    style={styles.actor}>
                    <TouchableHighlight
                        style={styles.actorPic}>
                        <Text style={styles.actorPicText}>{order}</Text>
                    </TouchableHighlight>
                    <Text style={styles.actorName}>{value.name}</Text>
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
                <View style={styles.actors}>
                    {actorList}
                </View>
                <View style={styles.roomNumber}>
                    <Text style={styles.textProgress}>Room Number:</Text>
                    <Text style={styles.textProgress}>{this.props.room_id}</Text>
                </View>
                <View
                    style={styles.progress}>
                    <Text style={styles.textProgress}>{this.state.status}</Text>
                </View>

                <TouchableOpacity
                    style={this.state.btn}
                    disabled={this.state.btnDisable}
                    onPress={() => {this.ws.send(JSON.stringify({
                        op: "ready",
                        uid: this.targetID,
                    }));
                    this.setState({btn: styles.btnDisable, btnDisable: true})}}>
                    <Text style={styles.text}>{this.state.todo}</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }


    enterRoom(number) {
        if (number === "" || number === null) {
            Alert.alert("No Room number provided", "Please input a number");
            return
        }
        try {
            const CONST_DATA = require("./global.js");
            this.ws = new WebSocket(CONST_DATA.WEB_SOCKET_URL + '/room/' + number + "/player");
            this.ws.onopen = () => {
                // connection opened
                this.ws.send(JSON.stringify({
                    op: "enter",
                    uid: this.targetID,
                    name: this.props.name,
                    room_id: number,
                })); // send a message
            };
            this.ws.onmessage = (e) => {
                // a message was received
                let responseJson = JSON.parse(e.data);
                machine.get(responseJson.op)(this,responseJson)
            };
            this.ws.onerror = (e) => {
                // an error occurred
                console.log(e.message);
            };
            this.ws.onclose = (e) => {
                // connection closed
                console.log(e.code, e.reason);
            };

            return true
        } catch (error) {
            Alert.alert('Enter room error', error.toString());
            return false
        }
    }

    playerEnter(obj, data) {
        if(data.players.length === data.number) {
            obj.setState({number: data.number, id: data.room_id, actors: data.players,
                btn: styles.btn, btnDisable: false,
                todo: "Ready"});
        } else {
            obj.setState({number: data.number, id: data.room_id, actors: data.players});
        }
    }

    playerReady(obj, data) {
        obj.setState({actors: data.players});
    }

    stateMachine() {
        machine = new Map();
        machine.set("enter", this.playerEnter);
        machine.set("ready", this.playerReady);
        return machine
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
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight + 10,
    },
    actors: {
        flex: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#64B5F6',
        borderRadius:5,
        paddingTop: 6,
        paddingBottom: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    actor: {
        paddingLeft: width / 70,
        paddingRight: width / 70,
        paddingTop: 7,
        backgroundColor:'#64B5F6',
        borderTopWidth: 3,
        borderBottomWidth: 1,
        borderRightWidth: 3,
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
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
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
        backgroundColor: "transparent",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    beforeStart: {
        opacity: 0,
    },
    roomNumber: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textProgress: {
        fontWeight: 'bold',
        fontSize: 18,
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
        height: 35,
        borderRadius: 0,
    },
    btnDisable: {
        alignSelf: 'stretch', //非常重要，覆盖父样式
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9E9E9E',
        height: 35,
        borderRadius: 0,
    },
});
