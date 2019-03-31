import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import StatsScreen from "../screens/Stats";
import SettingsScreen from "../screens/Settings";
import SeasonList from "../graphql/query/SeasonList";
import AddSeason from "../graphql/mutation/AddSeason";
import MatchList from "../graphql/query/MatchList";

const SeasonStack = createStackNavigator({
  SeasonList,
  AddSeason,
  MatchList,
});

SeasonStack.navigationOptions = {
  tabBarLabel: "Seasons",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

const StatsStack = createStackNavigator({
  Links: StatsScreen,
});

StatsStack.navigationOptions = {
  tabBarLabel: "Stats",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
};

export default createBottomTabNavigator({
  SeasonStack,
  StatsStack,
  SettingsStack,
});
