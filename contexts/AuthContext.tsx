import React, { useState, useEffect, createContext, Children, ReactNode } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Criando a Tipagem da Autenticação do Usuário

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
    SignIn: (credentials: SigInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    SignOut: () => Promise<void>
}

//Interface com os atributos da requisição de autenticação
type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
};

type AuthProviderProps = {
    children: ReactNode;
};

type SigInProps = {
    email: string;
    password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( { children }: AuthProviderProps) {
    
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const isAuthenticated = !!user.name; //Confere se existe valor no atributo name do obj User e converte em valor booleano (true/false)

    //useEffect para sempre que o usuário entrar no app se feita a verificação / autenticação dos seus dados
    useEffect( () => {

        async function getUser() {
            //Retornar os Dados Salvos do Usuário

            const userInfo = await AsyncStorage.getItem('@DevIcaro19');

            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            //Se o objeto possui algum conteudo em um de seus atributos
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
            }

            setUser({
                id: hasUser.id,
                name: hasUser.name,
                email: hasUser.email,
                token: hasUser.token
            });

            setLoading(false);

        }

        //Retorna as informações do Usuário autenticado (para ele não fazer Login);
        getUser();

    }, []);

    async function SignIn({ email, password }: SigInProps ) {
        // console.log(email);
        // console.log(password);

        setLoadingAuth(true);

        try {
            
            const response = await api.post('/session', {
                email,
                password
            });

            // console.log(response.data);

            const { id, name, token } = response.data;

            //Convertendo as informações do Usuário (obj) para uma string e assim colocá-la no AsyncStorage (Só aceita string)
            const data = {
                ...response.data
            }

            const dataFormat = JSON.stringify(data);

            const localStorage = await AsyncStorage.setItem('@DevIcaro19', dataFormat);

            //Armazenando o token de sessão no cabeçalho das próximas chamadas da api (acesso a outras rotas)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
                token
            });

            setLoadingAuth(false);

        } catch (error) {
            console.log(`Erro ao Realizar a Requisição! ${error}`);
            setLoadingAuth(false);
        }
    }

    //Função / Método de LogOut do Usuário

    async function SignOut() {

        //Limpa o localStorage

        const clearLocalStorage = await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            });
        })
        .catch((error) => {
            console.log(error);
         });
    }

    return(

        //Componente que vai envolver todo o conteudo (de forma autenticada) da aplicação
        <AuthContext.Provider value= {{ 
                                        user, 
                                        isAuthenticated,
                                        SignIn,
                                        loadingAuth,
                                        loading,
                                        SignOut
                                    }}>
            {children}
        </AuthContext.Provider>
        
    )
}