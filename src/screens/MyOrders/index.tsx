import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Text, ScrollView} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AxiosRequestHeaders} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {useTranslation} from 'react-i18next';

import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Loader from '../../components/Loader';
import NoContentDisplay from '../../components/NoContentDisplay';
import PreviousOrders from '../../components/Cards/OrdersCard/PreviousOrders';
import UpcomingOrders from '../../components/Cards/OrdersCard/UpcomingOrders';

import {WHITE} from '../../constants/colors';
import VerticalSpace from '../../components/VerticalSpace';
import {hR, width, wR} from '../../constants/dimensions';
import {AppNavigationProps} from '../../constants/navigationTypes';
import useApiHook from '../../hooks/rest/useApi';
import {RootState} from '../../redux/store';
import {setOrderFields} from '../../redux/slices/order';
import {createDynamicSelector} from '../../redux/selectors';
import OrdersToggle from '../../components/Toggle/OrdersToggle';
import {ordersOptions} from '../../constants/misc';

const MyOrdersScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const tabBarHeight = useBottomTabBarHeight();
  const {handleRestApi, restApiLoading} = useApiHook();
  const selectAuthAddressOrder = createDynamicSelector([
    'auth',
    'order',
  ] as const);
  const {auth, order} = useSelector((state: RootState) =>
    selectAuthAddressOrder(state),
  );
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {t} = useTranslation();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [activeOrders, setActiveOrders] = useState('upcoming');

  useEffect(() => {
    if (isFocused) {
      getAllOrders();
    }
  }, [isFocused]);

  const getAllOrders = async () => {
    const data = {
      auth_token: auth.accessToken,
      login: auth.userName,
    };

    const response = await handleRestApi({
      method: 'post',
      url: 'order_view_all',
      data,
      headers: {Authorization: 'none'} as AxiosRequestHeaders,
    });

    if (response.data.result.status === 200) {
      dispatch(setOrderFields({orderList: response.data.result.order_list}));
    }

    setIsDataLoaded(true);
  };

  const handleOrdersToggle = (val: `previous` | `upcoming`) => {
    setActiveOrders(val);
  };

  const goToOrderDetails = useCallback(
    id => {
      navigation.navigate('OrderDetails', {orderID: id});
    },
    [navigation],
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WHITE,
      }}>
      {restApiLoading && <Loader />}

      <HeaderPrimary label={t(`MY_ORDERS.MY_ORDERS`)} onPress={goBack} />

      <VerticalSpace h={2} />

      {/* <View style={{ paddingHorizontal: wR * 4, flex: 1 }}>
        {!isDataLoaded || isEmpty(order?.orderList) ? (
          <>
            {!isDataLoaded ? null : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingBottom: tabBarHeight,
                }}
              >
                <NoContentDisplay
                  label={t(`MY_ORDERS.NO_ORDERS_AVAILABLE`)}
                  info={t(`MY_ORDERS.NO_ORDERS_MESSAGE`)}
                  displayActionButton={true}
                  actionButtonText={t(`MY_ORDERS.ORDER_NOW`)}
                  onActionButtonPress={goBack}
                />
              </View>
            )}
          </>
        ) : (
          <FlatList
            data={order?.orderList}
            renderItem={({ item }) => (
              <OrdersCard
                data={item}
                onOrderPress={() => goToOrderDetails(item?.orderID)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: tabBarHeight }} />}
          />
        )}
      </View> */}

      <View style={{paddingHorizontal: wR * 4}}>
        <OrdersToggle options={ordersOptions} onPress={handleOrdersToggle} />
      </View>

      <VerticalSpace h={2} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[...Array(6)]}
        keyExtractor={(_, index) => index}
        renderItem={({_}) =>
          activeOrders === `upcoming` ? <UpcomingOrders /> : <PreviousOrders />
        }
        windowSize={10}
        removeClippedSubviews={true}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default MyOrdersScreen;
