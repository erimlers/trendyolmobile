import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../theme/colors';

const labels: Record<string, string> = {
  Home: 'Anasayfa',
  Go: 'Trendyol Go',
  Favorites: 'Favorilerim',
  Cart: 'Sepetim',
  Account: 'Hesabım',
};

function HomeIcon({color}: {color: string}) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

function HeartIcon({color}: {color: string}) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M12 19s-7-4.4-7-8.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 14.6 12 19 12 19z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

function BagIcon({color}: {color: string}) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M6 8h12l-1 12H7L6 8z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M9 8V7a3 3 0 016 0v1" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function UserIcon({color}: {color: string}) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3} stroke={color} strokeWidth={1.8} />
      <Path d="M5 19a7 7 0 0114 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function GoIcon() {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: '#06C167',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 13, fontWeight: '800'}}>go</Text>
    </View>
  );
}

function TabIcon({name, color}: {name: string; color: string}) {
  if (name === 'Home') {
    return <HomeIcon color={color} />;
  }
  if (name === 'Go') {
    return <GoIcon />;
  }
  if (name === 'Favorites') {
    return <HeartIcon color={color} />;
  }
  if (name === 'Cart') {
    return <BagIcon color={color} />;
  }
  return <UserIcon color={color} />;
}

export function BottomBar({state, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 6,
        paddingBottom: insets.bottom,
      }}>
      {state.routes.map((route, index) => {
        const selected = state.index === index;
        const color = selected && route.name !== 'Go' ? colors.orange : colors.text;

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              if (!selected) {
                navigation.navigate(route.name);
              }
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2}}>
            <TabIcon name={route.name} color={color} />
            <Text style={{fontSize: 10, color, textAlign: 'center'}}>{labels[route.name]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
