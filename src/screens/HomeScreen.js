import React, { useEffect, useRef, useState } from "react";
import {
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import data from "../assets/data.json";
import {
  ArrowDown,
  BackgroundImg,
  ChaperPending,
  ChapterCompleteIcon,
  ChapterContinueIcon,
  ExamIcon,
  List,
} from "../assets/svgs";
import { BottomSheet } from "../components";

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  const [dashboardData, setDashboardData] = useState(data.papers);
  const [isSelecetdPaper, setIsSelecetdPaper] = useState(null);
  const [selectedPaperData, setSelectedPaperData] = useState([]);

  const optopnList = [
    "Road Map",
    "Classes",
    "Materials",
    "Assignments",
    "Quizzes",
    "Exams",
    "Grades",
    "Feedback",
  ];

  useEffect(() => {
    if (isSelecetdPaper) {
      const selectedPaper = dashboardData.find(
        (paper) => paper.name === isSelecetdPaper
      );
      setSelectedPaperData(selectedPaper.modules);
    }
  }, [isSelecetdPaper]);

  const handleNavigation = (moduleNo) => {
    const filteredData = selectedPaperData.filter(
      (item) => item.moduleNo === moduleNo
    );
    navigation.navigate("Syllabus", {
      isSelecetdPaper,
      syllabusData: filteredData,
    });
  };

  const Header = () => (
    <TouchableOpacity
      onPress={() => bottomSheetRef.current.present()}
      style={styles.headerContainer}
    >
      <Text numberOfLines={1} style={styles.headerText}>
        {isSelecetdPaper}
      </Text>
      <ArrowDown />
    </TouchableOpacity>
  );

  const sectionRenderItem = ({ item, index, section }) => {
    const isLastItem = index === section.data.length - 1;
    const percentageWatched =
      (item?.watchedDuration / item?.totalDuration) * 100;
    const is90PercentWatched = percentageWatched >= 90;
    const isWatchPending = item.watchedDuration == 0;

    return (
      <View style={styles.sectionItemContainer}>
        {item.type == "exam" ? (
          <View style={styles.sectionItemWrapper}>
            <ExamIcon />
            <Text style={styles.text1}>Attend Exam</Text>
          </View>
        ) : (
          <>
            <View style={styles.actionButton}>
              {item.members.length == 0 ? (
                <Text style={styles.actionButtonText}>+Add</Text>
              ) : (
                item.members.map((item, index) => (
                  <Image
                    key={index.toString()}
                    source={{ uri: item.url }}
                    style={styles.memberImg}
                  />
                ))
              )}
            </View>
            <View style={styles.itemContent}>
              {index !== 0 && <View style={styles.dividerUp} />}
              <View style={styles.btnContainer}>
                {isWatchPending ? (
                  <ChaperPending />
                ) : is90PercentWatched ? (
                  <ChapterCompleteIcon />
                ) : (
                  <ChapterContinueIcon />
                )}
              </View>
              {!isLastItem && <View style={styles.dividerDown} />}
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemTopicNo}>{item.topicNo}</Text>
              <Text style={styles.itemTopicName}>{item.topicName}</Text>
            </View>
          </>
        )}
      </View>
    );
  };

  const renderSectionHeader = ({ section: { moduleName, moduleNo } }) => (
    <Animated.View
      sharedTransitionTag={moduleNo.toString()}
      style={styles.sectionHeaderContainer}
    >
      <View style={styles.backgroundImageContainer}>
        <BackgroundImg />
      </View>
      <View style={styles.moduleInfoContainer}>
        <Text style={styles.moduleNoText}>{moduleNo}</Text>
        <Text style={styles.moduleTypeText}>Module</Text>
      </View>
      <Text style={styles.moduleNameText}>{moduleName}</Text>
      <TouchableOpacity onPress={() => handleNavigation(moduleNo)}>
        <List />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Header />
      <View>
        <FlatList
          data={optopnList}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.itemSeparate} />}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <Text style={styles.flatListItem}>{item}</Text>
          )}
        />
      </View>
      <SectionList
        sections={selectedPaperData}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={renderSectionHeader}
        renderItem={sectionRenderItem}
        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparate} />
        )}
        stickySectionHeadersEnabled={true}
      />
      <BottomSheet
        data={dashboardData}
        ref={bottomSheetRef}
        isSelecetdPaper={isSelecetdPaper}
        setIsSelecetdPaper={setIsSelecetdPaper}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerContainer: {
    backgroundColor: "#25252599",
    padding: 10,
    borderRadius: 40,
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    width: 227,
    justifyContent: "space-between",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },
  sectionItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  actionButton: {
    backgroundColor: "#1C1C1E",
    borderRadius: 40,
    height: 44,
    width: 72,
    padding: 10,
    flexDirection: "row",
    gap: -10,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center",
    paddingLeft: 10,
  },
  itemContent: {
    marginHorizontal: 10,
  },
  dividerUp: {
    zIndex: -2,
    backgroundColor: "#1C1C1E",
    height: 35,
    width: 30,
    marginBottom: -35,
    marginLeft: 20,
  },
  btnContainer: {
    zIndex: 1,
  },
  dividerDown: {
    backgroundColor: "#1C1C1E",
    height: 35,
    width: 30,
    marginLeft: 20,
    marginTop: -35,
  },
  itemDetails: {
    flex: 1,
  },
  itemTopicNo: {
    color: "#585858",
    fontSize: 13,
    fontWeight: "400",
  },
  itemTopicName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeaderContainer: {
    overflow: "hidden",
    backgroundColor: "#0057C0",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  backgroundImageContainer: {
    opacity: 0.2,
    position: "absolute",
    top: 0,
    right: 0,
  },
  moduleInfoContainer: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#25252599",
  },
  moduleNoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
  },
  moduleTypeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.5,
  },
  moduleNameText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    marginHorizontal: 16,
  },
  flatListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  flatListItem: {
    color: "#585858",
    fontSize: 15,
    fontWeight: "400",
  },
  sectionItemWrapper: {
    backgroundColor: "#0057C0",
    height: 55,
    gap: 10,
    padding: 10,
    borderRadius: 45,
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 42,
  },
  text1: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  memberImg: { width: 24, height: 24, borderRadius: 12 },
  sectionSeparate: {
    height: 20,
  },
  itemSeparate: {
    width: 20,
  },
});
