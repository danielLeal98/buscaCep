import React, { Component } from 'react';
import {StyleSheet,View,Text,ImageBackground,Button,Alert,Image,TouchableOpacity,TextInput,AsyncStorage} from 'react-native';

export default class Dados extends Component {
  constructor(props){
        super(props);
        this.state = {cep: '', localidade: '', uf: '', logradouro: '', bairro: '',
        temperatura: '', humidade:'', descricao: '', loading:true, mensagem: '', latitude: '', longitude: ''} ;
        this.filterText = this.filterText.bind(this);
        this.capturaCep = this.capturaCep.bind(this);
        this.limparDados = this.limparDados.bind(this);  
        this.capturaTemp = this.capturaTemp.bind(this); 
        this.capturaMap = this.capturaMap.bind(this);
        this.chamaMapa = this.chamaMapa.bind(this);
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
            s.logradouro = json.logradouro;
            s.bairro = json.bairro;
            s.mensagem = 'Aguarde...';
            switch(json.uf){
              case 'AC': s.uf = 'Acre'; break;
              case 'AL': s.uf = 'Alagoas'; break;
              case 'AP': s.uf = 'Amapá'; break;
              case 'AM': s.uf = 'Amazonas'; break;
              case 'BA': s.uf = 'Bahia'; break;
              case 'CE': s.uf = 'Ceará'; break;
              case 'DF': s.uf = 'Distrito Federal'; break;
              case 'ES': s.uf = 'Espírito Santo'; break;
              case 'GO': s.uf = 'Goiás'; break;
              case 'MA': s.uf = 'Maranhão'; break;
              case 'MT': s.uf = 'Mato Grosso'; break;
              case 'MS': s.uf = 'Mato Grosso do Sul'; break;
              case 'MG': s.uf = 'Minas Gerais'; break;
              case 'PA': s.uf = 'Pará'; break;
              case 'PB': s.uf = 'Paraíba'; break;
              case 'PR': s.uf = 'Paraná'; break;
              case 'PE': s.uf = 'Pernambuco'; break;
              case 'PI': s.uf = 'Piauí'; break;
              case 'RJ': s.uf = 'Rio de Janeiro'; break;
              case 'RN': s.uf = 'Rio Grande do Norte'; break;
              case 'RS': s.uf = 'Rio Grande do Sul'; break;
              case 'RO': s.uf = 'Rond&ohat;nia'; break;
              case 'RR': s.uf = 'Roraima'; break;
              case 'SC': s.uf = 'Santa Catarina'; break;
              case 'SP': s.uf = 'São Paulo'; break;
              case 'SE': s.uf = 'Sergipe'; break;
              case 'TO': s.uf = 'Tocantins'; break;    
          }           
            this.setState(s);
            this.capturaTemp(this.state.localidade.replace(' ','%20'), this.state.uf.replace(' ','%20'));             
          });                            
        }
  }

  capturaTemp(localidade, cidade){
    const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";           
    const url =`http://api.openweathermap.org/data/2.5/weather?q=${localidade},${cidade}&appid=${apiKey}&units=metric`;        
    fetch(url)     
    .then((r)=>r.json())
    .then((json)=>{
      let s = this.state;
      s.temperatura = json.main.temp + '°';
      s.humidade = json.main.humidity;
      s.descricao = json.weather[0].description;
      s.loading = false;              
      s.mensagem = '';
      s.latitude = json.coord.lat;      
      s.longitude = json.coord.lon;
      //console.log(json);
      this.setState(s); 
      this.capturaMap(this.state.logradouro.replace(' ','+'), this.state.localidade.replace(' ','+'));           
    });
  }

  async limparDados(){
    try {
      let s = this.state;    
      s.cep = '';
      s.localidade = '';
      s.uf = '';
      s.logradouro = '';
      s.bairro = ''
      s.mensagem = '';
      s.loading = true;
      this.setState(s);
      await AsyncStorage.clear();
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  capturaMap(localidade, logradouro){
    const url =`https://locationiq.org/v1/search.php?key=50e80f5c1c3072&q=${localidade}+${logradouro}&format=json`;
    fetch(url)     
    .then((r)=>r.json())
    .then((json)=>{ 
      let lat = json[0].lat
      let lon = json[0].lon;
     this.saveCoord(lat,lon);     
    });        
  }

  async saveCoord (lat, lon) {
    try {
      await AsyncStorage.setItem('latitude', lat)
      await AsyncStorage.setItem('longitude', lon)
    } catch (error) {
      console.log('Error saving data' + error);
    }
  }

  chamaMapa(){
    this.props.navigation.navigate('Maps',{
      longitude: this.state.longitude,
      latitude: this.state.latitude
    });
  }

  render(){
    if(this.state.loading){
      return(
        <View style={styles.body}>
        <ImageBackground source={require('../../buscaCep/imagens/background3.png')} style={styles.bgImage}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Busca Cep</Text>              
        </View>      
        <View style={styles.sectionContainer}>
          <TextInput style={styles.textInputStyle}  onChangeText={this.filterText} value={this.state.cep} placeholder="Insira o CEP desejado" placeholderTextColor="#121111"/>  
        </View>  
        <View style={styles.sectionContainer}>  
        <Button title="Buscar" style={styles.button} accessibilityLabel="Buscar" onPress={this.capturaCep} color="#5cb85c"/>              
        </View>
        <Text style={styles.loadingText}>{this.state.mensagem}</Text>          
        <View style={styles.viewBotao}>
          <Button title="Limpar" onPress={this.limparDados} color="#ff3232"/>      
          <Button title="Salvar" onPress={() => Alert.alert('Salvar Consulta')}   color="#5cb85c"/>                      
          <TouchableOpacity onPress={() => Alert.alert('Por favor, digite o Cep!')}>
            <Image source={require('../../buscaCep/imagens/google-maps.png')} style={styles.imagemMaps}/>
          </TouchableOpacity>
        </View> 
        </ImageBackground>     
      </View>          
      );
    } else {
    return (                        
      <View style={styles.body}>
        <ImageBackground source={require('../../buscaCep/imagens/background3.png')} style={styles.bgImage}>
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
          <Text style={styles.titulo3}> {this.state.temperatura} - {this.state.descricao} </Text>          
        </View>        
        <View style={styles.viewBotao}>
          <Button title="Limpar" onPress={this.limparDados} color="#ff3232"/>      
          <Button title="Salvar" onPress={() => Alert.alert('Salvar Consulta')}   color="#5cb85c"/>                      
          <TouchableOpacity onPress={this.chamaMapa}>
            <Image source={require('../../buscaCep/imagens/google-maps.png')} style={styles.imagemMaps}/>
          </TouchableOpacity>
        </View> 
        </ImageBackground>     
      </View>          
    );
  }
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
    marginTop: 30,
    marginLeft: 10,
    marginRight:10
  },
  viewBotao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:10,
    position: 'absolute',
    left: 20, 
    right: 20, 
    bottom: 20,
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
    fontSize:18,
    marginTop:5
  },
  titulo3:{
    fontSize:18,
    marginTop:5
  },
  loadingText:{
    textAlign: 'center',
    alignItems:'center',
    marginTop: 40,
    marginLeft: 10,
    marginRight:10,
    fontSize: 30
  },
  viewmaps: {
    height: '100%',
    width: '100%',
  },
  map:{
    height: '100%',
    width: '100%'
  }
});