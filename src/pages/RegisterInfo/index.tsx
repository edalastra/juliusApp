import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet, FlatList, RefreshControl, TextInput } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

import { Btn, BtnText, TextError , Card, CardContent, CardHeader, Annotation, FixedBtn, colors, Input } from '../../components/GlobalComponents/styles';
import { registerInfoBudget, getBudgetsItem, getMonths } from "../../service/api";
import InputFloatLabel from "../../components/InputFloatLabel";
import ModalComponent from "../../components/ModalComponent";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BudgetItem from '../../components/BugdetItem';

const RegisterInfo: React.FC = () => {
    const [budgetItems, setBudgetItems] = useState([]);

    const [showModalNewItem, setShowModalNewItem] = useState(false);
    const [showModalNewBudget, setShowModalNewBudget] = useState(false);

    const [type, setType] = useState(null);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const [refreshing, setRefreshing] = React.useState(false);
    const [monthList, setMonthList] = useState([]);

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthPT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [newBudgetYear, setNewBudgetYear] = useState(currentYear);
    const [newBudgetMonth, setNewBudgetMonth] = useState(currentMonth);
    const [newBudgetError, setNewBudgetError] = useState('');


    const loadBudgetItems = async () => {
        const bugdetsItemsList = await getBudgetsItem(selectedMonth, currentYear);
        setBudgetItems(bugdetsItemsList);
        console.log('atualizando orçamento')
    };

    const loadMonths = async () => {
        const monthsList = await getMonths();
        setMonthList(monthsList);
    }

    useEffect(() => {
        loadMonths();
        loadBudgetItems();
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadBudgetItems();
        setRefreshing(false);
    }, []);

    const changeMonth = (value: object) => {
        setSelectedMonth(value.month)
        setSelectedYear(value.year)
        loadBudgetItems();
    };

    const submitNewItem = () => {
        registerInfoBudget({ type, description, amount, month: selectedMonth, year: currentYear })
            .then(response => {
                setShowModalNewItem(false);
                loadBudgetItems();
            })
            .catch(err => console.log(err));
        loadMonths();
        setType(null);
        setDescription('');
        setAmount('');
        
    };

    const newBudget = () => {
        const onlyMonthList = monthList.map(item => item.month);
        const onlyYearList = monthList.map(item => item.year);
        if (onlyMonthList.includes(newBudgetMonth) && onlyYearList.includes(newBudgetYear)) {
            setNewBudgetError('Mês e ano já cadastrados');
            return;
        }
        if (newBudgetYear < 2010 || newBudgetYear > 9999) {
            setNewBudgetError('Ano inválido');
            return;
        }
        changeMonth({ month: newBudgetMonth, year: newBudgetYear });
        setShowModalNewBudget(false);
    };


      

    return (
        <View>

            

            <SafeAreaView style={styles.container}>

            <RNPickerSelect 
                onValueChange={value => changeMonth(value)}
                items={monthList.map(item => (
                    {
                        label: `${monthPT[item.month]} - ${item.year}`, value: {
                            month: item.month, year: item.year
                        }
                    }
                ))}
                value={{ month: selectedMonth, year: selectedYear }}
                placeholder={{
                    label: `Selecionar mês`, value: {
                        month: selectedMonth, year: selectedYear
                    }
                }}
            />
            <Btn onPress={() => setShowModalNewItem(true)} style={styles.newItemBtn}><BtnText>Novo item</BtnText></Btn>
                <ModalComponent
                    okBtnAction={submitNewItem}
                    title="Registrar Informação"
                    startModal={show => setShowModalNewItem(show)}
                    show={showModalNewItem}
                >
                    <View style={styles.modalForm}>
                        <RNPickerSelect 
                            onValueChange={value => setType(value)}
                            value={type}
                            items={[
                                { label: 'Receita', value: 'receita' },
                                { label: 'Gasto', value: 'gasto' },
                                { label: 'Despesa', value: 'despesa' },
                                { label: 'Investimento', value: 'investimento' },
                            ]}
                            placeholder={{label: 'Selecione uma categoria...', value: type}}
                        />
                        <InputFloatLabel label="Descrição" value={description} onChange={setDescription} />
                        <InputFloatLabel numeric={true} label="Valor" value={amount} onChange={setAmount} />

                    </View>
                </ModalComponent>

                <ModalComponent
                    okBtnAction={() => newBudget()}
                    title="Novo Orçamento"
                    startModal={show => setShowModalNewBudget(show)}
                    show={showModalNewBudget}
                >
                    <View style={styles.modalForm}>
                        <RNPickerSelect 
                            onValueChange={value => setNewBudgetMonth(value)}
                            value={newBudgetMonth}
                            items={monthPT.map((item, index) => ({ label: item, value: index }) )}
                            placeholder={{label: 'Selecione um mês...', value: newBudgetMonth}}
                        />  
                        <InputFloatLabel numeric={true} onChange={setNewBudgetYear} value={newBudgetYear} label="Ano" />
                        <TextError>{newBudgetError}</TextError>
                        </View>
                </ModalComponent>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text>{!monthList.length ? "Nenhum orçamento encontrado" : "" }</Text>

                    <Card>
                        <CardHeader>
                            <Annotation>Definir orçamento para <Text>{monthPT[selectedMonth]} {selectedYear}</Text></Annotation>
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
                <FixedBtn onPress={() => setShowModalNewBudget(true)} ><FontAwesome name='plus' color="#fff" size={30} /></FixedBtn>

            </SafeAreaView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {

        position: 'relative',
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
    listContent: {
        alignContent: 'center',
    },
    newItemBtn:{
        alignSelf: 'flex-end',
        width: "100%",

    },
    modalForm: {
        flexDirection: 'column',
        width: '80%',
        color: '#000',
    }
});

export default RegisterInfo;