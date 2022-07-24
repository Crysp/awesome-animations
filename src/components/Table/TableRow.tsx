import Icon, { IconProps } from '../Icon';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Pressable, View } from 'react-native';
import Text from '../Text';

export interface TableRowProps {
  icon?: IconProps['name'];
  label: string;
  rightContent?: React.ReactElement | React.ReactElement[];
  onPress?: (...args: any[]) => any;
  contentStyle?: {};
}

const TableRow: React.FC<TableRowProps> = ({
  icon,
  label,
  rightContent,
  onPress,
  contentStyle = {},
}) => {
  const rightContentArray =
    typeof rightContent !== 'undefined'
      ? Array.isArray(rightContent)
        ? rightContent
        : [rightContent]
      : undefined;
  const getRightContentItemStyle = (index: number) =>
    EStyleSheet.child(
      styles,
      'contentRightItem',
      index,
      Array.isArray(rightContentArray) ? rightContentArray.length : 0,
    );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        [
          styles.container,
          pressed &&
            onPress && { backgroundColor: EStyleSheet.value('$systemGray04') },
        ].filter(Boolean)
      }>
      {typeof icon !== 'undefined' && (
        <View style={styles.icon}>
          <Icon name={icon} />
        </View>
      )}
      <View style={[styles.content, contentStyle]}>
        <View style={styles.contentLeft}>
          <Text numberOfLines={1}>{label}</Text>
        </View>
        {Array.isArray(rightContentArray) && rightContentArray.length > 0 && (
          <View style={styles.contentRight}>
            {React.Children.map(rightContentArray, (child, index) =>
              React.cloneElement(child, {
                ...child.props,
                style: [
                  child.props.style,
                  getRightContentItemStyle(index),
                ].filter(Boolean),
              }),
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = EStyleSheet.create({
  group: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '$systemBackgroundElevated',
    height: 44,
    paddingLeft: 16,
  },
  content: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
  },
  contentLeft: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 16,
  },
  'contentRightItem:first-child': {
    marginRight: 12,
  },
  'contentRightItem:last-child': {
    marginRight: 0,
  },
  rightLabel: {
    color: '$systemSecondary',
    opacity: 0.6,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 16,
    backgroundColor: '$systemBlue',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TableRow;
