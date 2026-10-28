import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function BottomBar({state, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{flexDirection: 'row', paddingBottom: insets.bottom}}>
      {state.routes.map((route, index) => {
        const selected = state.index === index;

        return (
          <Pressable
            key={route.key}
            accessibilityState={selected ? {selected: true} : {}}
            onPress={() => {
              if (!selected) {
                navigation.navigate(route.name);
              }
            }}
            style={{flex: 1, height: 56}}
          />
        );
      })}
    </View>
  );
}
