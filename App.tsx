import {SafeAreaView} from 'react-native';

import RegisterScreen from './src/screens/Register';
import VerifyPhoneScreen from './src/screens/VerifyPhone';
import AccountCreationSuccessScreen from './src/screens/AccountCreationSuccess';
import HomeScreen from './src/screens/Home';
import ProductDetailsScreen from './src/screens/ProductDetails';
import ShoppingCartScreen from './src/screens/ShoppingCart';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}> 
      <ShoppingCartScreen />
    </SafeAreaView>
  );
};

export default App;
