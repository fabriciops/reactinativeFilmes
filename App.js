import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    const requestMovies = async()=>{
      setLoading(true);
      const req = await fetch("https://api.b7web.com.br/cinema/");
      const json = await req.json();
  
      if(json){
        setMovies(json);
      }
      setLoading(false);
    }

    requestMovies();

  }, []);

  // const handleLoadButton = async () => {
  //   const req = await fetch("https://api.b7web.com.br/cinema/");
  //   const json = await req.json();

  //   if(json){
  //     setMovies(json);
  //   }

  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Carregar Filmes" onPress={handleLoadButton} style={styles.button}/> */}

    {loading && 
      <View style={styles.loadingArea}>
        <ActivityIndicator size="large" color="#FFFFFF"/>
        <Text style={styles.loadingText}> Carregando</Text>
      </View>
    }


    {!loading && 
      <Text style={styles.totalMovieText}>Total de Filmes: {movies.length} </Text>>
      <FlatList
        style={styles.list} 
        data={movies}
        renderItem = {({item}) => (
          <View style={styles.movieItem}>
            
            <Image 
              source={{uri: item.avatar}}
              style={styles.movieImage}
              resizeMode="contain"
              />
            <Text style={styles.movieTitle}>
            {item.titulo}
            </Text>
          </View>
        )}
        keyExtractor={item => item.titulo}

      />
      
    }

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#333'
  },
  totalMovieText:{
    color:'#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10

  },
  button:{
    marginTop: 200,
  },
  list:{
    flex: 1
  },
  movieItem:{
    marginBottom: 30
  },
  movieImage:{
    height: 200
  },
  movieTitle:{
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5
  },

  loadingArea:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  loadingText:{
    color: '#FFF'
  }



});

export default App;