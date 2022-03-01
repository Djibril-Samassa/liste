import { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';


export default function List(){

    const [countries, setCountries] = useState();
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState(false);

    useEffect(() =>{
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((res) => {setCountries(res)})
            .then(setLoading(false))
    },[])

    const handlePress = () => {
        setDisplay((prev) => !prev);
    }

    

    return loading ? <ActivityIndicator></ActivityIndicator> : 

        <>
        <FlatList
			data={countries}
			renderItem={(objet) => 
                <View>
                    <Text  style={{ fontWeight: "bold" }}>{objet.item.name.common}</Text>
                    <TouchableOpacity onPress={() => handlePress()}>
                    <Image style={{height: 50,width: 100}}
					source={{
						uri: `${objet.item.flags.png}`
					}}
				    />
                    </TouchableOpacity>
                    <Text>{display ? objet.item.capital : null}</Text>
                    
                </View>
            }
			keyExtractor={(data, index) => index.toString()}
			ListHeaderComponent={() => <Text style={{ textAlign: "center", textTransform: "uppercase" }}>Header</Text>}
			ListFooterComponent={() => <Text style={{ textAlign: "center", textTransform: "uppercase" }}>Footer</Text>}
			ItemSeparatorComponent={() => (
			<View style={{ borderBottomWidth: 1 }}></View>
			)}
		/></>
            
                
    
    }
