import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from 'react-native-vector-icons/Ionicons'
import { Text } from '../Text'
import { styles } from './styles'
import { styles as formStyles } from '../Form/styles'
import { globalStyles } from '../styles'
import { ResetForm } from './ResetForm'
import { CodeForm } from './CodeForm'
import { PasswordForm } from './PasswordForm'
import { Header } from '../Header'

export const ResetPw = (props: any) => {

  const stages = {
    REQUEST_LINK: 'REQUEST_LINK',
    VERIFY: 'VERIFY',
    RESET: 'RESET',
  };

  const [stage, setStage] = useState(stages.REQUEST_LINK);
  const [email, setEmail] = useState(null);

  useEffect(() => {

    if (props.token !== undefined) {
      props.navigation.navigate('Home');
    }
  });

  const switchStage = (stage: string) => {
    setStage(stage);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title='Reset Password'
        headerLeft={
          <Text
            style={{ ...globalStyles.headerText }}
            onPress={() => props.navigation.goBack(null)}
            invertColor heading>
            <FontAwesome
              name='ios-arrow-back'
              size={15}
            /> Sign In
          </Text>
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ ...formStyles.container, }}>
          <View>
            <Text
              style={{ marginBottom: 15, }}
              heading
              invertColor>
              Reset Your Password
              </Text>
          </View>
          {stage === stages.REQUEST_LINK &&
            <ResetForm
              navigation={props.navigation}
              stages={stages}
              switchStage={switchStage}
              setEmail={setEmail}
            />
          }
          {stage === stages.VERIFY &&
            <CodeForm
              navigation={props.navigation}
              stages={stages}
              switchStage={switchStage}
            />
          }
          {stage === stages.RESET &&
            <PasswordForm
              navigation={props.navigation}
              stages={stages}
              switchStage={switchStage}
              email={email}
            />
          }
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ResetPw;