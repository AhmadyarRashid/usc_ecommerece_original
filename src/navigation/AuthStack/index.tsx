import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {isEmpty} from 'lodash';
import React from 'react';

import RegisterScreen from '../../screens/Register';
import VerifyPhoneScreen from '../../screens/VerifyPhone';
import AccountCreationSuccessScreen from '../../screens/AccountCreationSuccess';
import AppBottomTab from '../AppBottomTab';
import AddressStack from '../AddressStack';
import ExploreStack from '../ExploreStack';
import SelectLanguageScreen from '../../screens/SelectLanguage';
import WelcomeScreen from '../../screens/Welcome';

import useDynamicSliceSelector from '../../hooks/useDynamicSliceSelector';

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  const {auth, address} = useDynamicSliceSelector(['auth', 'address']);

  const routeToAddress = isEmpty(address?.addressList);

  const initialRouteName = auth?.accessToken
    ? routeToAddress
      ? 'Address'
      : 'AppBottomTab'
    : 'Welcome';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguageScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
      <Stack.Screen
        name="AccountCreationSuccess"
        component={AccountCreationSuccessScreen}
      />
      <Stack.Screen name="Address" component={AddressStack} />
      <Stack.Screen name="AppBottomTab" component={AppBottomTab} />
      <Stack.Screen name="Explore" component={ExploreStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;
