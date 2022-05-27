import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import services from '@feed/services';

export default () => {
  const [data, setData] = useState<any>(null);

  const getData = useCallback(() => {
    services.getSomeData().then((data) => setData(data));
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={getData}>
        <Text>Get Data</Text>
      </TouchableOpacity>
      {data && <Text>{data.results[0].title}</Text>}
    </View>
  );
};
