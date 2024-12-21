//Aruqivo TS que Gerencia o roteamento

import React from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { View, ActivityIndicator } from "react-native";

export default function Routes() {

  //Variável de autenticação
  const isAuthenticated  = false; 

  //Variável de carregamento
  const loading = false;

  if(loading){ //Se loading for true, exibe o spinner de carregamento
    return(
      <View style={{ 
                flex: 1,
                backgroundColor: "#1D1D2E",
                justifyContent: 'center',
                alignItems: 'center',
       }}>

       <ActivityIndicator size={70} color="#FFF"/>

      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}