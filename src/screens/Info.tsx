import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Screen } from '../types';

export interface InfoProps {
  reference: any;
  dependencies: string[];
}

const Info: Screen<'Info'> = ({
  route: {
    params: { dependencies },
  },
}) => {
  return null;
};

const styles = EStyleSheet.create({});

export default Info;
