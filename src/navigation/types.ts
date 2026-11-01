import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  ProductList: {categoryId: string};
  ProductDetail: {productId: string};
  OrderSuccess: undefined;
};

export type TabParamList = {
  Home: undefined;
  Go: undefined;
  Favorites: undefined;
  Cart: undefined;
  Account: undefined;
};
