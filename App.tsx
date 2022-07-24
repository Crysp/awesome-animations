import React from 'react';
import { Pressable } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './src/screens/Home';
import { RootStackParamList } from './src/types';
import ImageViewer from './src/screens/ImageViewer';
import Cards from './src/screens/Cards';
import Icon from './src/components/Icon';
import useTheme from './src/hooks/useTheme';
import Info from './src/screens/Info';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const scheme = useTheme();
  const isDarkTheme = scheme === 'dark';

  return (
    <NavigationContainer
      theme={{
        dark: isDarkTheme,
        colors: {
          primary: EStyleSheet.value('$systemBlue'),
          background: EStyleSheet.value('$systemBackground'),
          card: EStyleSheet.value('$systemBackgroundElevated'),
          text: EStyleSheet.value('$systemFontColor'),
          border: EStyleSheet.value('$systemSeparator'),
          notification: isDarkTheme
            ? DarkTheme.colors.notification
            : DefaultTheme.colors.notification,
        },
      }}>
      <Stack.Navigator defaultScreenOptions={{}}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerLargeTitle: true,
            headerTitle: 'Awesome Animations',
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen name='Info' component={Info} />
        <Stack.Screen
          name='Cards'
          component={Cards}
          initialParams={{
            dependencies: [
              'react-native-gesture-handler',
              'react-native-reanimated',
              'react-native-redash',
            ],
          }}
          options={{
            headerTransparent: true,
          }}
        />
        <Stack.Screen name='ImageViewer' component={ImageViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
