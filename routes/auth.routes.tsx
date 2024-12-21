//Arquivo TS para as rotas que não são autenticadas (Rota de Login)

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../pages/signin";

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
               name="SignIn" 
               component={Signin}
               options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
