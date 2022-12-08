import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Y from 'yup'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button'
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';
import { 
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer,
} from './styles';

export function SignIn(){
  const { COLORS } = useTheme();
  const { navigate } = useNavigation();
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn() {
    try{

      const schema = Y.object().shape({
        email: Y.string()
        .required('E-mail obrigatório')
        .email('Digiitee um e-mail válido'),
        password: Y.string()
        .required('Senha é obrigatório')
        .min(6, 'Senha deve ter ao menos 6 caracteres')

      })

      await schema.validate({  email, password })

      signIn({ email, password });
    } catch(error) {
      // two typeps of error generic and yup 
      if(error instanceof Y.ValidationError){
        return Alert.alert('Opa', error.message);
      }
      return Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer o login, verifique as credenciais')

    }
  }

  function handleCreateAccount(){
    navigate('signUpFirstStep');

  }


  return(
    // behavior position changes our view position to allow all components to be shown
    <KeyboardAvoidingView
      behavior="position" 
      enabled
    >
      <TouchableWithoutFeedback >
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor={COLORS.BACKGROUND_PRIMARY}
            //backgroundColor='transparent'
            //make bar bg transparent
            translucent
            // make content start from the beginning of the screen
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <Subtitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder="E-mail"
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName='lock'
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              // enabled={false}
              loading={false}
            />
            <Button
              title='Criar conta gratuita'
              color={theme.COLORS.BACKGROUND_SECONDARY}
              onPress={handleCreateAccount}
              loading={false}
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}