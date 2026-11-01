import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Product} from '../types/product';
import {colors} from '../theme/colors';

const imageColors: Record<string, string> = {
  ayakkabi: '#E7EEF6',
  tisort: '#F3E8DC',
  ceket: '#E4E7EF',
  elbise: '#F8E4EA',
  canta: '#F6E7D8',
  kulaklik: '#E8E8F4',
  saat: '#EEE8F6',
  lamba: '#F8F0D8',
  nevresim: '#E5F0EA',
  krem: '#FDE8EF',
  ruj: '#F8D5DE',
  mat: '#E7F2EA',
  sort: '#E8F0F8',
  bluz: '#F6E4EC',
  powerbank: '#ECECEC',
};

export function productImageColor(imageKey: string) {
  return imageColors[imageKey] ?? colors.input;
}

function formatPrice(value: number) {
  const [lira, kurus] = value.toFixed(2).split('.');
  const grouped = lira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped},${kurus} TL`;
}

function Stars({rating}: {rating: number}) {
  const filled = Math.round(rating);
  return (
    <Text style={{color: colors.star, fontSize: 12}}>
      {'★'.repeat(filled)}
      <Text style={{color: colors.border}}>{'★'.repeat(5 - filled)}</Text>
    </Text>
  );
}

export function ProductCard({product, width = 140}: {product: Product; width?: number}) {
  const [liked, setLiked] = useState(false);
  const oldPrice = Math.round(product.price * 1.12 * 100) / 100;

  return (
    <View
      style={{
        width,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: colors.background,
        overflow: 'hidden',
      }}>
      <View
        style={{
          height: 150,
          backgroundColor: productImageColor(product.imageKey),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => setLiked(value => !value)}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill={liked ? colors.orange : 'none'}>
            <Path
              d="M12 19s-7-4.4-7-8.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 14.6 12 19 12 19z"
              stroke={liked ? colors.orange : colors.muted}
              strokeWidth={1.8}
            />
          </Svg>
        </Pressable>
        <Text style={{color: colors.muted, fontSize: 12}}>{product.brand}</Text>
      </View>

      <View style={{backgroundColor: colors.orange, paddingVertical: 3}}>
        <Text style={{color: colors.background, fontSize: 11, fontWeight: '700', textAlign: 'center'}}>
          En Çok Satan  #1
        </Text>
      </View>

      <View style={{padding: 8, gap: 4}}>
        <Text numberOfLines={2} style={{color: colors.text, fontSize: 13, minHeight: 34}}>
          <Text style={{fontWeight: '700'}}>{product.brand} </Text>
          {product.name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Stars rating={product.rating} />
          <Text style={{color: colors.muted, fontSize: 11}}>({Math.round(product.rating * 40)}) 📷</Text>
        </View>
        <Text style={{color: colors.muted, fontSize: 12, textDecorationLine: 'line-through'}}>
          {formatPrice(oldPrice)}
        </Text>
        <Text style={{color: colors.orange, fontSize: 16, fontWeight: '700'}}>{formatPrice(product.price)}</Text>
      </View>
    </View>
  );
}
