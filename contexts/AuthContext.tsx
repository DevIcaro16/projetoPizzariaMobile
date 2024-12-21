import React, { useState, createContext, Children, ReactNode } from "react";

//Criando a Tipagem da Autenticação do Usuário

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
}

//Interface com os atributos da requisição de autenticação
type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( { children }: AuthProviderProps) {
    
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const isAuthenticated = !!user.name; //Confere se existe valor no atributo name do obj User e converte em valor booleano (true/false)

    return(

        //Componente que vai envolver todo o conteudo (de forma autenticada) da aplicação
        <AuthContext.Provider value= {{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
        
    )
}