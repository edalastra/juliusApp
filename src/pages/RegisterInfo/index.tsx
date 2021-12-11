import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Card, CardContent, CardHeader, Annotation, colors} from '../../components/GlobalComponents/styles';
import BudgetItem from '../../components/BugdetItem';

const RegisterInfo : React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Card>
                <CardHeader>
                    <Annotation>Definir orçamento para Dezembro</Annotation>
                </CardHeader>
                <CardContent>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Tipo</Text>
                        <Text  style={styles.tableHeaderText}>Descrição</Text>
                        <Text  style={styles.tableHeaderText}>Valor</Text>
                    </View>
                    <FlatList data={[
                        {key: '1', type: 'Alimentação', description: 'Alimentação', value: 'R$ 100,00'},
                    ]} 
                        renderItem={({item}) => <BudgetItem type={item.type} description={item.description} value={item.value}/>}
                    >

                    </FlatList>
                </CardContent>
            </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        height: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableHeaderText: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        marginRight: 30,
        marginLeft: 30,
    }
});

export default RegisterInfo;