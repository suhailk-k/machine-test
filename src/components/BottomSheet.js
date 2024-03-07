import React, { forwardRef, useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const BottomSheet = forwardRef((props, ref) => {
  const { data, isSelecetdPaper, setIsSelecetdPaper } = props;
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    if (!isSelecetdPaper && data.length > 0) {
      setIsSelecetdPaper(data[0].name);
    }
  }, []);

  const handleClick = (item) => {
    setIsSelecetdPaper(item.name);
    ref.current.dismiss();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleClick(item)} style={styles.btn}>
      <View
        style={[
          styles.circle,
          {
            borderWidth: item.name === isSelecetdPaper ? 5 : 1,
            borderColor: item.name === isSelecetdPaper ? '#0057C0' : '#48484A',
          },
        ]}
      />
      <Text numberOfLines={1} style={styles.text}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      handleComponent={() => null}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.headerText}>Choose Paper</Text>
        <View style={styles.divider} />
        <BottomSheetFlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: '#1C1C1E' },
  btn: { flexDirection: 'row', gap: 15, padding: 10 },
  circle: { height: 22, width: 22, borderRadius: 50 },
  text: { color: 'white', fontSize: 15, fontWeight: '400', flex: 1 },
});

export default BottomSheet;
