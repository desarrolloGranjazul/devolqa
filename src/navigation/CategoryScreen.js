/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Color, Images, Styles, withTheme } from "@common";
import { TabBarIcon } from "@components";
import { Category } from "@containers";
import { Logo, Back2, EmptyView, RightIcon } from "./IconNav";

@withTheme
export default class CategoryScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {

    const dark = navigation.getParam("dark", false);
    const headerStyle = navigation.getParam(
      "headerStyle",
      Styles.Common.toolbar()
    );

    return {
      headerTitle: navigation.state.params.mainCategory.name,
      headerLeft: Back2(navigation, null, dark),
      headerRight: RightIcon(Images.IconDevola, null),
      // tabBarIcon: ({ tintColor }) => (
      //   <TabBarIcon
      //     css={{ width: 18, height: 18 }}
      //     icon={Images.IconCategory}
      //     tintColor={tintColor}
      //   />
      // ),

      headerTintColor: Color.headerTintColor,
      headerStyle,
      headerTitleStyle: Styles.Common.headerStyle,
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
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
    const { navigate } = this.props.navigation;
    return (
      <Category
        onViewProductScreen={(item) => {
          navigate("DetailScreen", item);
        }}
      />
    );
  }
}
