import { StyleSheet, View, StatusBar } from 'react-native';
// import Signin from './pages/signin'; // Importação Do Componente da Tela de Login
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes/index';

import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (

    //OBS: Todas as Rotas estão dentro do AuthProvider (Autenticação)
    <NavigationContainer>
      <AuthProvider>
        <StatusBar 
            backgroundColor="#1d1d2e" 
            barStyle="light-content" 
            translucent={false}     
        />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  ); 
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
