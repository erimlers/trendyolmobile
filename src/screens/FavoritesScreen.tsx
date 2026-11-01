import {ReactNode} from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {ProductCard} from '../components/ProductCard';
import {products} from '../data/catalog';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

function HeartBadge() {
  return (
    <View
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Svg width={28} height={28} viewBox="0 0 24 24" fill={colors.orange}>
        <Path d="M12 19s-7-4.4-7-8.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 14.6 12 19 12 19z" />
      </Svg>
    </View>
  );
}

function Perk({icon, label}: {icon: ReactNode; label: string}) {
  return (
    <View style={{flex: 1, alignItems: 'center', gap: 6}}>
      {icon}
      <Text style={{color: colors.text, fontSize: 12, textAlign: 'center'}}>{label}</Text>
    </View>
  );
}

export function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const cardWidth = (width - spacing.md * 2 - spacing.sm) / 2;

  return (
    <View style={{flex: 1, backgroundColor: colors.page}}>
      <View
        style={{
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.md,
          paddingBottom: spacing.md,
          paddingHorizontal: spacing.md,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 3,
          zIndex: 1,
        }}>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: '600'}}>Favorilerim</Text>
      </View>

      <ScrollView
        style={{flex: 1, backgroundColor: colors.page}}
        contentContainerStyle={{paddingTop: spacing.md, paddingBottom: spacing.lg}}
        showsVerticalScrollIndicator={false}>

      <View
        style={{
          marginHorizontal: spacing.md,
          backgroundColor: '#FFF4EC',
          borderRadius: 16,
          padding: spacing.md,
          alignItems: 'center',
          gap: spacing.md,
        }}>
        <HeartBadge />
        <Text style={{color: colors.text, fontSize: 16, fontWeight: '700', textAlign: 'center'}}>
          Daha iyi bir deneyim için giriş yap!
        </Text>
        <View style={{flexDirection: 'row', gap: spacing.sm}}>
          <Perk
            label="Favorilerini takip et"
            icon={
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16z" stroke={colors.orange} strokeWidth={1.8} />
              </Svg>
            }
          />
          <Perk
            label="Fiyat düşünce haberin olsun"
            icon={
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M5 7h10l-2-2M15 7l-2 2M19 17H9l2 2M9 17l2-2" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
              </Svg>
            }
          />
          <Perk
            label="Kupon ve fırsatlar"
            icon={
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Rect x={3} y={7} width={18} height={10} rx={2} stroke={colors.orange} strokeWidth={1.8} />
                <Circle cx={12} cy={12} r={1.4} fill={colors.orange} />
              </Svg>
            }
          />
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            backgroundColor: colors.orange,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
          }}>
          <Text style={{color: colors.background, fontSize: 15, fontWeight: '700'}}>Giriş Yap</Text>
        </View>
      </View>

      <Text
        style={{
          color: colors.text,
          fontSize: 17,
          fontWeight: '500',
          paddingHorizontal: spacing.md,
          paddingTop: spacing.lg,
          paddingBottom: spacing.sm,
        }}>
        Popüler Ürünler
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
        }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} width={cardWidth} />
        ))}
      </View>
      </ScrollView>
    </View>
  );
}
