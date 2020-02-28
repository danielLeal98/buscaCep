import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
    resizeMode: cover;
`;
export const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
`;
export const CardLoading = styled.View`
    width: auto;
    height: auto;
    justify-content: center;
    align-items: center;
`;
export const ImageLoader = styled.Image`
    flex: 1;
    justify-content: center;
    align-items: center;
    backgroundColor: transparent;
`;
export const TextLoading = styled.Text`
    font-size: 36px;
    color: #fff;
    text-align: center;
    margin: 12px 30px 12px 30px;
    font-family: Montserrat-Black;
`;
export const ViewInfoAddress = styled.View`    
	justify-content: center;
	align-items: center;   
`;
export const ViewImage = styled.View`    
	justify-content: center;
	align-items: center;   
`;
export const ViewContanier2 = styled.View`
    flex: 1;
    flexDirection: row;
    position: absolute
    bottom:0;
    align-items: center;
`;
export const ViewButtonContainer = styled.View`
    flex:1;
`;
export const ImageMaps = styled.Image`
    width: 40px;
    height: 40px;
`;
export const ButtonSearch = styled.TouchableOpacity`
    background-color: #0095ff;
    border-radius: 100px;
    width: 40%;
    marginBottom: 200px;
`;
export const ButtonClear = styled.TouchableOpacity`
    background-color: #CC0000;
    border-radius: 20px;    
    width: 90%;  
    margin:10px;      
`;
export const ButtonSave = styled.TouchableOpacity`
    background-color: #5cb85c;
    border-radius: 100px;    
    width: 90%; 
    margin:20px;
`;
export const TouchableOpacityMaps = styled.TouchableOpacity`    
    width:auto; 
    marginLeft:40px;     
`;
export const ButtonTextSearch = styled.Text`
    font-size: 15px;
    color: #fff;
    text-align: center;
    margin: 12px 30px 12px 30px;
    font-family: Montserrat-Black;
`;
export const ButtonTextClear = styled.Text`
    font-size: 15px;
    color: #fff;
    text-align: center;
    margin: 12px 12px 12px 12px;
    font-family: Montserrat-Black;
`;
export const ButtonTextSave = styled.Text`
    font-size: 15px;
    color: #fff;
    text-align: center;
    margin: 12px 12px 12px 12px;
    font-family: Montserrat-Black;
`;
export const ViewButton = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    marginTop:10px;
`;
export const ViewTitle = styled.View`         
    align-items: center; 
`;
export const TextTitle = styled.Text`
    font-size: 26px;
    color: #fff;
    text-align: center;
    margin: 20px;    
    font-family: Montserrat-Bold;
`;
export const Title1 = styled.Text`
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    margin: 10px;    
    font-family: Montserrat-Bold;
`;
export const Title2 = styled.Text`
    font-size: 18px;
    color: #ffffff;
    text-align: center;   
    font-family: Montserrat-Bold;
`;
export const Title3 = styled.Text`
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    font-family: Montserrat-Light;
`;
export const InputCep = styled.TextInput`
    font-size: 16px;
    border: solid 1px #dbdbdb;
    border-radius: 3px;
    color: #262626;
    padding: 7px 33px;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    background: #999;
`;
