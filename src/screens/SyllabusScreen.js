import React, { useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { ArrowDown, BackgroundImg, CloseIcon } from "../assets/svgs";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";

const SyllabusScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const viewRef = useRef(null);
  const { isSelecetdPaper, syllabusData } = route.params;

  const PageHeader = () => {
    const handleBack = async () => {
      await viewRef.current.setNativeProps({ style: { opacity: 0 } });
      navigation.goBack();
    };

    return (
      <View style={styles.hHeaderContainer}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.backgroundImgContainer}>
          <BackgroundImg />
        </View>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack}>
            <CloseIcon />
          </TouchableOpacity>
          <Text style={styles.hHeaderText}>Syllabus</Text>
          <View style={styles.placeholder} />
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    const percentageWatched =
      (item?.watchedDuration / item?.totalDuration) * 100;
    const is90PercentWatched = percentageWatched >= 90;
    console.log("is90PercentWatched", is90PercentWatched);

    return (
      <Animated.View
        entering={FadeInDown.delay(1000 + 100 * index)}
        style={[
          styles.itemContainer,
          {
            backgroundColor: is90PercentWatched ? "#0057C0" : "white",
            borderWidth: is90PercentWatched ? 1 : 0,
          },
        ]}
      >
        <View style={styles.itemInfoContainer}>
          <Text
            style={[
              styles.itemTopicNo,
              { color: is90PercentWatched ? "#FFF" : "#000" },
            ]}
          >
            {item.topicNo}
          </Text>
          <Text
            style={[
              styles.moduleTypeText,
              { color: is90PercentWatched ? "#FFF" : "#000" },
            ]}
          >
            Module
          </Text>
        </View>
        <Text
          style={[
            styles.itemTopicName,
            { color: is90PercentWatched ? "#FFF" : "#000" },
          ]}
        >
          {item.topicName}
        </Text>
      </Animated.View>
    );
  };
  const ModuleHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{isSelecetdPaper}</Text>
          <ArrowDown />
        </TouchableOpacity>
        <Text style={styles.subHeaderText}>CMA INTERMEDIATE</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        sharedTransitionTag={syllabusData[0].moduleNo.toString()}
        style={styles.wrapper}
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <PageHeader />
        <Animated.View ref={viewRef} entering={FadeIn.delay(800)}>
          <ModuleHeader />
          <FlatList
            data={syllabusData[0].data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default SyllabusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  wrapper: {
    backgroundColor: "#0057C0",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    borderBottomColor: "#00000080",
    borderBottomWidth: 1,
    gap: 10,
    paddingBottom: 10,
    marginHorizontal: 16,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "50%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
    opacity: 0.5,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFFFFF55",
  },
  itemInfoContainer: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#25252599",
  },
  itemTopicNo: {
    fontSize: 28,
    fontWeight: "400",
  },
  moduleTypeText: {
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.5,
  },
  itemTopicName: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    marginHorizontal: 16,
  },
  flatListContainer: {
    padding: 16,
  },
  itemSeparator: {
    height: 20,
  },
  hHeaderContainer: {
    height: 116,
  },
  backgroundImgContainer: {
    opacity: 0.2,
    position: "absolute",
    top: 0,
    right: 0,
  },
  headerContent: {
    flexDirection: "row",
    top: 50,
    paddingHorizontal: 20,
  },
  hHeaderText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
  },
  placeholder: {
    width: 50,
  },
});
