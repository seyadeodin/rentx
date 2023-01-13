import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as y from 'yup';
import { useNetInfo } from '@react-native-community/netinfo';

import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  Photo,
  PhotoContainer,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { Button } from '../../components/Button';

type Option = 'dataEdit' | 'passwordEdit';

const schema = y.object().shape({
  driverLicense: y.string().required('CNH é obrigatória'),
  name: y.string().required('Nome é obrigatório'),
});

export function Profile() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user, signOut, updateUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<Option>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: Option) {
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit'){
      Alert.alert('VocÇe está offline', 'Para mudar a senha, conecte-se a internet');
    }
    setOption(optionSelected);
  }

  function handleSignOut() {
    Alert.alert('Deseaja sair?', 'Se sair, precirá de internet para conectar-se novamente', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style:"cancel",
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      }
    ])
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    if (result.assets.length) {
      setAvatar(result.assets[0].uri);
    }
  }

  async function handleUpdateUser() {
    try {
      const data = { name, driverLicense };
      await schema.validate(data);

      updateUser({
        id: user.id,
        user_id: user.user_id,
        driver_license: driverLicense,
        email: user.email,
        name,
        avatar,
        token: user.token,
      })
      Alert.alert('Perfil atualizado')
    } catch (e) {
      console.log(e);
      if(e instanceof y.ValidationError){
        Alert.alert('Erro de validação', e.message)
      }
      Alert.alert('Não foi possível atualizer o perfil');
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={COLORS.SHAPE}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={COLORS.SHAPE} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: avatar }} />
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={COLORS.SHAPE} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                onPress={() => handleOptionChange('dataEdit')}
                active={option === 'dataEdit'}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                onPress={() => handleOptionChange('passwordEdit')}
                active={option === 'passwordEdit'}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  value={name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  autoCorrect={false}
                  defaultValue={user.email}
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  value={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleUpdateUser} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
