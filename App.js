import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MovieList from './components/list';
import MovieDetails from './components/details';
import { Button } from 'react-native';
import Auth from './components/auth';
import Register from './components/register';
import myRatings from './components/myratings';
import Profile from './components/profile';


const AppNavigator = createStackNavigator({
  Auth: {screen: Auth},
  Register : {screen: Register},
  Profile: {screen: Profile},
  MovieList: {screen: MovieList},
  Details: {screen: MovieDetails},
  MyRatings: {screen: myRatings},
  }, 
  {
    defaultNavigationOptions: {
    headerTitleAlign: 'center',
    }
});



const App = createAppContainer(AppNavigator);

export default App;