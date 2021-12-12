import React, { Children, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Btn, BtnText } from "../GlobalComponents/styles";

interface Props {
    title: string;
    show: boolean;
    startModal: (show : boolean) => void;
    okBtnAction: () => void;
    children: any;
}

const ModalComponent : React.FC<Props> = ({ title, show, startModal, okBtnAction, children } : Props) => {

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          startModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <React.Fragment>
              {children}
            </React.Fragment>
            <Btn
              onPress={okBtnAction}
            >
              <BtnText>Ok.</BtnText>
            </Btn>
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },

    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      width: "60%",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  

export default ModalComponent;