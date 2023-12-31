/** @format */

import React, { PureComponent } from "react";

import { Login } from "@containers";
import { Color, Styles, withTheme } from "@common";
import { Back, EmptyView, Logo } from "./IconNav";

@withTheme
export default class LoginScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const dark = navigation.getParam("dark", false);
    const headerStyle = navigation.getParam(
      "headerStyle",
      Styles.Common.toolbar()
    );

    return {
      headerLeft: EmptyView(),
      headerRight: EmptyView(),
      headerTitle: EmptyView(),

      headerTintColor: Color.headerTintColor,
      headerStyle,
      headerTitleStyle: Styles.Common.headerStyle,
    };
  };

  UNSAFE_componentWillMount() {
    const {
      theme: {
        colors: { background },
        dark,
      },
    } = this.props;

    this.props.navigation.setParams({
      headerStyle: Styles.Common.toolbar(background, dark),
      dark,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme.dark !== nextProps.theme.dark) {
      const {
        theme: {
          colors: { background },
          dark,
        },
      } = nextProps;
      this.props.navigation.setParams({
        headerStyle: Styles.Common.toolbar(background, dark),
        dark,
      });
    }
  }

  render() {
    const { navigate, state, goBack } = this.props.navigation;
    const isLogout = state.params ? state.params.isLogout : false;

    return (
      <Login
        statusBar
        navigation={this.props.navigation}
        onBack={goBack}
        isLogout={isLogout}
        onViewSignUp={(user) => navigate("SignUpScreen", user)}
        onViewCartScreen={() => navigate("CartScreen")}
        onViewHomeScreen={() => navigate("CategoriesScreen")}
        onViewForgotPasswordScreen={() => navigate("ForgotPasswordScreen")}
      />
    );
  }
}
