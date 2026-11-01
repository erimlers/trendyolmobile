import {useState} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {categories} from '../data/catalog';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export function CategoryRow() {
  const [selectedId, setSelectedId] = useState('erkek');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
      }}>
      {categories.map(category => {
        const selected = category.id === selectedId;

        return (
          <Pressable
            key={category.id}
            onPress={() => setSelectedId(category.id)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: selected ? colors.orange : colors.border,
              backgroundColor: selected ? colors.orange : colors.background,
            }}>
            <Text style={{color: selected ? colors.background : colors.text, fontSize: 14}}>
              {category.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
