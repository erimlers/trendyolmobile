import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import {Image, Pressable, ScrollView, Share, Text, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {ProductCard, productImageColor} from '../components/ProductCard';
import {products} from '../data/catalog';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const colorSlideCount = 3;

function formatPrice(value: number) {
  const [lira, kurus] = value.toFixed(2).split('.');
  const grouped = lira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped},${kurus} TL`;
}

export function ProductDetailScreen({route, navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const product = products.find(item => item.id === route.params.productId);
  const [liked, setLiked] = useState(false);
  const [slide, setSlide] = useState(0);

  if (!product) {
    return (
      <View style={{flex: 1, backgroundColor: colors.page, paddingTop: insets.top, padding: spacing.md}}>
        <Text style={{color: colors.text}}>Ürün bulunamadı.</Text>
      </View>
    );
  }

  const oldPrice = Math.round(product.price * 1.12 * 100) / 100;
  const filled = Math.round(product.rating);
  const reviewCount = Math.round(product.rating * 40);
  const related = products.filter(item => item.id !== product.id && item.categoryId === product.categoryId);
  const slideCount = product.imageUrl ? 1 : colorSlideCount;

  return (
    <View style={{flex: 1, backgroundColor: colors.page}}>
      <View
        style={{
          paddingTop: insets.top + spacing.xs,
          paddingBottom: spacing.sm,
          paddingHorizontal: spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          backgroundColor: colors.background,
        }}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M15 6l-6 6 6 6" stroke={colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.input,
            justifyContent: 'center',
            paddingHorizontal: spacing.md,
          }}>
          <Text style={{color: colors.muted, fontSize: 13}}>Marka, ürün veya kategori ara</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Tabs', {screen: 'Cart'})} hitSlop={8}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M6 8h12l-1 12H7L6 8z" stroke={colors.text} strokeWidth={1.8} strokeLinejoin="round" />
            <Path d="M9 8V7a3 3 0 016 0v1" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
          </Svg>
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={() => Share.share({message: `${product.brand} ${product.name}`})}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M12 16V6M12 6l-3.5 3.5M12 6l3.5 3.5" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
            <Path d="M6 14v4h12v-4" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: spacing.md, gap: spacing.sm}}>
        <View style={{backgroundColor: colors.background}}>
          <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => setSlide(Math.round(event.nativeEvent.contentOffset.x / width))}>
            {Array.from({length: slideCount}, (_, index) => (
              <View
                key={index}
                style={{
                  width,
                  height: 460,
                  backgroundColor: product.imageUrl ? colors.background : productImageColor(product.imageKey),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {product.imageUrl ? (
                  <Image source={{uri: product.imageUrl}} style={{width: '100%', height: '100%'}} resizeMode="contain" />
                ) : null}
              </View>
            ))}
          </ScrollView>
          <Pressable
            onPress={() => setLiked(value => !value)}
            style={{
              position: 'absolute',
              top: spacing.md,
              right: spacing.md,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill={liked ? colors.orange : 'none'}>
              <Path
                d="M12 19s-7-4.4-7-8.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 14.6 12 19 12 19z"
                stroke={liked ? colors.orange : colors.muted}
                strokeWidth={1.8}
              />
            </Svg>
          </Pressable>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: spacing.md, alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: 'rgba(160,160,160,0.85)',
                borderRadius: 12,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              {Array.from({length: slideCount}, (_, index) => (
                <View
                  key={index}
                  style={{
                    width: index === slide ? 8 : 5,
                    height: index === slide ? 8 : 5,
                    borderRadius: 4,
                    backgroundColor: colors.background,
                  }}
                />
              ))}
            </View>
          </View>
          </View>
          <View style={{height: 1, backgroundColor: colors.border}} />
          <View style={{padding: spacing.md, gap: spacing.sm}}>
          <Text style={{color: colors.text, fontSize: 16}}>
            <Text style={{fontWeight: '700'}}>{product.brand} </Text>
            {product.name}
          </Text>
          <Text style={{color: colors.muted, fontSize: 13, textDecorationLine: 'line-through'}}>{formatPrice(oldPrice)}</Text>
          <Text style={{color: colors.orange, fontSize: 22, fontWeight: '700'}}>{formatPrice(product.price)}</Text>
          <Text style={{fontSize: 14}}>
            <Text style={{color: colors.text, fontWeight: '700'}}>{product.rating.toFixed(1)} </Text>
            <Text style={{color: colors.star}}>{'★'.repeat(filled)}</Text>
            <Text style={{color: colors.border}}>{'★'.repeat(5 - filled)}</Text>
            <Text style={{color: colors.muted}}>  {reviewCount} Değerlendirme</Text>
          </Text>
          <Text style={{color: colors.orange, fontSize: 13, fontWeight: '600'}}>
            {reviewCount * 12} kişi favoriledi
          </Text>
          </View>
        </View>

        <View style={{backgroundColor: colors.background, padding: spacing.md, gap: spacing.md}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text, fontSize: 14}}>
              Satıcı: <Text style={{color: '#2F5BFF', fontWeight: '700'}}>admin</Text>
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#FF4FA3',
                borderRadius: 8,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
              }}>
              <Text style={{color: '#FF4FA3', fontSize: 12, fontWeight: '700'}}>Takip Et Kazan</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M5 16V8a2 2 0 012-2h8l4 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2z" stroke={colors.orange} strokeWidth={1.8} />
            </Svg>
            <Text style={{color: colors.orange, fontWeight: '700'}}>{reviewCount} Soru & Cevap ›</Text>
          </View>
          <Text style={{color: colors.text, fontSize: 13}}>
            Sipariş verirsen en geç <Text style={{color: '#16A34A', fontWeight: '700'}}>yarın kargoda!</Text>
          </Text>
          <View
            style={{
              backgroundColor: colors.input,
              borderRadius: 8,
              padding: spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.sm,
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: colors.muted, fontSize: 12}}>Tahmini Teslimat</Text>
              <Text style={{color: colors.text, fontSize: 13, fontWeight: '700'}}>İki Gün İçinde Kapında!</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.orange,
                borderRadius: 16,
                paddingHorizontal: spacing.sm,
                paddingVertical: 6,
              }}>
              <Text style={{color: colors.orange, fontSize: 12, fontWeight: '600'}}>Türkiye</Text>
            </View>
          </View>
          <Text style={{color: colors.text, fontSize: 13}}>
            Bu ürün <Text style={{fontWeight: '700', textDecorationLine: 'underline'}}>admin</Text> tarafından gönderilecektir.
          </Text>
          <View style={{height: 1, backgroundColor: colors.border}} />
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>Diğer Satıcılar</Text>
            <Text style={{color: colors.orange, fontWeight: '700'}}>Tümü (3) ›</Text>
          </View>
        </View>

        <View style={{backgroundColor: colors.background, padding: spacing.md, gap: spacing.sm}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>Ürün Değerlendirmeleri</Text>
            <Text style={{color: colors.orange, fontWeight: '700'}}>Tümü ({reviewCount}) ›</Text>
          </View>
          <Text style={{fontSize: 16}}>
            <Text style={{color: colors.text, fontWeight: '700', fontSize: 22}}>{product.rating.toFixed(1)} </Text>
            <Text style={{color: colors.star}}>{'★'.repeat(filled)}</Text>
            <Text style={{color: colors.border}}>{'★'.repeat(5 - filled)}</Text>
            <Text style={{color: colors.muted, fontSize: 13}}>  {reviewCount} Yorum</Text>
          </Text>
          <View style={{backgroundColor: '#F4F0FF', borderRadius: 12, padding: spacing.md, gap: spacing.xs}}>
            <Text style={{color: '#3D4BFF', fontWeight: '700'}}>Değerlendirme Özeti</Text>
            <Text style={{color: colors.text, fontSize: 14}}>
              Kullanıcılar ürünün fiyatına göre beklentiyi karşıladığını belirtiyor.
            </Text>
            <Text style={{color: colors.text, fontSize: 14}}>Görünüşü ve kullanımı olumlu bulunmuş.</Text>
          </View>
        </View>

        <View style={{backgroundColor: colors.background, paddingVertical: spacing.md}}>
          <Text style={{color: colors.text, fontSize: 17, fontWeight: '700', paddingHorizontal: spacing.md, paddingBottom: spacing.sm}}>
            Benzer Ürünler
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: spacing.md, gap: spacing.sm}}>
            {related.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onPress={() => navigation.push('ProductDetail', {productId: item.id})}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          paddingHorizontal: spacing.md,
          paddingTop: spacing.sm,
          paddingBottom: insets.bottom + spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        }}>
        <View>
          <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>{formatPrice(product.price)}</Text>
          <Text style={{color: '#16A34A', fontSize: 12, fontWeight: '600'}}>Kargo bedava</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('OrderSuccess')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            borderWidth: 1,
            borderColor: colors.orange,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: spacing.sm,
          }}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M6 8h12l-1 11H7L6 8z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
            <Path d="M9 8V7a3 3 0 016 0v1" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
          </Svg>
          <Text style={{color: colors.orange, fontWeight: '700'}}>Şimdi Al</Text>
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: colors.orange,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
          }}>
          <Text style={{color: colors.background, fontWeight: '700'}}>Sepete Ekle</Text>
        </Pressable>
      </View>
    </View>
  );
}
