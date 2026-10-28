import {ScrollView, View} from 'react-native';
import {CategoryRow} from '../components/CategoryRow';
import {colors} from '../theme/colors';

export function HomeScreen() {
  return (
    // Üst çubuk sabit. Bu kaydırma alanının içindeki şerit aşağı inince gider.
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <CategoryRow />
      <View style={{height: 900}} />
    </ScrollView>
  );
}
