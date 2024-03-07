import 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {MainNavigation} from './src/navigations';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
