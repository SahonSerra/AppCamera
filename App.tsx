import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const [status, setStatus] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function abrirCamera(){
      try{
        setStatus("Pedindo Permissão....");

        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if(status !== 'granted'){
          setStatus("Permissão negada!! Assim não pode usar a câmera!!");
          return;
        }

        setStatus("Abrindo a camera ...");

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality:1
        });

        if(result.canceled){
          setStatus("Câmera cancelada!");
        }else{
          const foto = result.assets[0];
          setImageUri(foto.uri);
          setStatus("Imagem capturada!");
        } 


      }catch(erro){
        setStatus("Erro ao abrir");
      }
  }

   async function apagarFoto()
   {
      try{
        setStatus("Foto excluida com sucesso!");

        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if(status !== 'granted')
          {

          }

      }

   }





  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../AppCamera/assets/back02.jpg')}
        style={styles.imgFundo}
        imageStyle={styles.opacityImage}
      >
        {/* Overlay com gradiente Frutiger Aero */}
        <LinearGradient
          colors={['rgba(135, 206, 250, 0.6)', 'rgba(0, 191, 255, 0.4)', 'rgba(64, 224, 208, 0.5)']}
          style={styles.gradientOverlay}
        />

        <View style={styles.contentContainer}>
          {/* Container do título com efeito glass */}
          <View style={styles.titleContainer}>
            <Text style={styles.titulo}>📷 Câmera</Text>
            <View style={styles.titleGlow} />
          </View>

          {/* Botão ABRIR  com efeito Aero glass */}
          <TouchableOpacity style={styles.btnContainer} onPress={abrirCamera}>
            <LinearGradient
              colors={['rgba(29, 199, 188, 0.8)', 'rgba(0, 191, 255, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btn}
            >
              <Text style={styles.txtBtn}> ✨ Abrir Câmera</Text>
              <View style={styles.btnShine} />
            </LinearGradient>
          </TouchableOpacity>

          

          {/* Container da imagem com efeito glass */}
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{uri: imageUri}} resizeMode='cover' style={styles.imagem}/>
              <View style={styles.imageFrame} />
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>💧 Nenhuma foto capturada</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  imgFundo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  opacityImage: {
    opacity: 0.4,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
  // Título com efeito Frutiger Aero
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 191, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  titleGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(135, 206, 250, 0.2)',
    borderRadius: 25,
  },
  
  // Botão com efeito glass e brilho
  btnContainer: {
    marginBottom: 25,
    shadowColor: '#1dc7bc',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  txtBtn: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  btnShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  
  // Status com efeito glass
  statusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    minWidth: 250,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Container da imagem com moldura glass
  imageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  imagem: {
    width: 300,
    height: 400,
    borderRadius: 15,
  },
  imageFrame: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  
  // Placeholder com efeito glass
  placeholderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 191, 255, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
});