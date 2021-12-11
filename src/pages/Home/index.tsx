import React, { useContext } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Button, Text } from "react-native";
import { Btn, BtnText, CardHeader, Annotation, Container, CardFooter, Card, CardContent, Title, colors } from '../../components/GlobalComponents/styles';
import HeaderComponent from "../../components/Header";
import AuthContext from "../../contexts/auth";


const Home: React.FC = () => {
  const { signOut } = useContext(AuthContext);

  async function handleSignOut() {
    signOut();
  }
  return (
    
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <Card >
            <CardHeader>
            <Annotation>Visão Geral - Novembro</Annotation>
            </CardHeader>
            <View style={styles.info}>
              <View style={styles.totGreen} />
              <Text style={styles.textInfo} >Receita</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textGreen]} >R$ 0,00</Text>
              </View>
            </View>

            <View style={styles.info}>
              <View style={styles.totOrange} />
              <Text style={styles.textInfo} >Despesas</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textRed]} >R$ 0,00</Text>
              </View>
            </View>

            <View style={styles.info}>
              <View style={styles.totRed} />
              <Text style={styles.textInfo} >Gastos</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textRed]} >R$ 0,00</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.totBlue} />
              <Text style={styles.textInfo} >Investimentos</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textRed]} >R$ 0,00</Text>
              </View>
            </View>
            <CardFooter>
              <Btn ><BtnText>Alterar</BtnText></Btn>

            </CardFooter>
          </Card>
        </ScrollView >
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  card: {
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    margin: 10,
  },
  textInfo: {
    fontSize: 20,
    marginLeft: 10,
  },
  valueContent: {
    flex: 1,
  },
  value: {
    textAlign: "right",
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
  textGreen: {
    color: colors.green,
  },
  textRed:{
    color: colors.red,
  },
  totGreen: {
    width: 5,
    height: 30,
    backgroundColor: colors.green,
  },
  totRed: {
    width: 5,
    height: 30,
    backgroundColor: colors.red,
  },
  totOrange: {
    width: 5,
    height: 30,
    backgroundColor: colors.orange,
  },
  totBlue: {
    width: 5,
    height: 30,
    backgroundColor: colors.blue,
  }
});

export default Home;