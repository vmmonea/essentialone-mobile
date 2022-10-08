import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IndexController from './src/controllers/index.controller';

export default function App() {
  return (
    <NavigationContainer>
      <IndexController />
    </NavigationContainer>
  );
}