import React, { useRef, useEffect, useState, useCallback,finnaly } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,Animated, TextInput, ActivityIndicatorBase, ActivityIndicator, TouchableOpacity,
} from 'react-native';


export default function App(){
    const [input,setInput]= useState("");
    const [loading, setLoading]= useState(false);
    const[data,setData] = useState([]);
    const api={

      key:'Your api key',
      baseUrl:'http://api.openweathermap.org/data/2.5/',
      };
    const fetchDataHandler = useCallback(() => {
      setLoading(true);
      setInput("");
      axios({
        method:"GET",
        url:`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(e =>console.dir(e))
      .then(() => setLoading(false))
      
    }, [api.key,input]);
      

    if(data!=""){
  return(
      <View style={styles.container}>
       <FadeInView style={styles.container}>
          <Image 
                style={styles.resim}
                source={{
                  uri:'https://freepngimg.com/thumb/categories/2275.png'
                }}
                />
                 <Text style={styles.baslik}>
                    Weather forecast
                    </Text>
                    <TextInput placeholder='Enter City Name'
                    onChangeText={text => setInput(text)}
                    value={input}
                    placeholderTextColor={'black'}
                    style={styles.arama}
                    onSubmitEditing={fetchDataHandler}
                    />
                  
                    {
                      loading && (
                        <View>
                          <ActivityIndicator size={'large'} color="red"/>
                        </View>
                      )
                    }
                    <View>
                    {
                    data &&  (
                        <View>
                         
                         <Text style={styles.text2}>{data.name}, {data.sys.country}</Text>
                          <Text style={styles.text1}>
                            {"Current State: "}{Math.round(data.main.temp)}{"°C"}
                            </Text>
                            <Text style={styles.text1}>{"Min: "}{Math.round(data.main.temp_min)} {"°C  "}
                              {"  Max: "}{Math.round(data.main.temp_max)}{"°C"}
                            </Text>
                            <Text style={styles.text1}>{"Felt Temperature:"}  {Math.round(data.main.feels_like)}{"°C"}</Text>
                            <Text style={styles.text1}>{"Humidity:  %"}{data.main.humidity}</Text>
                            <Text style={styles.text1}>{"Pressure:"} {data.main.pressure}{"hPa"}</Text>
                           
                        </View>
                    )
                   }
                    </View>
                   
                    </FadeInView>
      </View>
  );
} else{
  return(
    <View style={styles.container}>
     <FadeInView style={styles.container}>
        <Image 
              style={styles.resim}
              source={{
                uri:'https://freepngimg.com/thumb/categories/2275.png'
              }}
              />
               <Text style={styles.baslik}>
                  Weather forecast
                  </Text>
                  <TextInput placeholder='Enter City Name'
                  onChangeText={text => setInput(text)}
                  value={input}
                  placeholderTextColor={'black'}
                  style={styles.arama}
                  onSubmitEditing={fetchDataHandler}
                  />
                
                  {
                    loading && (
                      <View>
                        <ActivityIndicator size={'large'} color="red"/>
                      </View>
                    )
                  }
                  <View>
                  
                  </View>
                 
                  </FadeInView>
    </View>
);
}
}

const styles = StyleSheet.create({

  container:{
    backgroundColor:'deepskyblue',
    alignItems:'center',
    flex:1
  },
  baslik:{
        color:'white',
        fontSize:35,
        fontWeight:'200',
        borderBottomColor:'white',
        borderBottomWidth:1
  },
  resim:{
    width: 350,
     height: 250,
     margin:25,
     alignSelf:'center',
     
  },
  arama:{
    backgroundColor:'white',
    marginTop:10,
    width:300,
    borderWidth:1,
    borderColor:'white',
    fontSize:18,
    padding:10,
    borderRadius:20,
    marginBottom:20
  },
  text1:{
    color:'white',
    fontSize:25,
    alignSelf:'center'
  },
  text2:{
    color:'white',
    fontSize:35,
    alignSelf:'center',
    marginBottom:10,
    borderBottomWidth:3,
    borderBottomColor:'white',
    width:300,
    textAlign:'center',
    borderRadius:20
  }
});


const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000/4,
        useNativeDriver:true,
        
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 
      style={{
        ...props.style,
        opacity: fadeAnim,   
        color:'green' ,     
      }}
    >
      {props.children}
    </Animated.View>
  );
}
