import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList  } from "react-native";
import AuthContext from "../../contexts/auth";
import { Container, colors } from "../../components/GlobalComponents/styles";


const Profile : React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.userData} >
            <FlatList 
                data={[
                    {key: 'Nome', value: user.name},
                    {key: 'Email', value: user.email},
                ]}
                renderItem={({item}) => <Text >{item.key}: {item.value}</Text>}
            />  
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection : 'column',
        justifyContent: 'center',
    },
    userData: {
       
    }

});

export default Profile;