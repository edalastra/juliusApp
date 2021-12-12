import React, { useState } from "react";
import {  TextInput, Text, View, StyleSheet } from "react-native";

interface Props {
    label: string;
    password: boolean | undefined;
    value: any;
    onChange: (value: string) => void;
}

const InputFloatLabel = ({ label, password=false, onChange, value } : Props) => {
    const [isFocused, setIsFocused] = useState(false);

    const styles = StyleSheet.create({
        div: {
            marginBottom: 20,
        },
        label: {
            top: isFocused || value ? 0 : 18,
            fontSize: isFocused || value ? 14: 18,
            color: !isFocused ? '#aaa' : '#05377F',
        },
        input: {
            borderBottomWidth: 1,
            width: "100%",
            fontSize: 14,
            borderColor: isFocused ? '#05377F' : '#E5E5E5',
        }
    });

    return (
        <View style={styles.div}>
            <Text style={styles.label} >{label}</Text>
            <TextInput  style={styles.input}
                secureTextEntry={password}
                onChangeText={onChange}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}  >
            </TextInput>
        </View>
    );
};

export default InputFloatLabel;