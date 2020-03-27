import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){

  const navigation = useNavigation();
  const route = useRoute();

  function navigateBack() {
    navigation.goBack();
  }

  
  const incident = route.params.incident;
  const message = `Olá ${incident.name} estou entrando em contato pois gostaria de auxiliar o caso ${incident.title} com uma doação de 
  ${Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}`

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      // You can use email@gmail.com, for example
      recipients: [incident.email],
      body: message,

    })
  }
  function sendWhatsApp() {

    // you can use for example, 5514999999999
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
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
                <Text style = {styles.incidentValue}> {incident.name} de  {incident.city}/{incident.uf} </Text>

                <Text style = {styles.incidentProperty}> Caso: </Text>
                <Text style = {styles.incidentValue}> {incident.title}  </Text>

                <Text style = {styles.incidentProperty}> Valor: </Text>
                <Text style = {styles.incidentValue}> 
                  {Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)} 
                </Text>

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