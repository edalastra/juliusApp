import React from "react";
import { colors } from "../GlobalComponents/styles";
import { View, Text, StyleSheet, TouchableOpacity, ColorPropType } from "react-native";

interface Props {
    type: string;
    amount: number;
    description: string;
};

const currencyFormat = (num) => {
    return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

const BudgetItem : React.FC<Props> = ({ type, description, amount } : Props) => {
    const bgColor = 
        type === "receita" ? colors.greenLight : 
        type === 'investimento' ? colors.blue : 
        type === 'despesa' ? colors.orange : colors.redLight;
    
    const styles = StyleSheet.create({
        container: {
            padding: 20,
            marginVertical: 5,
            flexDirection: 'row',
            backgroundColor: bgColor,
            borderRadius: 5,
            justifyContent: 'space-between',
            width: '100%',        
        },
        item: {
            fontSize: 14,
            textTransform: 'capitalize'
        }
    });
  return (
    <TouchableOpacity>
      <View style={styles.container}>
            <Text style={styles.item} >{type}</Text>
            <Text style={styles.item}>{description}</Text>
            <Text style={styles.item}>{currencyFormat(amount)}</Text>
      </View>
      </TouchableOpacity>
  );
};




export default BudgetItem;