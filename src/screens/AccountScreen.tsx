import {ReactNode} from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

const shortcuts = [
  {label: 'Önceden Gezdiklerim', icon: 'clock'},
  {label: 'İndirim Kuponlarım', icon: 'coupon'},
  {label: 'Trendyol Asistan', icon: 'chat'},
  {label: 'Satıcı Mesajlarım', icon: 'mail'},
] as const;

function ShortcutIcon({name}: {name: (typeof shortcuts)[number]['icon']}) {
  if (name === 'clock') {
    return (
      <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={8} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M12 8v4.5l3 2" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  if (name === 'coupon') {
    return (
      <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <Path d="M4 9V6h16v3a2 2 0 010 4v3H4v-3a2 2 0 010-4z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
        <Path d="M12 7v10" stroke={colors.orange} strokeWidth={1.8} strokeDasharray="2 2" />
      </Svg>
    );
  }
  if (name === 'chat') {
    return (
      <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <Path d="M6 16.5V8.5A2.5 2.5 0 018.5 6h7A2.5 2.5 0 0118 8.5v5a2.5 2.5 0 01-2.5 2.5H10L6 19v-2.5z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={6} width={16} height={12} rx={2} stroke={colors.orange} strokeWidth={1.8} />
      <Path d="M5 7.5l7 5 7-5" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

const tiles = [
  {label: 'Tüm Siparişlerim', icon: 'box'},
  {label: 'Kazandıklarınla Yenilerini Al', icon: 'gift'},
  {label: 'Ürün & Sipariş Yorumlarım', icon: 'chat'},
  {label: 'Tekrar Satın Al', icon: 'cart'},
] as const;

function TileIcon({name}: {name: (typeof tiles)[number]['icon']}) {
  if (name === 'box') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path d="M4 8l8-4 8 4v10l-8 4-8-4V8z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
        <Path d="M4 8l8 4 8-4M12 12v10" stroke={colors.orange} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'gift') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Rect x={4} y={10} width={16} height={9} rx={1} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M4 10h16M12 10v9M12 10c-2-4-6-4-6-1s4 1 6 1zm0 0c2-4 6-4 6-1s-4 1-6 1z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'chat') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Rect x={4} y={5} width={16} height={11} rx={2} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M8 19l3-3h8" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M6 8h12l-1 11H7L6 8z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M9 8V7a3 3 0 016 0v1" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

const services = [
  {label: 'Trendyol Luxe', icon: 'diamond'},
  {label: 'Trendyol Plus', icon: 'plus'},
  {label: 'Krediler', icon: 'card'},
  {label: 'Paylaş Kazan', icon: 'share'},
  {label: 'Puan Bakiyesi', icon: 'crown'},
  {label: 'Finansal Çözümler', icon: 'people'},
  {label: 'Eski Cihazını Yenile', icon: 'refresh'},
] as const;

function ServiceIcon({name}: {name: (typeof services)[number]['icon']}) {
  const common = {width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' as const};
  if (name === 'diamond') {
    return (
      <Svg {...common}>
        <Path d="M4 9l8 11 8-11-3-5H7L4 9z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'plus') {
    return (
      <Svg {...common}>
        <Circle cx={12} cy={12} r={8} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M12 8v8M8 12h8" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  if (name === 'card') {
    return (
      <Svg {...common}>
        <Rect x={3} y={6} width={18} height={12} rx={2} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M3 10h18" stroke={colors.orange} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'share') {
    return (
      <Svg {...common}>
        <Circle cx={7} cy={12} r={2.2} stroke={colors.orange} strokeWidth={1.8} />
        <Circle cx={16} cy={7} r={2.2} stroke={colors.orange} strokeWidth={1.8} />
        <Circle cx={16} cy={17} r={2.2} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M9 11l5-3M9 13l5 3" stroke={colors.orange} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'crown') {
    return (
      <Svg {...common}>
        <Path d="M4 16l2-8 6 4 6-4 2 8H4z" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'people') {
    return (
      <Svg {...common}>
        <Circle cx={9} cy={9} r={2.4} stroke={colors.orange} strokeWidth={1.8} />
        <Circle cx={16} cy={10} r={2} stroke={colors.orange} strokeWidth={1.8} />
        <Path d="M4 18a5 5 0 0110 0M13 18a4 4 0 016-1" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg {...common}>
      <Path d="M20 12a8 8 0 11-2.2-5.5" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M20 5v5h-5" stroke={colors.orange} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const accountPurple = '#7B5CFF';

const accountLinks = [
  {label: 'Trendyol’u Keşfet!', icon: 'eyes'},
  {label: 'Takip Ettiğim Influencerlar', icon: 'star'},
  {label: 'Takip Ettiğim Mağazalar', icon: 'shop'},
  {label: 'Trendyol Seni Dinliyor', icon: 'check'},
  {label: 'Hesap Ayarlarım', icon: 'gear'},
  {label: 'Dil Değiştir', icon: 'language'},
  {label: 'Trendyol Influencer Programı', icon: 'heart'},
  {label: 'Güvenlik', icon: 'shield'},
] as const;

function AccountIcon({name}: {name: (typeof accountLinks)[number]['icon'] | 'help'}) {
  const common = {width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' as const};
  if (name === 'eyes') {
    return (
      <Svg {...common}>
        <Circle cx={8} cy={12} r={2} stroke={accountPurple} strokeWidth={1.8} />
        <Circle cx={16} cy={12} r={2} stroke={accountPurple} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'star') {
    return (
      <Svg {...common}>
        <Path d="M12 4l2.2 4.6 5 .7-3.6 3.5.9 5.1L12 15.8 7.5 18l.9-5.1L4.8 9.3l5-.7L12 4z" stroke={accountPurple} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'shop') {
    return (
      <Svg {...common}>
        <Path d="M4 10l2-5h12l2 5M5 10v9h14v-9" stroke={accountPurple} strokeWidth={1.8} strokeLinejoin="round" />
        <Path d="M10 19v-5h4v5" stroke={accountPurple} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'check') {
    return (
      <Svg {...common}>
        <Circle cx={12} cy={12} r={8} stroke={accountPurple} strokeWidth={1.8} />
        <Path d="M8.5 12.2l2.3 2.3 4.7-5" stroke={accountPurple} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'gear') {
    return (
      <Svg {...common}>
        <Circle cx={12} cy={12} r={3} stroke={accountPurple} strokeWidth={1.8} />
        <Path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4" stroke={accountPurple} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  if (name === 'language') {
    return (
      <Svg {...common}>
        <Path d="M5 7h8M9 7c0 5-3 8-6 9M9 7c1 3 3 5 6 6" stroke={accountPurple} strokeWidth={1.8} strokeLinecap="round" />
        <Path d="M13 17l3-7 3 7M14.2 15h3.6" stroke={accountPurple} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'heart') {
    return (
      <Svg {...common}>
        <Path d="M12 19s-7-4.4-7-8.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 14.6 12 19 12 19z" stroke={accountPurple} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'shield') {
    return (
      <Svg {...common}>
        <Path d="M12 4l7 3v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7l7-3z" stroke={accountPurple} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  return (
    <Svg {...common}>
      <Circle cx={12} cy={12} r={8} stroke={accountPurple} strokeWidth={1.8} />
      <Path d="M12 10.5V16M12 8h.01" stroke={accountPurple} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function MenuLine({label, icon, lined = true}: {label: string; icon?: ReactNode; lined?: boolean}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        gap: spacing.sm,
        borderTopWidth: lined ? 1 : 0,
        borderTopColor: colors.border,
      }}>
      {icon}
      <Text style={{flex: 1, color: colors.text, fontSize: 14}}>{label}</Text>
      <Text style={{color: colors.muted, fontSize: 18}}>›</Text>
    </View>
  );
}

export function AccountScreen() {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const pageInset = spacing.md;
  const tileGap = spacing.md;
  const tileWidth = (width - pageInset * 2 - tileGap) / 2;

  return (
    <View style={{flex: 1, backgroundColor: colors.page}}>
      <View style={{backgroundColor: colors.background, height: insets.top + spacing.md}} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: spacing.md,
          paddingHorizontal: pageInset,
          paddingBottom: spacing.lg,
          gap: spacing.sm,
        }}
        showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: colors.background, borderRadius: 16, padding: spacing.md}}>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: '700'}}>Merhaba,</Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{color: colors.text, fontSize: 13, marginTop: spacing.xs}}>
          Trendyol’a giriş yap veya hesap oluştur, indirimleri kaçırma!
        </Text>
        <View
          style={{
            marginTop: spacing.md,
            backgroundColor: colors.orange,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
          }}>
          <Text style={{color: colors.background, fontSize: 16, fontWeight: '700'}}>Giriş Yap / Üye Ol</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#1B1B1B',
          borderRadius: 12,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
        <View style={{flex: 1, gap: 2}}>
          <Text style={{color: '#FF4B6E', fontSize: 18, fontWeight: '800'}}>SADECE 1 TL</Text>
          <Text style={{color: colors.background, fontSize: 13}}>Trendyol Plus üyesi ol!</Text>
        </View>
        <View style={{backgroundColor: '#FF4FA3', borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.sm}}>
          <Text style={{color: colors.background, fontWeight: '700', fontSize: 13}}>Sepete Ekle</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: 12,
          paddingVertical: spacing.sm,
          flexDirection: 'row',
        }}>
        {shortcuts.map(item => (
          <View key={item.label} style={{flex: 1, alignItems: 'center', paddingHorizontal: spacing.xs, gap: spacing.sm}}>
            <ShortcutIcon name={item.icon} />
            <View style={{height: 30, justifyContent: 'flex-end'}}>
              <Text numberOfLines={2} style={{color: colors.text, fontSize: 11, lineHeight: 14, textAlign: 'center'}}>
                {item.label}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: tileGap}}>
        {tiles.map(tile => (
          <View
            key={tile.label}
            style={{
              width: tileWidth,
              backgroundColor: colors.background,
              borderRadius: 12,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.xs,
            }}>
            <TileIcon name={tile.icon} />
            <Text style={{flex: 1, color: colors.text, fontSize: 12}}>{tile.label}</Text>
            <Text style={{color: colors.muted, fontSize: 16}}>›</Text>
          </View>
        ))}
      </View>

      <View style={{backgroundColor: '#E81E63', borderRadius: 12, padding: spacing.sm}}>
        <Text style={{color: colors.background, fontSize: 20, fontWeight: '800'}}>Paylaş Kazan</Text>
        <Text style={{color: colors.background, fontSize: 16, fontWeight: '700'}}>yenilendi</Text>
      </View>

      <View style={{backgroundColor: colors.background, borderRadius: 12, paddingHorizontal: spacing.md}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}>
          <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>Hizmetlerim</Text>
          <Text style={{color: colors.orange, fontSize: 13, fontWeight: '700'}}>Tümünü Gör ›</Text>
        </View>
        {services.map(service => (
          <MenuLine key={service.label} label={service.label} icon={<ServiceIcon name={service.icon} />} lined={false} />
        ))}
      </View>

      <View style={{backgroundColor: colors.background, borderRadius: 12, paddingHorizontal: spacing.md}}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '700',
            paddingVertical: spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}>
          Hesabım
        </Text>
        {accountLinks.map(item => (
          <MenuLine key={item.label} label={item.label} icon={<AccountIcon name={item.icon} />} lined={false} />
        ))}
      </View>

      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: 12,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing.sm,
        }}>
        <AccountIcon name="help" />
        <Text style={{flex: 1, color: colors.text, fontSize: 14}}>Yardım & Sıkça Sorulan Sorular</Text>
        <Text style={{color: colors.muted, fontSize: 18}}>›</Text>
      </View>
      </ScrollView>
    </View>
  );
}
