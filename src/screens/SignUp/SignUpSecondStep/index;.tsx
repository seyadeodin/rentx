import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Bullet } from '../../../Bullet';
import { BackButton } from '../../../components/BackButton';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import { 
  Container, 
  Form, 
  FormTitle, 
  Header,
  Steps,
  Subtitle,
  Title
} from './styles';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep(){
  const { navigate, goBack } = useNavigation();
  const  { params } = useRoute();
  const { COLORS } = useTheme();

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { user } = params as Params;

  function handleGoBack() {
    goBack();
  }

  async function handleRegister() {
    try {
      if(!password || !repeatPassword){
        return Alert.alert('Informe a senha e a confirmação')
      }

      if(password != repeatPassword){
        return Alert.alert('As senhas não são iguais')
      }

      const response = await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })


      navigate('confirmation', { 
        nextScreenRoute: 'signIn',
        title: 'Conta criada',
        message: 'Agora é só fazer login\n e aproviter'
       });
    } catch(err) {
      console.log(err)
      Alert.alert('Opa', 'Não foi possível cadastrar')
    }
  }

  return(
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack}/>
            <Steps>
              <Bullet active/>
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie sua {'\n'}conta</Title>
          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </Subtitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />

          </Form>

          <Button
            title="Cadastrar"
            color={COLORS.SUCCESS}
            onPress={handleRegister}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}