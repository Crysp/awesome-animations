import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Screen } from '../types';
import Table from '../components/Table';

const Home: Screen<'Home'> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Table
          data={[
            {
              label: 'Cards',
              icon: 'square.stack.fill',
              use: 'navigate',
              onPress() {
                navigation.navigate('Cards');
              },
            },
            {
              label: 'Image viewer',
              icon: 'photo.on.rectangle.angled',
              use: 'navigate',
              onPress() {
                navigation.navigate('ImageViewer');
              },
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
