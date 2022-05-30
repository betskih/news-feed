import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { isOfflineMode } from '@feed/store/selectors';
import { useEffect } from 'react';
import { setOfflineMode } from '@feed/store/reducers/options';

export default () => {
  const offline = useSelector(isOfflineMode);
  const netInfo = useNetInfo();
  //NOTE! useNetInfo does not disconnect from the network using the react-native debugger
  //So offline mode can be tested only on physical device of by unlinking the cable
  const dispatch = useDispatch();
  useEffect(() => {
    if (offline && netInfo.isInternetReachable) {
      dispatch(setOfflineMode(false));
    }
  }, [offline, netInfo, dispatch]);
};
