import { HomeScreen, SyllabusScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Syllabus' component={SyllabusScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
