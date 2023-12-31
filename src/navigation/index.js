/** @format */

import React from "react";
import { Color, Images, Config } from "@common";
import { TabBar, TabBarIcon, TabBarIconHome } from "@components";
import { Dimensions, I18nManager } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from "./HomeScreen";
import NewsScreen from "./NewsScreen";
import NewsDetailScreen from "./NewsDetailScreen";
import CategoriesScreen from "./CategoriesScreen";
import CategoryScreen from "./CategoryScreen";
import DetailScreen from "./DetailScreen";
import CartScreen from "./CartScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import OrderDetailScreen from "./OrderDetailScreen";
import WishListScreen from "./WishListScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import SignUpScreen from "./SignUpScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./ListAllScreen";
import SettingScreen from "./SettingScreen";
import UserProfileScreen from "./UserProfileScreen";
import FiltersScreen from "./FiltersScreen";
import AddressScreen from "./AddressScreen";
import AddAddressScreen from "./AddAddressScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import EditAddressScreen from "./EditAddressScreen";
import NotificationsScreen from "./NotificationsScreen";
import TransitionConfig from "./TransitionConfig";
import MyCardsScreen from "./MyCardsScreen";
const { width } = Dimensions.get("window");

const NewsStack = createStackNavigator(
  {
    News: { screen: NewsScreen },
    NewsDetailScreen: { screen: NewsDetailScreen },
    CustomPage: { screen: CustomPageScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryStack = createStackNavigator(
  {
    CategoriesScreen: { screen: CategoriesScreen },
    CategoryScreen: { screen: CategoryScreen },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false },
    },
    CustomPage: { screen: CustomPageScreen },
    NotificationScreen: {screen: NotificationsScreen}
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryDetailStack = createStackNavigator(
  {
    CategoryScreen: { screen: CategoryScreen },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false },
    },
    CustomPage: { screen: CustomPageScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const WishListStack = createStackNavigator(
  {
    WishListScreen: { screen: WishListScreen },
    Detail: { screen: DetailScreen },
    CustomPage: { screen: CustomPageScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
    DetailScreen: { screen: DetailScreen },
    FiltersScreen: { screen: FiltersScreen },
    CustomPage: { screen: CustomPageScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ListAllScreen: { screen: ListAllScreen },
    DetailScreen: { screen: DetailScreen },
    CustomPage: { screen: CustomPageScreen },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: (navigation) => {
      return {
        gestureResponseDistance: { horizontal: width / 2 },
        gesturesEnabled: true,
        gestureDirection: I18nManager.isRTL ? "inverted" : "default",
      }
    },
  }
);

const CartScreenStack = createStackNavigator(
  {
    Cart: { screen: CartScreen },
    Detail: { screen: DetailScreen },
    CustomPage: { screen: CustomPageScreen },
    EditAddress: { screen: EditAddressScreen },
    AddAddress: { screen: AddAddressScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const UserProfileStack = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    Address: { screen: AddressScreen },
    AddAddress: { screen: AddAddressScreen },
    SettingScreen: { screen: SettingScreen },
    CustomPage: { screen: CustomPageScreen },
    EditAddress: { screen: EditAddressScreen },
    MyCards: { screen: MyCardsScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const LoginStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  {
    mode: "modal",
    header: null,
    transitionConfig: () => TransitionConfig,
  }
);

const MyOrderStack = createStackNavigator({
  MyOrdersScreen: { screen: MyOrdersScreen },
  OrderDetailScreen: { screen: OrderDetailScreen },
});

const MyCardsStack = createStackNavigator({
  MyCardsScreen: { screen: MyCardsScreen },
 // OrderDetailScreen: { screen: OrderDetailScreen },
});


const AppNavigator = createBottomTabNavigator(
  {
  //   Default: {
  //     screen: HomeStack,
  //     navigationOptions: ({ navigation }) => ({
  //       tabBarIcon: ({ tintColor }) => {
  //         return (
  //           <TabBarIconHome onPress={() => {
  //             navigation.navigate('Home')
  //           }} icon={Images.IconHome} tintColor={tintColor} />
  //         )
  //       }
  //     }),
  //   },
    CategoriesScreen: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconCategory}
            tintColor={tintColor}
          />
        ),
      },
    },
    ...(Config.Affiliate.enable
      ? {}
      : {
          CartScreen: {
            screen: CartScreenStack,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                  cartIcon
                  css={{ width: 20, height: 20 }}
                  icon={Images.IconCart}
                  tintColor={tintColor}
                />
              ),
            },
          },
        }),
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            css={{ width: 30, height: 30 }}
            icon={Images.IconSearch}
            tintColor={Color.primary}
          />
        ),
      },
    },
    // WishListScreen: {
    //   screen: WishListStack,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor }) => (
    //       <TabBarIcon
    //         wishlistIcon
    //         css={{ width: 18, height: 18 }}
    //         icon={Images.IconHeart}
    //         tintColor={tintColor}
    //       />
    //     ),
    //   },
    // },
    ...(Config.Affiliate.enable
      ? {}
      : {
          MyOrders: {
            screen: MyOrderStack,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                  orderIcon
                  css={{ width: 18, height: 18 }}
                  icon={Images.IconOrder}
                  tintColor={tintColor}
                />
              ),
            },
          },
        }),
    UserProfileScreen: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            wishlistIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconUser}
            tintColor={tintColor}
          />
        ),
      },
    },
    NewsScreen: { screen: NewsStack },
    LoginStack: { screen: LoginStack },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        tabBarVisible: false,
        gestureDirection: I18nManager.isRTL ? "inverted" : "default",
      },
    },
    CategoryDetail: { screen: CategoryDetailStack },
  },
  {
    initialRouteName: 'CategoriesScreen',
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: Color.tabbarTint,
      inactiveTintColor: Color.tabbarColor,
    },
    lazy: true,
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  {
    mode: "modal",
    header: null,
    transitionConfig: () => TransitionConfig,
  }
);

export default createAppContainer(
  Config.Login.RequiredLogin
    ? createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppNavigator,
          Auth: AuthNavigator,
        },
        {
          initialRouteName: "AuthLoading",
        }
      )
    : AppNavigator
);

/**
 * prevent duplicate screen
 */
const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};

/**
 * Add AppNavigator to navigateOnce bug naivgate drawer category
 */
NewsStack.router.getStateForAction = navigateOnce(
  NewsStack.router.getStateForAction
);
CategoryStack.router.getStateForAction = navigateOnce(
  CategoryStack.router.getStateForAction
);
CategoryDetailStack.router.getStateForAction = navigateOnce(
  CategoryDetailStack.router.getStateForAction
);
WishListStack.router.getStateForAction = navigateOnce(
  WishListStack.router.getStateForAction
);
HomeStack.router.getStateForAction = navigateOnce(
  HomeStack.router.getStateForAction
);
SearchStack.router.getStateForAction = navigateOnce(
  SearchStack.router.getStateForAction
);
CartScreenStack.router.getStateForAction = navigateOnce(
  CartScreenStack.router.getStateForAction
);
