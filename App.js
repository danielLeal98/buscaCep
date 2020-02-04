import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {

  constructor(props){
        super(props);
        this.state = {cep: '', localidade: '', uf: '', logradouro: '', bairro: ''};
        this.filterText = this.filterText.bind(this);
        this.capturaCep = this.capturaCep.bind(this);
        this.limparDados = this.limparDados.bind(this);        
    }

    filterText(text) {
      this.setState({
        cep: text.replace(/([^\d\s/-])/g, '')
      });
    }

  capturaCep(){        
    if (this.state.cep.length < 8) {      
      Alert.alert("Atenção", "Digite um CEP válido");
    } else {         
        fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`)    
          .then((r)=>r.json())
          .then((json)=>{
            let s = this.state;
            s.localidade = json.localidade;
            s.cep = json.cep;
            s.uf = json.uf;
            s.logradouro = json.logradouro;
            s.bairro = json.bairro;
            this.setState(s);            
          });
        }
  }

  limparDados(){
    let s = this.state;    
    s.cep = '';
    s.localidade = '';
    s.uf = '';
    s.logradouro = '';
    s.bairro = ''
    this.setState(s);
  }

  render(){
    return (                        
      <View style={styles.body}>
        <ImageBackground source={require('../buscaCep/imagens/background3.png')} style={styles.bgImage}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Busca Cep</Text>              
        </View>      
        <View style={styles.sectionContainer}>
          <TextInput style={styles.textInputStyle}  onChangeText={this.filterText} value={this.state.cep} placeholder="Insira o CEP desejado" placeholderTextColor="#121111"/>  
        </View>  
        <View style={styles.sectionContainer}>  
        <Button title="Buscar" style={styles.button} accessibilityLabel="Buscar" onPress={this.capturaCep} color="#5cb85c"/>              
        </View> 
        <View style={styles.infoEndereco}>
          <Text style={styles.titulo1}>{this.state.localidade}</Text>
          <Text style={styles.titulo2}> {this.state.logradouro} - {this.state.bairro} - {this.state.uf}</Text> 
          <Text style={styles.titulo3}> </Text>          
        </View>        
        <View style={styles.viewBotao}>
          <Button title="Limpar" onPress={this.limparDados} color="#ff3232"/>      
          <Button title="Salvar" onPress={() => Alert.alert('Salvar Consulta')}   color="#5cb85c"/>                      
          <TouchableOpacity onPress={() => Alert.alert('Chama Google Maps')}>
            <Image source={require('../buscaCep/imagens/google-maps.png')} style={styles.imagemMaps}/>
          </TouchableOpacity>
        </View> 
        </ImageBackground>     
      </View>          
    );
  }
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'transparent',
    flex:1
  },
  bgImage:{
    flex: 1,
    width: null

  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121111',
    textAlign: 'center'
  },
  textInputStyle: {  
    borderColor: '#121111',        
    height: 40,  
    margin: 20,  
    padding: 10, 
    alignContent:'center',
    borderWidth : 1,
    fontSize:17,
    textAlign: 'center'
  },
  infoEndereco: {            
    alignItems:'center',
    marginTop: 40,
    marginLeft: 10,
    marginRight:10
  },
  viewBotao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:10,
    position: 'absolute',
    left: 40, 
    right: 40, 
    bottom: 40,
    marginRight: 10
  },
  imagemMaps:{
    width: 40,
    height:40
  },
  titulo1:{
    fontWeight:'bold',
    fontSize:25
  },
  titulo2:{    
    fontSize:20
  },
  titulo3:{
    fontSize:20
  }
});
