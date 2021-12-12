import React from "react";
import { colors } from "../GlobalComponents/styles";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    type: string;
    amount: number;
    description: string;
};

const BudgetItem : React.FC<Props> = ({ type, description, amount } : Props) => {
    const bgColor = type === "Receita" ? colors.greenLight : colors.redLight;
    
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
        }
    });
  return (
    <TouchableOpacity>
      <View style={styles.container}>
            <Text style={styles.item} >{type}</Text>
            <Text style={styles.item}>{description}</Text>
            <Text style={styles.item}>{amount}</Text>
      </View>
      </TouchableOpacity>
  );
};




export default BudgetItem;