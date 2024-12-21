//Arquivo TS das rotas internas do APP (Rotas Autenticadas)

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/signin/Dashboard";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
                name="Dashboard"
                component={Dashboard}
         />
    </Stack.Navigator>
  );
}
