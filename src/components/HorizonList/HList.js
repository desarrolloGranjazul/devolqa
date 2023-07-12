/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatList, View } from "react-native";
import { find, get } from "lodash";

import { Constants, Images, Config, Languages, withTheme } from "@common";
import {
  HorizonLayout,
  AdMob,
  BannerSlider,
  BannerImage,
  PostList,
  BlogList,
} from "@components";

import styles from "./styles";
import Categories from "./Categories";
import HHeader from "./HHeader";

class HorizonList extends PureComponent {
  static propTypes = {
    config: PropTypes.object,
    index: PropTypes.number,
    fetchPost: PropTypes.func,
    fetchNews: PropTypes.func,
    onShowAll: PropTypes.func,
    list: PropTypes.array,
    fetchProductsByCollections: PropTypes.func,
    setSelectedCategory: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    showCategoriesScreen: PropTypes.func,
    collection: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.defaultList = [
      {
        id: 1,
        name: Languages.loading,
        images: [Images.PlaceHolder],
      },
      {
        id: 2,
        name: Languages.loading,
        images: [Images.PlaceHolder],
      },
      {
        id: 3,
        name: Languages.loading,
        images: [Images.PlaceHolder],
      },
    ];
  }

  /**
   * handle load more
   */
  _nextPosts = () => {
    const { config, index, fetchPost, collection } = this.props;
    this.page += 1;
    if (!collection.finish) {
      fetchPost({ config, index, page: this.page });
    }
  };

  _viewAll = () => {
    const {
      config,
      onShowAll,
      index,
      list,
      fetchProductsByCollections,
      setSelectedCategory,
    } = this.props;
    const selectedCategory = find(
      list,
      (category) => category.id === config.category
    );
    setSelectedCategory(selectedCategory);
    fetchProductsByCollections(config.category, config.tag, this.page, index);
    onShowAll(config, index);
  };

  showProductsByCategory = (config) => {
    const {
      onShowAll,
      index,
      list,
      fetchProductsByCollections,
      setSelectedCategory,
    } = this.props;
    const selectedCategory = find(
      list,
      (category) => category.id === config.category
    );
    setSelectedCategory(selectedCategory);
    fetchProductsByCollections(config.category, config.tag, this.page, index);
    onShowAll(config, index);
  };

  onViewProductScreen = (product) => {
    this.props.onViewProductScreen({ product });
  };

  renderItem = ({ item, index }) => {
    const { layout } = this.props.config;

    if (item === null) return <View key="post_" />;

    return (
      <HorizonLayout
        product={item}
        key={`post-${index}`}
        onViewPost={this.onViewProductScreen}
        layout={layout}
        config={this.props.config}
        currency={this.props.currency}
      />
    );
  };

  renderHeader = () => {
    const { showCategoriesScreen, config, theme } = this.props;
    return (
      <HHeader
        showCategoriesScreen={showCategoriesScreen}
        config={config}
        theme={theme}
        viewAll={this._viewAll}
      />
    );
  };

  render() {
    const {
      onViewProductScreen,
      collection,
      config,
      isLast,
      news,
      language,
      layouts,
    } = this.props;
    const VerticalLayout = get(layouts, "VerticalLayout");
    const list =
      typeof collection !== "undefined" &&
      typeof collection.list !== "undefined"
        ? collection.list
        : this.defaultList;
    const isPaging = !!config.paging;
    const data =
      language.lang === Constants.Languages.en
        ? Config.HomeCategories
        : Config.HomeCategories_AR;

    // eslint-disable-next-line default-case
    switch (config.layout) {
      case Constants.Layout.circleCategory:
        return (
          <Categories
            config={config}
            categories={this.props.list}
            items={data}
            type={config.theme}
            onPress={this.showProductsByCategory}
          />
        );
      case Constants.Layout.BannerSlider:
        return (
          <BannerSlider data={list} onViewPost={this.onViewProductScreen} />
        );

      case Constants.Layout.BannerImage:
        return (
          <BannerImage
            viewAll={this._viewAll}
            config={config}
            data={list}
            onViewPost={this.onViewProductScreen}
          />
        );
      case Constants.Layout.Blog:
        return (
          <BlogList
            news={news}
            theme={this.props.theme}
            fetchNews={this.props.fetchNews}
            navigation={this.props.navigation}
            config={config}
          />
        );
    }

    return (
      <View
        style={[
          styles.flatWrap,
          config.color && {
            backgroundColor: config.color,
          },
        ]}>
        {config.name && this.renderHeader()}
        <FlatList
          overScrollMode="never"
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `post__${index}`}
          extraData={this.UNSAFE_componentWillReceiveProps}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled={isPaging}
          onEndReached={false}
        />

        {isLast && (
          <FlatList
            overScrollMode="never"
            contentContainerStyle={styles.flatlist}
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item, index) => `post__${index}`}
            renderItem={() => <AdMob adSize="largeBanner" />}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={isPaging}
          />
        )}

        {typeof VerticalLayout !== "undefined" && (
          <PostList
            parentLayout={VerticalLayout.layout}
            headerLabel={VerticalLayout.name}
            onViewProductScreen={onViewProductScreen}
          />
        )}
      </View>
    );
  }
}

export default withTheme(HorizonList);
