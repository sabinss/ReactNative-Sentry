import React from 'react';
import {Button, SafeAreaView, Text, useColorScheme, View} from 'react-native';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://34168f20802c44eb8314f6cba0eac505@o1112266.ingest.sentry.io/6143197',
});

const App = () => {
  const crashApp = () => {
    throw new Error('My first Sentry error!');
  };

  const nativeCrash = () => {
    Sentry.nativeCrash();
  };

  const captureException = () => {
    functionThatMightFail()
      .then(r => {})
      .catch(e => {
        console.log('ee', e);
        Sentry.captureException(e);
      });
  };

  const functionThatMightFail = () => {
    return new Promise((resolve, reject) => {
      reject('Function failed to run');
    });
  };

  return (
    <SafeAreaView>
      <Button title="crash me" onPress={crashApp} />
      <Button title="Native Crash" onPress={nativeCrash} />
      <Button title="Catch Exception" onPress={captureException} />
    </SafeAreaView>
  );
};

export default Sentry.wrap(App);
