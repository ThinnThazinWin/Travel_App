import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ItemContainer = ({imageSrc,title,location,data}) => {
  const navigation=useNavigation();

  return (
   <TouchableOpacity onPress={()=>navigation.navigate("ItemScreen",{param:data})}
   className="rounded-md border border-gray-300 space-y-4 px-3 py-2 shadow-md bg-white w-[176px] my-2">
    <Image 
        source={{uri:imageSrc}}
        className="w-full h-40 rounded-md object-cover"
    />
    {title?(
      <>
      <Text className="text-[#428288] text-[18px] font-bold">{title?.length>14?`${title.slice(0,14)}..`:title}</Text>
    <View className="flex-row">
        <FontAwesome name="map-marker" size={24} color="black" />
        <Text className="text-[#428288] text-[16px] font-bold">{location?.length>18?`${title.slice(0,18)}..`:location}</Text>
    </View>
    </>
    ):(<></>)}
    
   </TouchableOpacity>
  )
}

export default ItemContainer