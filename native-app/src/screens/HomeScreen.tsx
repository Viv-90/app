import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import { currentUser } from '../data/mockData';
export default function HomeScreen() {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.background, padding: 20 }}>
      <Text style={{ color: c.foreground, fontSize: 24 }}>Hello, {currentUser.name}</Text>
      <Text style={{ color: c.foreground, fontSize: 32 }}>Balance: ${currentUser.balance}</Text>
    </View>
  );
}