import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Pressable } from 'react-native';
import { SFSymbols } from '../__generated__/sfSymbolsNames';
import { NativeProps } from '../types';
import Icon from './Icon';
import Text, { TextProps } from './Text';

export interface HeaderButtonProps extends NativeProps<typeof Pressable> {
  use?: TextProps['use'];
  text?: string;
  icon?: SFSymbols;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  use,
  text,
  icon,
  ...nativeProps
}) => {
  return (
    <Pressable {...nativeProps}>
      {({ pressed }) => {
        const opacity = pressed ? 0.35 : 1;
        return (
          <Text>
            {typeof icon !== 'undefined' && (
              <Icon use={use} color='blue' name={icon} style={{ opacity }} />
            )}
            {typeof icon !== 'undefined' && typeof text !== 'undefined' && (
              <Text use={use}> </Text>
            )}
            {typeof text !== 'undefined' && (
              <Text use={use} color='blue' style={{ opacity }}>
                {text}
              </Text>
            )}
          </Text>
        );
      }}
    </Pressable>
  );
};

const styles = EStyleSheet.create({});

export default HeaderButton;
