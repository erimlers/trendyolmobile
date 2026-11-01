import {Pressable, ScrollView, Text, View} from 'react-native';
import {CategoryRow} from '../components/CategoryRow';
import {ProductCard} from '../components/ProductCard';
import {products} from '../data/catalog';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export function HomeScreen() {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors.background}}
      showsVerticalScrollIndicator={false}>
      <CategoryRow />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.sm,
          paddingTop: spacing.lg,
          paddingBottom: spacing.sm,
        }}>
        <Text style={{fontSize: 17, fontWeight: '500', color: colors.text}}>Popüler Ürünler</Text>
        <Pressable>
          <Text style={{color: colors.orange, fontWeight: '700'}}>Tümünü Gör ›</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: spacing.sm, gap: spacing.sm, paddingBottom: spacing.lg}}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
