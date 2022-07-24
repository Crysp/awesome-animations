import { Platform, Appearance, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Theme {}

interface ThemeIOS extends Theme {
  $systemRed: string;
  $systemOrange: string;
  $systemYellow: string;
  $systemGreen: string;
  $systemTeal: string;
  $systemBlue: string;
  $systemIndigo: string;
  $systemPurple: string;
  $systemPink: string;
  $systemGray: string;
  $systemGray02: string;
  $systemGray03: string;
  $systemGray04: string;
  $systemGray05: string;
  $systemGray06: string;
  $systemBackground: string;
  $systemBackgroundElevated: string;
  $systemFontColor: string;
  $systemWhite: string;
  $systemPrimary: string;
  $systemSecondary: string;
  $systemTertiary: string;
  $systemSeparator: string;
}

interface ThemeAndroid extends Theme {
  $primary: string;
  $primaryVariant: string;
  $secondary: string;
  $secondaryVariant: string;
  $background: string;
  $surface: string;
  $error: string;
  $onPrimary: string;
  $onSecondary: string;
  $onBackground: string;
  $onSurface: string;
  $onError: string;
}

const iOSLight: ThemeIOS = {
  $systemRed: '#FF3B30',
  $systemOrange: '#FF9500',
  $systemYellow: '#FFCC00',
  $systemGreen: '#34C759',
  $systemTeal: '#5AC8FA',
  $systemBlue: '#007AFF',
  $systemIndigo: '#5856D6',
  $systemPurple: '#AF52DE',
  $systemPink: '#FF2D55',
  $systemGray: '#8E8E93',
  $systemGray02: '#AEAEB2',
  $systemGray03: '#C7C7CC',
  $systemGray04: '#D1D1D6',
  $systemGray05: '#E5E5EA',
  $systemGray06: '#F2F2F7',
  $systemWhite: '#FFFFFF',
  $systemPrimary: '#262626',
  $systemSecondary: '#807F80',
  $systemTertiary: '#BFBFC0',
  $systemBackground: '#F2F2F6',
  $systemBackgroundElevated: '#FFFFFF',
  $systemFontColor: '#000000',
  $systemSeparator: '#C6C6C8',
};

const iOSDark: ThemeIOS = {
  $systemRed: '#FF453A',
  $systemOrange: '#FF9F0A',
  $systemYellow: '#FFD60A',
  $systemGreen: '#32D74B',
  $systemTeal: '#64D2FF',
  $systemBlue: '#0A84FF',
  $systemIndigo: '#5E5CE6',
  $systemPurple: '#BF5AF2',
  $systemPink: '#FF2D55',
  $systemGray: '#8E8E93',
  $systemGray02: '#636366',
  $systemGray03: '#48484A',
  $systemGray04: '#3A3A3C',
  $systemGray05: '#1C1C1E',
  $systemGray06: '#1C1C1E',
  $systemWhite: '#FFFFFF',
  $systemPrimary: '#DDDDDD',
  $systemSecondary: '#9A9A9A',
  $systemTertiary: '#565756',
  $systemBackground: '#000000',
  $systemBackgroundElevated: '#1C1C1E',
  $systemFontColor: '#FFFFFF',
  $systemSeparator: '#38383A',
};

// https://material.io/design/introduction

const androidLight: ThemeAndroid = {
  $primary: '#6200EE',
  $primaryVariant: '#3700B3',
  $secondary: '#03DAC6',
  $secondaryVariant: '#018786',
  $background: '#FFFFFF',
  $surface: '#FFFFFF',
  $error: '#B00020',
  $onPrimary: '#FFFFFF',
  $onSecondary: '#000000',
  $onBackground: '#000000',
  $onSurface: '#000000',
  $onError: '#FFFFFF',
};

const androidDark: ThemeAndroid = {
  $primary: '#BB86FC',
  $primaryVariant: '#3700B3',
  $secondary: '#03DAC6',
  $secondaryVariant: '#03DAC6',
  $background: '#121212',
  $surface: '#121212',
  $error: '#CF6679',
  $onPrimary: '#000000',
  $onSecondary: '#000000',
  $onBackground: '#FFFFFF',
  $onSurface: '#FFFFFF',
  $onError: '#000000',
};

export type ThemeColor<T extends {} = keyof ThemeIOS | keyof ThemeAndroid> =
  T extends `$system${infer C}` ? Lowercase<C> : never;

interface PlatformSpecificColorScheme {
  ios: {
    light: ThemeIOS;
    dark: ThemeIOS;
  };
  android: {
    light: ThemeAndroid;
    dark: ThemeAndroid;
  };
}

const themes: PlatformSpecificColorScheme = {
  ios: {
    light: iOSLight,
    dark: iOSDark,
  },
  android: {
    light: androidLight,
    dark: androidDark,
  },
};

export function buildTheme(scheme: 'dark' | 'light') {
  if (OS === 'ios' || OS === 'android') {
    EStyleSheet.build({
      ...themes[Platform.OS][scheme],
      $theme: scheme,
      $rem: Dimensions.get('window').width / 368,
    });
  } else {
    console.error('Unsupported platform');
  }
}

const { OS } = Platform;
const colorScheme = Appearance.getColorScheme() || 'light';

buildTheme(colorScheme);
