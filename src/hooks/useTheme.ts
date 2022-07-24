import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { buildTheme } from '../common/styles';

export default function useTheme() {
  const scheme = useColorScheme();

  useEffect(() => {
    const resolvedScheme = scheme || 'light';
    if (EStyleSheet.value('$theme') !== resolvedScheme) {
      buildTheme(resolvedScheme);
    }
  }, [scheme]);

  return scheme;
}
