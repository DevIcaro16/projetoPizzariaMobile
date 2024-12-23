import React from "react";
import { 
        StyleSheet, 
        View, 
        Text,
        TouchableOpacity
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { api } from "../../../services/api";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamsList } from "../../../routes/app.routes";

type RouteDetailsParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
}; 

type FinishOrderRouteProp = RouteProp<RouteDetailsParams, "FinishOrder">;

export default function FinishOrder() {

    const route = useRoute<FinishOrderRouteProp>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish() {
        // console.log("handleFinish");

        try {

            //Requisição para o Fechamento / Finalização do Pedido
            const response = await api.put("/order/sendOrder", {
                order_id: route.params.order_id
            });

            console.log(response.data);

            //Redirecionamento Para a Tela de Abrir Mesa (dashboard do app)
            navigation.popToTop(); //Método do useNavgation Que Retorna Para a Tela de Início da Aplicação

        } catch (error) {
            console.log(`Erro ao Realizar a Requisição: ${error}`);
        }
    }

    return(
        <View style={styles.container}>

            <Text style={styles.alert}>
                Você Deseja Finalizar Esse Pedido?
            </Text>
            <Text style={styles.title}>
                MESA {route.params?.number}
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>
                    Finalizar Pedido
                </Text>

                <Feather
                    name="shopping-cart"
                    size={20}
                    color="#1D1D2E"
                />

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    alert: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24,
        textAlign: 'center'
    },

    title: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 24
    },

    button: {
        textAlign: 'center',
        backgroundColor: '#3FFFA3',
        flexDirection: 'row',
        width: '75%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButton: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#1D1D2E'
    }
});