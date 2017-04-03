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
    AlertIOS,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Start extends Component {
    constructor(progs) {
        super(progs);
        this.state = {input: "123", name: ""}
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='never'>
                <View style={styles.content}>
                    <Image
                        source={{uri: 'https://ww2.sinaimg.cn/large/006tKfTcly1fdp65grzdyj30e10d8myf.jpg'}}
                        style={styles.logo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Name'
                        defaultValue={this.state.name}
                        onChangeText={(text) => this.setState({name: text})}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.tryEnterRoom()}>
                        <Text style={styles.text}>Enter Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.toCreateRoom()}>
                        <Text style={styles.text}>Create Room</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.company}>
                    <Text
                        style={styles.comtext}>Codes PapEr</Text>
                </View>
            </ScrollView>
        );
    }

    tryEnterRoom() {
        if (this.state.name === "" || this.state.name === null) {
            Alert.alert("No Name provided", "Please input a name");
            return
        }
        AlertIOS.prompt('Room Number','Please input the room number',[
            {text:'Cancel'},
            {text:'OK', onPress: number => this.enterRoom(number)}
        ])
    }
    async  enterRoom(number) {
        if (number === "" || number === null) {
            Alert.alert("No Room number provided", "Please input a number");
            return
        }
        Actions.Game({
            name: this.state.name,
            room_id: number
        });
    }

    toCreateRoom() {
        if (this.state.name === "" || this.state.name === null) {
            Alert.alert("No Name provided", "Please input a name");
            return
        }
        Actions.CreateRoom({
            name: this.state.name})
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        flex: 10,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    logo: {
        width: 160,
        height: 160,
        marginTop: 100,
        marginBottom: 50,
    },
    input: {
        textAlign: 'center',
        height: 40,
        marginBottom: 40,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'lightblue'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF'
    },
    btn: {
        alignSelf: 'stretch', //非常重要，覆盖父样式
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'coral',
        height: 40,
        borderRadius: 0,
        marginTop: 20
    },
    company: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    comtext: {
        fontWeight: 'bold',
        fontSize: 14,
        alignItems: 'center',
        color: '#AAAAAA'
    }
});
