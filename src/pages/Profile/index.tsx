import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import InputFloatLabel from "../../components/InputFloatLabel";
import AuthContext from "../../contexts/auth";
import { Btn, BtnText } from "../../components/GlobalComponents/styles";

const Stack = createNativeStackNavigator();


const Profile : React.FC = () => {
    

    return (

      <Stack.Navigator>
      <Stack.Screen name="Perfil" component={ProfileMain} />
      <Stack.Screen name="Dados pessoais" component={PersonData} />
      <Stack.Screen name="Senha" component={Password} />

    </Stack.Navigator>
        
    );
};

const ProfileMain : React.FC = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Dados pessoais')} style={styles.redirectButton}>
                <Text>Dados pessoais ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Senha')} style={styles.redirectButton}>
                <Text>Senha ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut} style={styles.redirectButton}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const PersonData : React.FC = ({ navigation }) => {
    const { user, updateUser } = useContext(AuthContext);
    const [ name, setName ] = useState(user.name);
    const [ email, setEmail ] = useState(user.email);

    const handleUpdate = async () => {
        if(!(name && email)){
            return alert("Por favor, preencha todos os campos.");
        }
        await updateUser(name, email);    
        navigation.goBack();
        alert("Dados atualizados com sucesso!");
    }

    return (
    
    <View style={styles.container} >
        <InputFloatLabel onChange={setName} label="Nome" value={name}></InputFloatLabel>
        <InputFloatLabel onChange={setEmail} label="Email" value={email}></InputFloatLabel>

            <View>
            <Btn onPress={handleUpdate} ><BtnText>Salvar</BtnText></Btn>
        </View>
    </View>
    );
}

const Password : React.FC = ({ navigation }) => {
    const { changePassword } = useContext(AuthContext);
    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleChange = async () => {
        if(!(oldPassword && newPassword && confirmPassword)){
            return alert("Por favor, preencha todos os campos.");
        }

        if(newPassword !== confirmPassword){
            return alert("As senhas não coincidem.");
        }

        await changePassword(newPassword, oldPassword);
        navigation.goBack();
        alert("Senha alterada com sucesso!");
    }

    return (
        <View style={styles.container}>
            <InputFloatLabel onChange={setOldPassword} value={oldPassword} label="Senha atual" password={true}></InputFloatLabel>
            <InputFloatLabel onChange={setNewPassword} value={newPassword} label="Nova Senha" password={true}></InputFloatLabel>
            <InputFloatLabel onChange={setConfirmPassword} value={confirmPassword} label="Repita a Nova Senha" password={true}></InputFloatLabel>
            <Btn onPress={handleChange} ><BtnText>Salvar</BtnText></Btn>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection : 'column',
        justifyContent: 'center',
        margin: 20,
    },
    redirectButton: {
        width: '90%',
        borderColor: '#000',
        borderBottomWidth: 1,
        padding: 10,
    },
    userData: {
        justifyContent: 'center',
    }

});

export default Profile;