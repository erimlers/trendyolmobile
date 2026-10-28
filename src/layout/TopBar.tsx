import {useRef, useState} from 'react';
import {Animated, Dimensions, Modal, Pressable, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

type TopBarProps = {
  // Doluysa sol ikon geri oku olur. Boşsa menü çizgisi olur.
  onBack?: () => void;
};

// Üç yatay çizgi.
function MenuIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7h16M4 12h16M4 17h16" stroke={colors.text} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// Turuncu büyüteç.
function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={6.5} stroke={colors.orange} strokeWidth={2} />
      <Path d="M16 16l4 4" stroke={colors.orange} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// Turuncu fotoğraf makinesi.
function CameraIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M8 7l1.2-2h5.6L16 7" stroke={colors.orange} strokeWidth={1.8} strokeLinejoin="round" />
      <Rect x={4} y={7} width={16} height={12} rx={2} stroke={colors.orange} strokeWidth={1.8} />
      <Circle cx={12} cy={13} r={3} stroke={colors.orange} strokeWidth={1.8} />
    </Svg>
  );
}

function MailIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={6} width={18} height={12} rx={2} stroke={colors.text} strokeWidth={1.8} />
      <Path d="M4 7l8 6 8-6" stroke={colors.text} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

function BellIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16z" stroke={colors.text} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M10 19a2 2 0 004 0" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function BackIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 6l-6 6 6 6" stroke={colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TopBar({onBack}: TopBarProps) {
  // Çentik ve durum çubuğu kadar yukarıdan boşluk.
  const insets = useSafeAreaInsets();
  // Hook değil; ekran genişliğini bir kez okur. Menü bu genişliğin %78'i.
  const menuWidth = Dimensions.get('window').width * 0.78;

  const [menuOpen, setMenuOpen] = useState(false);
  // 0 = solda gizli, 1 = açık. Bu sayı kaymayı yönetir.
  const progress = useRef(new Animated.Value(0)).current;

  function openMenu() {
    progress.setValue(0);
    setMenuOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  function closeMenu() {
    Animated.timing(progress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  }

  // Panel ekranın solundan içeri girer.
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-menuWidth, 0],
  });

  return (
    <View style={{backgroundColor: colors.background, paddingTop: insets.top}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          gap: spacing.sm,
        }}>
        <Pressable
          onPress={onBack ?? openMenu}
          style={{width: 36, height: 40, alignItems: 'center', justifyContent: 'center'}}>
          {onBack ? <BackIcon /> : <MenuIcon />}
        </Pressable>

        {/* Gri arama kutusu: ikon, yazı, fotoğraf ikonu. */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.input,
            borderRadius: 20,
            paddingHorizontal: spacing.sm,
            height: 40,
            gap: spacing.sm,
          }}>
          <SearchIcon />
          <TextInput
            placeholder="Ara"
            placeholderTextColor={colors.muted}
            style={{flex: 1, color: colors.text, padding: 0, fontSize: 15}}
          />
          <CameraIcon />
        </View>

        <Pressable style={{width: 32, height: 40, alignItems: 'center', justifyContent: 'center'}}>
          <MailIcon />
        </Pressable>
        <Pressable style={{width: 32, height: 40, alignItems: 'center', justifyContent: 'center'}}>
          <BellIcon />
        </Pressable>
      </View>

      {/* Menü, sayfanın üstünde duran şeffaf bir katman. */}
      <Modal visible={menuOpen} transparent animationType="none" onRequestClose={closeMenu}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <Animated.View
            style={{
              width: menuWidth,
              height: '100%',
              backgroundColor: colors.background,
              transform: [{translateX}],
            }}
          />
          {/* Panelin sağındaki karanlık alana basınca menü kapanır. */}
          <Pressable style={{position: 'absolute', left: menuWidth, top: 0, right: 0, bottom: 0}} onPress={closeMenu} />
        </View>
      </Modal>
    </View>
  );
}
