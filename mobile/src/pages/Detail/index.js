import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  const message = 'Olá APAD estou entrando em contato pois gostaria de auxiliar o caso "Cadelinha atropelada" com uma doação de R$120,00'

  function sendEmail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Cadelinha atropelada',
      recipients: ['stelianok@gmail.com'],
      body: message,

    })
  }
  function sendWhatsApp() {

    // you can use for example, 5514999999999
    Linking.openURL(`whatsapp://send?phone=5514999999999&text=${message}`);
  }
  return(
    <View style={styles.container}>
      <View style = {styles.header}>
        <Image source = {logoImg} />
        
        <TouchableOpacity 
          style={styles.bot}
          onPress={navigateBack}>

          <Feather name = "arrow-left" size = {28} color = "#E82041" />

        </TouchableOpacity>
      </View>
        <View style = {styles.incident}>
                <Text style = {[styles.incidentProperty,{marginTop: 0}]}> ONG: </Text>
                <Text style = {styles.incidentValue}> APAD  </Text>

                <Text style = {styles.incidentProperty}> Caso: </Text>
                <Text style = {styles.incidentValue}> Catioro atropelado  </Text>

                <Text style = {styles.incidentProperty}> Valor: </Text>
                <Text style = {styles.incidentValue}> R$ 120,00  </Text>

        </View>

        <View style={styles.contactBox}>
          <Text style ={styles.heroTitle}> Salve o dia! </Text>
          <Text style ={styles.heroTitle}> seja o héroi desse caso.  </Text>

          <Text style ={styles.heroDescription}>Entre em contato:  </Text>

          <View style ={ styles.actions }>
            <TouchableOpacity 
              style = {styles.action}
              onPress={sendWhatsApp}>
              <Text style = {styles.actionText}> WhatsApp </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.action}
              onPress={sendEmail}>

              <Text style = {styles.actionText}> E-mail </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}