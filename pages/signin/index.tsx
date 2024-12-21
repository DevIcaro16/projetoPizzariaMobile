import React, { useContext, useState } from "react";
import { 
        View, 
        Text, 
        StyleSheet, 
        Image, 
        TextInput, 
        TouchableOpacity
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";


// Componente que Representa a Tela de Login (SignIn)

export default function Signin() {

    //Contexto de Autenticação do Usuário
    const { user } = useContext(AuthContext);

    //States

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleLogin() {

        if(email === "" || password === ""){
            return;
        }
        
        console.log(`Email: ${email} \n Password: ${password}`);
    }

    //OSB: O React Native Tem Seus Própios Componentes Para Impressão De Tela Mobile
    // View -> Componente do React Native que conterá os demais componentes de Impressão
    // Text -> Componente do React Native para Impressão de Textos

    return(

        <View style={styles.container}>
            {/* <Text style={styles.text}>
                Tela de Login!
            </Text> */}
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

            {/* <Text style={{ color: '#FFF' }}>{user?.email}</Text> */}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Digite seu E-mail"
                    style={styles.input}
                    placeholderTextColor="#F0F0F0"
                    value={email}
                    onChangeText={ (email) => setEmail(email) }
                />

                <TextInput
                    placeholder="Digite sua Senha"
                    style={styles.input}
                    placeholderTextColor="#F0F0F0"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={ (password) => setPassword(password) }
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>
                    Acessar
                </Text>
            </TouchableOpacity>

        </View>
    );    
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1D1D2E"
    },

    logo:{
        marginBottom: 18
    },

   inputContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16
   },

   input: {
        width: '100%',
        height: 40,
        backgroundColor: "#101026",
        marginBottom: 16,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: "#FFF",
   },

   button:{
        width: '90%',
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
   },

   buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#101026"
   }

});