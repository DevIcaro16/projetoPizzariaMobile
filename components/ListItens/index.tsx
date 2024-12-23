import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

interface ItensProps {
    data:{
        id: string;
        product_id: string;
        name: string
        amount: string | number;
    };

    deleteItem: (item_id: string) => void
};

export default function ListItem({ data, deleteItem}: ItensProps) {

    //Função / Método Para a Exclusão / Retirada De um Item do Pedido (Order)
    function handleDeleteItem() {
        // console.log("handleDeleteItem");
        deleteItem(data.id)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.item}>
                {data.amount} - {data.name}
            </Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather
                    name="trash-2"
                    color="#FF3F4B"
                    size={28}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: .8,
        borderColor: '#8a8a8a'
    },

    item: {
        color: '#FFF'
    }
});