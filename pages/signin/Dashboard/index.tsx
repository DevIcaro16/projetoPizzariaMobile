import React, { useContext, useState } from 'react';
import { 
        View, 
        Text, 
        Button, 
        SafeAreaView, 
        TouchableOpacity, 
        TextInput, 
        StyleSheet
} from 'react-native';

import { AuthContext } from '../../../contexts/AuthContext';
import Toast from 'react-native-toast-message';

//Hook do React-Native para a navegação entre as páginas / telas
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../../routes/app.routes";
import { api } from '../../../services/api';


export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState<string>("");

    const { SignOut } = useContext(AuthContext);

    async function openOrder() {
        if(number === ""){
            Toast.show({
                type: 'error',
                text1: 'Aviso',
                text2: 'Preencha O Número Da Mesa'
              });
              console.log('teste');
            return;
        }

        //Requisição Para a Abertura da Order / Pedido
        const response = await api.post("/order", {
            table: Number(number)
        });

        console.log(response.data);

        const numberResponse = response.data.table;
        const orderIdResponse = response.data.id;

        //Navega para a Página / Tela de Order e Passando os Parâmetros Necessários (Número da Mesa e id)
        navigation.navigate('Order', {
            number: numberResponse,
            order_id: orderIdResponse
        });

        setNumber('');
    }

    return (
        <SafeAreaView style={styles.container}>

           <Toast />

           <Text style={styles.title}>
                Novo Pedido
           </Text>

            <TextInput
                placeholder='Número Da Mesa'
                placeholderTextColor="#F0F0F0"
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={ (number) => setNumber(number) }
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: "#1D1D2E"
    },

    title:{
        fontSize: 30,
        color: "#FFF",
        fontWeight: 'bold',
        marginBottom: 24
    },

    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: "#FFF",

    },

    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        marginVertical: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText:{
        textAlign: 'center',
        color: '#101026',
        fontSize: 20,
        fontWeight: 'bold'
    }

});
