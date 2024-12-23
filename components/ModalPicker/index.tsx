//Componente Modal de Categorias

import React from "react";
import { 
        View, 
        Text, 
        StyleSheet,
        TouchableOpacity,
        Dimensions,
        ScrollView
    } from "react-native";

import { CategoryProps } from "../../pages/signin/Order";

interface ModalPickerProps{
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (option: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

    function onPressItem(option: CategoryProps) {
        console.log(option);
        selectedItem(option);
        handleCloseModal();
    }

    const option = options.map( (option, index) => (
        <TouchableOpacity 
            key={index} 
            style={styles.option}
            onPress={ () => onPressItem(option)}
        >
            <Text style={styles.item}>
                {option?.name}
            </Text>
        </TouchableOpacity>
    ));

    return(
        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        option
                    }
                </ScrollView>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content:{
        width: WIDTH - 30,
        height: HEIGHT / 1.5,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },

    option:{
        width: '100%',
        alignItems: 'flex-start',
        borderTopWidth: .8,
        borderTopColor: '#8a8a8a',
    },

    item: {
        margin: 18,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#101026'
    }
});