import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Slider, Switch, Navigator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getUniqueID} from "react-native-device-info";

export default class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wolves: 3,
            villagers: 3,
            prophet: true,
            witch: true,
            hunter: true,
            kingwolf: false,
            guard: false,
            total: 9,
        };

    }

    render() {

        return (
            <View
                style={styles.container}>
                <View style={styles.totalView}>
                    <Text style={styles.totalText}>Total People: {this.state.total}</Text>
                </View>
                <View style={styles.actors}>
                <ScrollView
                    contentContainerStyle={styles.actorsList}
                    keyboardDismissMode='on-drag'>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/wolf.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>Wolves: </Text>
                                <Text style={styles.textName}>{this.state.wolves}</Text>
                            </View>
                            <Slider
                                style={styles.actorNumber}
                                maximumValue={8}
                                minimumValue={1}
                                step={1}
                                value={this.state.wolves}
                                onValueChange={(value) => this.setState({
                                    wolves: value, total: this.state.total - this.state.wolves + value
                                })}/>
                        </View>
                    </View>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/villager.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>Villagers: </Text>
                                <Text style={styles.textName}>{this.state.villagers}</Text>
                            </View>
                            <Slider
                                style={styles.actorNumber}
                                maximumValue={8}
                                minimumValue={1}
                                step={1}
                                value={this.state.villagers}
                                onValueChange={(value) => this.setState({
                                    villagers: value, total: this.state.total - this.state.villagers + value
                                })}/>
                        </View>
                    </View>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/prophet.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>Prophet: </Text>
                                <Switch
                                    style={styles.actorSwitch}
                                    onValueChange={(value) => this.setState({
                                        prophet: value,
                                        total: value ? this.state.total + 1 : this.state.total - 1
                                    })}
                                    value={this.state.prophet}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/witch.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>Witch: </Text>
                                <Switch
                                    style={styles.actorSwitch}
                                    onValueChange={(value) => this.setState({
                                        witch: value, total: value ? this.state.total + 1 : this.state.total - 1
                                    })}
                                    value={this.state.witch}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/hunter.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>Hunter: </Text>
                                <Switch
                                    style={styles.actorSwitch}
                                    value={this.state.hunter}
                                    onValueChange={(value) => this.setState({
                                        hunter: value, total: value ? this.state.total + 1 : this.state.total - 1
                                    })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/kingwolf.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>King wolf: </Text>
                                <Switch
                                    style={styles.actorSwitch}
                                    onValueChange={(value) => this.setState({
                                        kingwolf: value, total: value ? this.state.total + 1 : this.state.total - 1
                                    })}
                                    value={this.state.kingwolf}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actor}>
                        <Image
                            source={require('./img/guard.png')}
                            style={styles.actorPic}
                        />
                        <View style={styles.actorDetail}>
                            <View style={styles.actorName}>
                                <Text style={styles.textName}>Guard: </Text>
                                <Switch
                                    style={styles.actorSwitch}
                                    onValueChange={(value) => this.setState({
                                        guard: value, total: value ? this.state.total + 1 : this.state.total - 1
                                    })}
                                    value={this.state.guard}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.createRoom()}>
                    <Text style={styles.text}>Create Room</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async createRoom() {
        if (this.state.total < 3) {
            Alert.alert("Please add more people", "Can not play less than 3 people");
            return
        }
        try {
            let CONST_DATA = require("./global.js");
            let response = await fetch(CONST_DATA.SERVER_URL + '/room', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: getUniqueID().replace(/-/g, ""),
                    name: this.props.name,
                    wolves: this.state.wolves,
                    villagers: this.state.villagers,
                    prophet: this.state.prophet,
                    witch: this.state.witch,
                    hunter: this.state.hunter,
                    kingwolf: this.state.kingwolf,
                    guard: this.state.guard
                })
            });
            let responseJson = await response.json();
            responseJson["name"] = this.props.name;
            console.log(responseJson);
            Actions.Game(responseJson);
        } catch (error) {
            Alert.alert('Create Room error', error.toString());
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 4,
        alignItems: 'center',
        backgroundColor: '#0F5A91',
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
        flexDirection:'column'
    },
    actors: {
        flex: 12,
        alignSelf: 'stretch',
    },
    actorsList: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'stretch',
    },
    actor: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor:  '#0F5A91',
        borderBottomWidth: 2,
    },
    actorPic: {
        marginLeft: 10,
        width: 60,
        height: 60,
    },
    actorDetail: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
    },
    actorName: {
        marginLeft: 5,
        flexDirection: 'row',
    },
    actorNumber: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    actorSwitch: {
        right: 20,
        position:'absolute',
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#000'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF'
    },
    totalView: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42A5F5',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    btn: {
        alignSelf: 'stretch', //非常重要，覆盖父样式
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ee940',
        flex: 1,
        borderRadius: 0,
    },
});
