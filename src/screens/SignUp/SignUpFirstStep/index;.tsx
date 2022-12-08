import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Y from 'yup';

import { Bullet } from '../../../Bullet';
import { BackButton } from '../../../components/BackButton';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import { 
  Container, 
  Form, 
  FormTitle, 
  Header,
  Steps,
  Subtitle,
  Title
} from './styles';

const schema = Y.object().shape({
  driverLicense: Y.string()
  .required('CNH é obrigatória'),
  email: Y.string()
  .email('E-mail inválido')
  .required('E-mail é obrigatório'),
  name: Y.string()
  .required('Nome é obrigatório'),
})


export function SignUpFirstStep(){
  const { navigate, goBack } = useNavigation();

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [driverLicense, setDriverLicense] = useState('')


  function handleGoBack() {
    goBack();
  }

  async function handleNextStep(){
    try{
      const user = { name, email, driverLicense}
      await schema.validate(user)
       
      navigate('signUpSecondStep', { user });
    } catch (err) {
      if(err instanceof Y.ValidationError){
        return Alert.alert('Opa', err.message)
      }
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName='user'
              placeholder='Nome'
              value={name}
              onChangeText={setName}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />

            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              value={driverLicense}
              onChangeText={setDriverLicense}
            />

          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}