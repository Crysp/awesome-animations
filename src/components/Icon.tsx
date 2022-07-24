import React, { useMemo } from 'react';
import Text, { TextProps } from './Text';
import { SFSymbols } from '../__generated__/sfSymbolsNames';

const sfSymbols: { [key in SFSymbols]?: string } = {
  'chevron.right': '􀆊',
  'photo.on.rectangle.angled': '􀣵',
  multiply: '􀅾',
  'square.stack.fill': '􀐌',
  info: '􀅳',
  'info.circle': '􀅴',
  'info.circle.fill': '􀅵',
};

export interface IconProps extends TextProps {
  name: SFSymbols;
}

const Icon: React.FC<IconProps> = ({ name, color = 'white', ...textProps }) => {
  const symbol = useMemo(() => {
    const resolvedSymbol = sfSymbols[name];
    if (typeof resolvedSymbol !== 'undefined') {
      return resolvedSymbol;
    }
    return sfSymbols.multiply;
  }, [name]);
  return (
    <Text color={color} {...textProps}>
      {symbol}
    </Text>
  );
};

export function getIconsAsString(name: SFSymbols): string {
  return sfSymbols[name] || sfSymbols.multiply || '';
}

export default Icon;
