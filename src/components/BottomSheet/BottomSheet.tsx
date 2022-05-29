import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, BackHandler, Text, View, TouchableOpacity } from 'react-native';
import style from './style';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export interface Props {
  visible: boolean;
  children?: React.ReactNode;
  onDismiss?: () => void;
}

export default (props: any) => {
  const [show, setShow] = useState(props.visible);

  const animated = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const handleBackPress = useCallback(() => {
    if (props.visible) {
      props.onDismiss && props.onDismiss();
      return true;
    }

    return false;
  }, [props]);

  const renderContent = useCallback(() => {
    return props.children;
  }, [props]);

  const changeVisibility = useCallback(
    (type: 'show' | 'hide') => {
      if (type === 'show' && !show) {
        setShow(true);
      }
      return new Promise((resolve) => {
        Animated.timing(animated, {
          toValue: type === 'show' ? 0 : WINDOW_HEIGHT,
          duration: 500,
          easing: Easing.elastic(0.85),
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            type === 'hide' && setShow(false);
            resolve(null);
          }
        });
      });
    },
    [animated, show],
  );

  const dismiss = useCallback(async () => {
    await changeVisibility('hide');
    props.onDismiss && props.onDismiss();
  }, [changeVisibility, props]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  useEffect(() => {
    if (!show && props.visible) {
      changeVisibility('show');
    }
    if (show && !props.visible) {
      changeVisibility('hide');
    }
  }, [props.visible, show, changeVisibility]);

  return (
    <Animated.View
      style={[
        style.contentContainer,
        {
          height: WINDOW_HEIGHT - 40,
          transform: [
            {
              translateY: animated,
            },
          ],
        },
      ]}
    >
      <View style={style.contentHeader}>
        <TouchableOpacity style={style.closeButton} onPress={dismiss}>
          <Text style={style.textButton}>X</Text>
        </TouchableOpacity>
      </View>
      {show && renderContent()}
    </Animated.View>
  );
};
