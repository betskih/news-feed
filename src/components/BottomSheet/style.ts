import { StyleSheet } from 'react-native';
import { colors } from '@feed/constants';
const HEADER_HEIGHT = 30;

export default StyleSheet.create({
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
  },

  contentHeader: {
    height: HEADER_HEIGHT,
    backgroundColor: '#cccccc',
    alignItems: 'flex-start',
  },

  closeButton: {
    width: HEADER_HEIGHT,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButton: {
    fontSize: 20,
  },

  contentTitleLight: {
    color: 'black',
  },
});
