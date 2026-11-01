import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Circle, Path} from 'react-native-svg';
import {productImageColor} from '../components/ProductCard';
import {products} from '../data/catalog';
import {TabParamList} from '../navigation/types';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {Product} from '../types/product';

function formatPrice(value: number) {
  const [lira, kurus] = value.toFixed(2).split('.');
  const grouped = lira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped},${kurus} TL`;
}

function SuggestedRow({product, imageWidth}: {product: Product; imageWidth: number}) {
  const oldPrice = Math.round(product.price * 1.12 * 100) / 100;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
      <View
        style={{
          width: imageWidth,
          height: imageWidth * 1.3,
          borderRadius: 8,
          backgroundColor: productImageColor(product.imageKey),
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.xs,
        }}>
        {product.imageUrl ? (
          <Image source={{uri: product.imageUrl}} style={{width: '100%', height: '100%'}} resizeMode="cover" />
        ) : null}
      </View>

      <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'space-between'}}>
        <Text numberOfLines={2} style={{color: colors.text, fontSize: 13}}>
          <Text style={{fontWeight: '700'}}>{product.brand} </Text>
          {product.name}
        </Text>
        <View style={{gap: 2}}>
          <Text style={{fontSize: 12}}>
            <Text style={{color: colors.star}}>{'★'.repeat(Math.round(product.rating))}</Text>
            <Text style={{color: colors.border}}>{'★'.repeat(5 - Math.round(product.rating))}</Text>
            <Text style={{color: colors.muted, fontSize: 11}}> ({Math.round(product.rating * 40)})</Text>
          </Text>
          <Text>
            <Text style={{color: colors.orange, fontWeight: '700', fontSize: 14}}>{formatPrice(product.price)} </Text>
            <Text style={{color: colors.muted, fontSize: 12, textDecorationLine: 'line-through'}}>
              {formatPrice(oldPrice)}
            </Text>
          </Text>
        </View>
      </View>

      <Pressable
        style={{
          alignSelf: 'flex-end',
          borderWidth: 1,
          borderColor: colors.orange,
          borderRadius: 8,
          minWidth: 108,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          alignItems: 'center',
        }}>
        <Text style={{color: colors.orange, fontWeight: '700', fontSize: 13}}>Sepete Ekle</Text>
      </Pressable>
    </View>
  );
}

export function CartScreen() {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const imageWidth = Math.round(Math.min(84, Math.max(64, width * 0.18)));
  const suggestions = products.slice(0, 4);

  return (
    <View style={{flex: 1, backgroundColor: colors.page}}>
      <View
        style={{
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.xs,
          paddingBottom: spacing.sm,
          paddingHorizontal: spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.08,
          shadowRadius: 3,
          elevation: 3,
          zIndex: 1,
        }}>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: '600'}}>Sepetim</Text>
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path d="M12 16V6M12 6l-3.5 3.5M12 6l3.5 3.5" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M6 14v4h12v-4" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: spacing.sm, paddingTop: spacing.sm, paddingBottom: spacing.lg}}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', paddingTop: spacing.lg, gap: spacing.sm}}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
              <Circle cx={9} cy={20} r={1.2} fill={colors.orange} />
              <Circle cx={17} cy={20} r={1.2} fill={colors.orange} />
              <Path d="M3 5h2l2.2 10.2a1 1 0 001 .8h8.6a1 1 0 001-.8L20 8H7" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
            </Svg>
          </View>
          <Text style={{color: 'gray', fontSize: 18, fontWeight: '600', marginTop: spacing.sm}}>Sepetim</Text>
          <Text style={{color: colors.muted, fontSize: 14}}>Sepetinizde ürün bulunmamaktadır</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{
            marginTop: spacing.lg,
            backgroundColor: colors.orange,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
          }}>
          <Text style={{color: colors.background, fontSize: 16, fontWeight: '700'}}>Alışverişe Devam Et</Text>
        </Pressable>

        <View
          style={{
            marginTop: spacing.lg,
            backgroundColor: colors.background,
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: spacing.sm,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text style={{color: colors.text, fontSize: 12, fontWeight: '600'}}>Önerilen Ürünler</Text>
            <Text style={{color: colors.orange, fontSize: 12, fontWeight: '600'}}>Tümünü Gör ›</Text>
          </View>
          {suggestions.map(product => (
            <SuggestedRow key={product.id} product={product} imageWidth={imageWidth} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
