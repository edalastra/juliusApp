import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Title, colors } from "../GlobalComponents/styles";
import AuthContext from "../../contexts/auth";


const HeaderComponent : React.FC = ({ navigation }) => {
    const { user } = React.useContext(AuthContext);
    const firstName = user.name.split(' ')[0];

    return (
        <View style={styles.header}>
            <View>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                <FontAwesome style={styles.bars} name='bars' />
            </TouchableOpacity>

            </View>
            <View style={styles.salutationContainer}>
                <Text style={styles.salutation}>Olá, {firstName}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        top: 0,
        backgroundColor: colors.primary,
        marginBottom: 10,
        flexDirection: 'row',
        paddingVertical: 20,
    },
    salutation: {
        fontFamily: 'Lato-semibold',
        color: '#fff',
        fontSize: 20,
        textAlign: 'right',
        marginRight: 40,
    },
    salutationContainer: {
        flex: 1,
    },
    bars: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 20,
    },
});

export default HeaderComponent;