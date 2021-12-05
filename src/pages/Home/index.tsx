import React, { useContext } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Button, Text } from "react-native";
import { Btn, CardHeader, Annotation, Container, Card, CardContent, Title } from '../../components/GlobalComponents/styles';
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
            <Annotation>Visão Geral - Novembro</Annotation>

            <View style={styles.info}>
              <View style={styles.totGreen} />
              <Text style={styles.textInfo} >Receita</Text>
            </View>

            <View style={styles.info}>
              <View style={styles.totOrange} />
              <Text style={styles.textInfo} >Despesas</Text>
            </View>

            <View style={styles.info}>
              <View style={styles.totRed} />
              <Text style={styles.textInfo} >Gastos</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.totBlue} />
              <Text style={styles.textInfo} >Investimentos</Text>
            </View>
            <Btn>Alterar</Btn>
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
  totGreen: {
    width: 5,
    height: 30,
    backgroundColor: '#659A00',
  },
  totRed: {
    width: 5,
    height: 30,
    backgroundColor: '#CC0000',
  },
  totOrange: {
    width: 5,
    height: 30,
    backgroundColor: '#E1963B',
  },
  totBlue: {
    width: 5,
    height: 30,
    backgroundColor: '#28B2E1',
  }
});

export default Home;