import React from 'react';
import { StyleSheet, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import TableRow, { TableRowProps } from './TableRow';
import TableRowNavigate, { TableRowNavigateProps } from './TableRowNavigate';

interface RowData {
  id?: string;
  icon?: TableRowProps['icon'];
  label: TableRowProps['label'];
  use?: string;
}

interface RowNavigateData extends RowData {
  use: 'navigate';
  onPress?: TableRowNavigateProps['onPress'];
}

interface TableProps {
  data: (RowNavigateData | RowData)[];
  keyExtractor?: (item: RowNavigateData | RowData) => any;
}

const Table: React.FC<TableProps> = ({ data, keyExtractor }) => {
  const defaultKeyExtractor: TableProps['keyExtractor'] = item => {
    return item.id ? item.id : undefined;
  };
  return (
    <View style={styles.group}>
      {data.map((item, index) => {
        const commonProps = {
          key: keyExtractor
            ? keyExtractor(item)
            : defaultKeyExtractor(item) || index,
          contentStyle: EStyleSheet.child(styles, 'row', index, data.length),
        };
        switch (item.use) {
          case 'navigate':
            return <TableRowNavigate {...commonProps} {...item} />;
          default:
            return <TableRow {...commonProps} {...item} />;
        }
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  group: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '$systemSeparator',
  },
  'row:last-child': {
    borderBottomWidth: 0,
  },
});

export default Table;
