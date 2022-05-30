import constants, { colors, labels } from '@feed/constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGeoTags } from '@feed/store/selectors';
import { setGeoTag, setKeyWord } from '@feed/store/reducers/options';

export default () => {
  const { geoTags, keyWords } = useSelector(getGeoTags);
  const geoRef = useRef<ModalDropdown>(null);
  const keywordRef = useRef<ModalDropdown>(null);
  const dispatch = useDispatch();

  const handleGeo = useCallback(
    (index: number) => {
      if (index === 0) {
        geoRef.current?.select(-1);
        dispatch(setGeoTag(''));
      }
      dispatch(setGeoTag(geoTags[index - 1]));
    },
    [dispatch, geoTags],
  );

  const handleKeyWord = useCallback(
    (index: number) => {
      if (index === 0) {
        keywordRef.current?.select(-1);
        dispatch(setKeyWord(''));
      }
      dispatch(setKeyWord(keyWords[index - 1]));
    },
    [dispatch, keyWords],
  );

  useEffect(() => {
    geoRef.current?.select(-1);
    keywordRef.current?.select(-1);
    dispatch(setKeyWord(''));
    dispatch(setGeoTag(''));
  }, [dispatch, geoTags, keyWords]);

  return (
    <View style={style.container}>
      <ModalDropdown
        ref={geoRef}
        options={[labels.location, ...geoTags]}
        style={style.dropdown}
        textStyle={style.dropDownText}
        defaultValue={labels.location}
        dropdownTextStyle={style.dropDownText}
        // @ts-ignore
        onSelect={handleGeo}
      />

      <ModalDropdown
        ref={keywordRef}
        options={[labels.keywords, ...keyWords]}
        style={style.dropdown}
        textStyle={style.dropDownText}
        defaultValue={labels.keywords}
        dropdownTextStyle={style.dropDownText}
        // @ts-ignore
        onSelect={handleKeyWord}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dropdown,
    flexDirection: 'row',
    paddingHorizontal: constants.gridStep,
  },
  dropdown: {
    backgroundColor: colors.white,
    height: 40,
    justifyContent: 'center',
    width: '35%',
    borderRadius: 4,
    paddingHorizontal: constants.gridStep,
  },

  dropDownText: {
    fontSize: 14,
    lineHeight: 25,
    color: '#000000',
  },
});
