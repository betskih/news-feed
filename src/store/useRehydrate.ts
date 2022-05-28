import { useEffect, useState } from 'react';
import { persistor } from './index';

export default () => {
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (bootstrapped) {
      return;
    }

    let unsubscribe: () => void;

    const handlePersistState = () => {
      const persistorState = persistor.getState();
      if (persistorState.bootstrapped && !bootstrapped) {
        setBootstrapped(true);
        unsubscribe && unsubscribe();
      }
    };

    unsubscribe = persistor.subscribe(handlePersistState);
    handlePersistState();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [bootstrapped]);

  return bootstrapped;
};
