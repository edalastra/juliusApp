import React, { useState } from "react";
import { CheckBox } from 'react-native-elements'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Btn, BtnText, Strong, Container, Card, Annotation, CardHeader, CardContent, Form, CardFooter, Title } from "../../components/GlobalComponents/styles";
import InputFloatLabel from "../../components/InputFloatLabel";
import AuthContext from "../../contexts/auth";
import { signUp } from "../../service/api";



const SignUp : React.FC = () => {
    const { signIn } = React.useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termAndPolicyCheck, setTermAndPolicyCheck] = useState(false);

    
    const submit = async () => {
        if( !(name && email && password && confirmPassword && termAndPolicyCheck) ){
            return alert("Por favor, preencha todos os campos.");
        }
        if(password !== confirmPassword){
            return alert("As senhas precisam ser iguais.");
        }
            await signUp(name, email, password);
            await signIn(email, password);
    };


    return (
        <Container>
            <View style={styles.header}>
            <Title>JULIUS APP</Title>
            </View>
            <Card>
                <ScrollView>
                <CardHeader>
                    <Annotation>Crie sua conta</Annotation>
                </CardHeader>
                <CardContent>
                    <Form>
                        <InputFloatLabel label="Nome" onChange={setName}  value={name} />
                        <InputFloatLabel label="E-mail" onChange={setEmail} value={email} />
                        <InputFloatLabel label="Senha" onChange={setPassword} value={password} password={true} />
                        <InputFloatLabel label="Confirmar senha" onChange={setConfirmPassword} value={confirmPassword} password={true} />
                        <View style={styles.termAndPolicyCheck}>
                            <CheckBox onPress={() => setTermAndPolicyCheck(!termAndPolicyCheck)} checked={termAndPolicyCheck} ></CheckBox>
                            <Annotation style={styles.text} >Concordo com os <Strong>termos de servi??o</Strong> e a <Strong>politica de privacidade</Strong> do <Strong>Julius App</Strong></Annotation>
                        </View>
                    </Form>
                    <Btn onPress={submit}><BtnText>Cadastrar</BtnText></Btn>
                </CardContent>

                </ScrollView>
            </Card>
        </Container>
    );
};

const styles = StyleSheet.create({
    termAndPolicyCheck: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 10,
        padding: 10
    },
    text: {
        fontSize: 16,
    },
    header: {
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignUp;