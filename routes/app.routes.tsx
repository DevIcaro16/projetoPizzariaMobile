//Arquivo TS das rotas internas do APP (Rotas Autenticadas)

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/signin/Dashboard";
import Order from "../pages/signin/Order";
import FinishOrder from "../pages/signin/FinishOrder";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: number | string,
    order_id: string
  };
  FinishOrder: {
    number: number | string;
    order_id: string;
  };
}

const Stack = createNativeStackNavigator<StackParamsList>();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
      />
      <Stack.Screen 
                name="Order"
                component={Order}
                options={{ headerShown: false }}
      />
      <Stack.Screen 
                name="FinishOrder"
                component={FinishOrder}
                options={{
                    title: 'Finalizar Pedido',
                    headerStyle: {
                      backgroundColor: '#1D1D2E'
                    },
                    headerTintColor: '#FFF'
                }}
      />
    </Stack.Navigator>
  );
}
