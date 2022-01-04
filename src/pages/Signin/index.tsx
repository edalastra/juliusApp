import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import AuthContext from "../../contexts/auth";
import { Btn, BtnText, Form, Card, Container, CardHeader, CardContent, Title, Annotation, CardFooter } from "../../components/GlobalComponents/styles";
import InputFloatLabel from "../../components/InputFloatLabel";

const SignIn: React.FC = ({ navigation }) => {
    const { signed, signIn } = useContext(AuthContext);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    async function handleSignIn() {
        if (email.length === 0 || password.length === 0) {
            return setError("Preencha todos os campos");
        }
        try {
            await signIn(email, password);
        } catch (err: any) {
            setError(err.message);
        }


    }

    return (


        <Container>
            <View style={styles.header}>
                <Title>JULIUS APP</Title>
            </View>

            <Card>
                        <CardHeader>
                            <Annotation >Faça login para continuar</Annotation>
                        </CardHeader>
                        <CardContent>
                            <Form>
                                <Text>{error}</Text>
                                <InputFloatLabel value={email} onChange={setEmail} label="Email" />
                                <InputFloatLabel value={password} onChange={setPassword} password={true} label="Senha" />
                            </Form>
                            <Btn onPress={handleSignIn} ><BtnText>Entrar</BtnText></Btn>

                        </CardContent>
                        <CardFooter>
                            <Annotation>Não tem uma conta? <Text onPress={() => navigation.navigate('SignUp')} style={{ color: '#05377F' }}>Cadastre-se</Text></Annotation>
                        </CardFooter>

            </Card>

        </Container>
    );
};


const styles = StyleSheet.create({
    header: {
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignIn;