import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet, FlatList, Image } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Card, CardContent, CardHeader, Annotation, FixedBtn, colors, Input } from '../../components/GlobalComponents/styles';
import { registerInfoBudget, getBudgetsItem } from "../../service/api";
import InputFloatLabel from "../../components/InputFloatLabel";
import ModalComponent from "../../components/ModalComponent";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BudgetItem from '../../components/BugdetItem';

const RegisterInfo: React.FC = () => {
    const [budgetItems, setBudgetItems] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [month, setMonth] = useState(0);

    const loadBudgetItems = async () => {
        const bugdetsItemsList = await getBudgetsItem();
        console.log(bugdetsItemsList);
        setBudgetItems(bugdetsItemsList);
    };

    useEffect(() => {
        loadBudgetItems();
    }, []);

    const submitNewItem = () => {
        registerInfoBudget({ type, description, amount, month })
            .then(response => {
                setShowModal(false);
                loadBudgetItems();
            })
            .catch(err => console.log(err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ModalComponent
                okBtnAction={submitNewItem}
                title="Registrar Informação"
                startModal={show => setShowModal(show)}
                show={showModal}
            >
                <View>
                    <RNPickerSelect
                        onValueChange={value => setType(value)}
                        items={[
                            { label: 'Receita', value: 'Receita' },
                            { label: 'Conta', value: 'Conta' },
                            { label: 'Despesa', value: 'Despesa' },
                            { label: 'Investimento', value: 'Investimento' },
                        ]}
                    />
                    <InputFloatLabel value={description} onChange={setDescription} label="Descrição" />
                    <InputFloatLabel value={amount} onChange={setAmount} label="Valor" />
                </View>
            </ModalComponent>
            <ScrollView>
                <Card>
                    <CardHeader>
                        <Annotation>Definir orçamento para Dezembro</Annotation>
                    </CardHeader>
                    <CardContent>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Tipo</Text>
                            <Text style={styles.tableHeaderText}>Descrição</Text>
                            <Text style={styles.tableHeaderText}>Valor</Text>
                        </View>
                        <View style={styles.listContent}>
                        <FlatList data=
                            {budgetItems.map((item, i) => {
                                return { key: item._id, type: item.type, description: item.description, amount: item.amount }
                            })
                            }
                            renderItem={({ item }) => <BudgetItem type={item.type} description={item.description} amount={item.amount} />}
                        >
                        </FlatList>
                        </View>
                        
                    </CardContent>
                </Card>
            </ScrollView>
            <FixedBtn onPress={() => setShowModal(true)} ><FontAwesome name='plus' color="#fff" size={30} /></FixedBtn>
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
    },
    listContent : {
        alignContent: 'center',
    }
});

export default RegisterInfo;