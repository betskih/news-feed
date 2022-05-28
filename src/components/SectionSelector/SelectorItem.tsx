import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import constants, { colors } from '@feed/constants';
import type { SectionType } from '@feed/types/apiTypes';

interface Props {
  label: SectionType;
  isSelected?: boolean;
  onPress?: (value: SectionType) => void;
}
export default (props: Props) => {
  const { label, isSelected, onPress = () => {} } = props;
  return (
    <TouchableOpacity
      style={[style.container, { borderColor: isSelected ? colors.selectedBorder : colors.border }]}
      onPress={() => onPress(label)}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    minWidth: 100,
    height: 30,
    borderWidth: 2,
    borderRadius: constants.gridStep,
    justifyContent: 'center',
    alignItems: 'center',
    margin: constants.gridStep,
  },
});
