import TableRow, { TableRowProps } from './TableRow';
import React from 'react';
import Icon from '../Icon';

export interface TableRowNavigateProps
  extends Omit<TableRowProps, 'rightContent'> {
  onPress?: () => void;
}

const TableRowNavigate: React.FC<TableRowNavigateProps> = props => (
  <TableRow
    {...props}
    rightContent={
      <Icon name='chevron.right' use='subHeadline' color='tertiary' bold />
    }
  />
);

export default TableRowNavigate;
