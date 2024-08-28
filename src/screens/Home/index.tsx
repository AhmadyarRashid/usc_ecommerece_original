import {
  FlatList,
  FlatListComponent,
  ScrollView,
  Text,
  View,
} from 'react-native';

import HeaderSecondary from '../../components/Header/HeaderSecondary';
import SearchBox from '../../components/SearchBox';
import SectionTitleWithAction from './components/SectionTitleWithAction';
import CategoriesCard from '../../components/Cards/CategoriesCard';
import ProductsCard from '../../components/Cards/ProductsCard';
import VerticalSpace from '../../components/VerticalSpace';

import {
  AMBROSIA_IVORY,
  HEAVY_SUGAR,
  PERFUME_HAZE,
  POUTY_PURPLE,
  SAND_MUFFIN,
  SNARKY_MINT,
  WHITE,
} from '../../constants/colors';
import {wR} from '../../constants/dimensions';

const CATEGORIES_DATA = [
  {
    label: 'Fruits\n& Vegetables',
    category: 'Fruits & Veg items',
    borderColor: SNARKY_MINT,
    bgColor: HEAVY_SUGAR,
  },
  {
    label: 'Home\n& Cleaning',
    category: 'Cleaning Product',
    borderColor: SAND_MUFFIN,
    bgColor: AMBROSIA_IVORY,
  },
  {
    label: 'Stationary\n& Office',
    category: 'Stationary Product',
    borderColor: POUTY_PURPLE,
    bgColor: PERFUME_HAZE,
  },
];

const PRODUCTS_DATA = [
  {
    label: 'Dishwashing Liquid Pro 220ml',
    price: 'PKR 200',
  },
  {
    label: 'Doctor Toothpaste',
    price: 'PKR 150',
  },
  {
    label: 'Kolson Macaroni 500mg',
    price: 'PKR 350',
  },
  {
    label: 'Banaspati Oil 5kg',
    price: 'PKR 150',
  },
];

const HomeScreen = () => {
  return (
    <View style={{backgroundColor: WHITE, flex: 1}}>
      <HeaderSecondary />

      <ScrollView contentContainerStyle={{paddingHorizontal: wR * 4}} showsVerticalScrollIndicator={false}>
        <VerticalSpace h={2} />

        <SearchBox placeholder={`Search anything you want`} />

        <VerticalSpace h={4} />

        <SectionTitleWithAction title={`Explore Categories`} />

        <VerticalSpace h={2} />

        <FlatList
          data={CATEGORIES_DATA}
          renderItem={({item}) => <CategoriesCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={4} />

        <SectionTitleWithAction title={`Fresh Sale`} />

        <VerticalSpace h={2} />

        <FlatList
          data={PRODUCTS_DATA}
          renderItem={({item}) => <ProductsCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={4} />

        <SectionTitleWithAction title={`Frequently Ordered`} />

        <VerticalSpace h={2} />

        <FlatList
          data={PRODUCTS_DATA}
          renderItem={({item}) => <ProductsCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <VerticalSpace h={2} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
