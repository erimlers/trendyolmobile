import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomBar} from '../layout/BottomBar';
import {TopBar} from '../layout/TopBar';
import {AccountScreen} from '../screens/AccountScreen';
import {CartScreen} from '../screens/CartScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {GoScreen} from '../screens/GoScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {OrderSuccessScreen} from '../screens/OrderSuccessScreen';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';
import {ProductListScreen} from '../screens/ProductListScreen';
import {RootStackParamList, TabParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: true, headerShadowVisible: false, header: () => <TopBar />}}
      />
      <Tab.Screen name="Go" component={GoScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}
