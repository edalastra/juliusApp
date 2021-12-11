import React from "react";
import { View, Text, StyleSheet } from "react-native";



const BudgetItem : React.FC = ({ type, description, value }) => {
  return (
      <View style={styles.container}>
            <Text>{type}</Text>
            <Text>{description}</Text>
            <Text>{value}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
});

export default BudgetItem;