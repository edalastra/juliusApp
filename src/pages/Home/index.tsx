import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, RefreshControl, Text, TextInput } from "react-native";
import { CardHeader, Annotation,  Card, colors } from '../../components/GlobalComponents/styles';
import { getBudgets } from "../../service/api"; 


const Home: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const monthPT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const loadBudgets = async () => {
    const budgetsList = await getBudgets();
    setBudgets(budgetsList);
  }

  useEffect(() => {
    loadBudgets();
    setLoading(false);
  },[]);


  return (
    
      <SafeAreaView>
      <Text>{!budgets.length ? "Nenhum orçamento encontrado" : "" }</Text>


        <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadBudgets}
          />
        }
        >
          {budgets.map((budget, i) => {
            const currencyFormat = (num) => {
              return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
            
            return (
            <Card key={i} >
            <CardHeader>
            <Annotation>Visão Geral - {monthPT[budget.month]} {budget.year}</Annotation>
            </CardHeader>
            <View style={styles.info}>
              <View style={styles.totGreen} />
              <Text style={styles.textInfo} >Receita</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textGreen]} >{currencyFormat(budget.receitas)}</Text>
              </View>
            </View>

            <View style={styles.info}>
              <View style={styles.totOrange} />
              <Text style={styles.textInfo} >Despesas</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textRed]} >{currencyFormat(budget.despesas)}</Text>
              </View>
            </View>

            <View style={styles.info}>
              <View style={styles.totRed} />
              <Text style={styles.textInfo} >Gastos</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textRed]} >{currencyFormat(budget.gastos)}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.totBlue} />
              <Text style={styles.textInfo} >Investimentos</Text>
              <View style={styles.valueContent}>
                <Text style={[styles.value, styles.textRed]} >{currencyFormat(budget.receitas)}</Text>
              </View>
            </View>
          </Card>
            );
          } )}

          
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