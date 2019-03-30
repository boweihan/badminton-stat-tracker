import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/auth/Login";

const AuthNavigator = createStackNavigator({ Login: LoginScreen });

export default AuthNavigator;
