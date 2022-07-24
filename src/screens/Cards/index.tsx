import React, { useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RootStackParamList, Screen } from '../../types';
import Card, { CardData } from './Card';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import HeaderButton from '../../components/HeaderButton';

const cards: CardData[] = [
  {
    source: require('../../../assets/images/four-of-swords.jpg'),
  },
  {
    source: require('../../../assets/images/page-of-wands.jpg'),
  },
  {
    source: require('../../../assets/images/seven-of-cups.jpg'),
  },
  {
    source: require('../../../assets/images/the-high-priestess.jpg'),
  },
  {
    source: require('../../../assets/images/the-hanged-man.jpg'),
  },
];

const Cards: Screen<'Cards'> = ({ navigation, route }) => {
  const shouldReverse = useSharedValue(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          icon='info.circle'
          onPress={() => {
            navigation.push('Info', route.params);
          }}
        />
      ),
    });
  }, [navigation, route]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {cards.map((card, index) => (
        <Card
          key={index}
          {...card}
          index={index}
          shouldReverse={shouldReverse}
        />
      ))}
    </GestureHandlerRootView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default Cards;
