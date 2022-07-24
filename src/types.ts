import React from 'react';
import { InfoProps } from './screens/Info';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Info: InfoProps;
  ImageViewer: undefined;
  Cards: InfoProps;
};

export type Screen<RouteName extends keyof RootStackParamList> = React.FC<
  NativeStackScreenProps<RootStackParamList, RouteName>
>;

export type NativeProps<T extends {}> = T extends React.Component<infer P>
  ? P
  : T extends React.ForwardRefExoticComponent<infer A>
  ? A
  : never;
