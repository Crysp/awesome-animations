import React from 'react';
import { Text as RNText } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ThemeColor } from '../common/styles';
import { NativeProps } from '../types';

export interface TextProps extends NativeProps<RNText> {
  use?:
    | 'largeTitle'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'headline'
    | 'body'
    | 'callout'
    | 'subHeadline'
    | 'footnote'
    | 'caption1'
    | 'caption2';
  bold?: boolean;
  color?: ThemeColor;
}

const Text: React.FC<TextProps> = ({
  use = 'body',
  bold = false,
  color = 'fontColor',
  ...nativeProps
}) => {
  return (
    <RNText
      {...nativeProps}
      style={[
        bold ? boldStyles[use] : regularStyles[use],
        nativeProps.style,
        {
          color: EStyleSheet.value(
            `$system${color[0].toUpperCase() + color.slice(1)}`,
          ),
        },
      ]}
    />
  );
};

/**
 * SF Pro font weights:
 * 100 — Ultra-light
 * 200 — Thin
 * 300 — Light
 * 400 — Regular
 * 500 — Medium
 * 600 — Semi-bold
 * 700 — Bold
 * 800 — Heavy
 * 900 — Black
 */

const regularStyles = EStyleSheet.create({
  largeTitle: {
    fontWeight: '400',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 34,
    lineHeight: 41,
  },
  title1: {
    fontWeight: '400',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 28,
    lineHeight: 34,
  },
  title2: {
    fontWeight: '400',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    lineHeight: 28,
  },
  title3: {
    fontWeight: '400',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 20,
    lineHeight: 24,
  },
  headline: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    lineHeight: 22,
  },
  callout: {
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    lineHeight: 21,
  },
  subHeadline: {
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    lineHeight: 20,
  },
  footnote: {
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  caption1: {
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  caption2: {
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    fontSize: 11,
    lineHeight: 13,
  },
});

const boldStyles = EStyleSheet.create({
  largeTitle: {
    fontWeight: '700',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 34,
    lineHeight: 41,
  },
  title1: {
    fontWeight: '700',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 28,
  },
  title2: {
    fontWeight: '700',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 22,
    lineHeight: 28,
  },
  title3: {
    fontWeight: '600',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 20,
    lineHeight: 24,
  },
  headline: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 17,
    lineHeight: 22,
  },
  callout: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 16,
    lineHeight: 21,
  },
  subHeadline: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 15,
    lineHeight: 20,
  },
  footnote: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 13,
    lineHeight: 18,
  },
  caption1: {
    fontWeight: '500',
    fontFamily: 'SFProText-Medium',
    fontSize: 12,
    lineHeight: 16,
  },
  caption2: {
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
    fontSize: 11,
    lineHeight: 13,
  },
});

export default Text;
