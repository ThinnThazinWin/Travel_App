import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, {
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Hotels, Attractions, Restaurants, NotFound } from "../assets";
import { FontAwesome } from "@expo/vector-icons";
import MenuContainer from "../components/MenuContainer";
import ItemContainer from "../components/ItemContainer";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getPlacesData } from "../api";

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("hotels");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const[bl_lat,setBl_lat]=useState(null);
  const[bl_lng,setBl_lng]=useState(null);
  const[tr_lat,setTr_lat]=useState(null);
  const[tr_lng,setTr_lng]=useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat,bl_lng,tr_lat,tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [bl_lat,bl_lng,tr_lat,tr_lng, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center mx-8 ">
        <View>
          <Text className="text-[40px] text-[#0B646B] text-bold">Discover</Text>
          <Text className="text-[36px] text-[#527283]">the beauty today</Text>
        </View>
        <View className="w-16 h-16 bg-gray-400 rounded-md items-center justify-center">
          <Image
            className="w-full h-full rounded-md object-cover"
            source={Avatar}
          />
        </View>
      </View>

      <View className=" flex-row items-center bg-gray-50 rounded-xl  py-1 px-4 shadow-lg mt-4 mx-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat)
            setBl_lng(details?.geometry?.viewport?.southwest?.lng)
            setTr_lat(details?.geometry?.viewport?.northeast?.lat)
            setTr_lng(details?.geometry?.viewport?.northeast?.lng)
          }}
          query={{
            key: "AIzaSyABWojea6_nJCK6Vi5rvYHmKn0ViYzGLFU",
            language: "en",
          }}
        />
      </View>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View className="flex-row items-center justify-between px-4 mt-4">
            <Text className="text-[#2C7379] text-[28px] font-bold">
              Top Tips
            </Text>
            <TouchableOpacity className="flex-row items-center justify-center px-2">
              <Text className="text-[#A0C4C7] text-[20px] font-bold">
                Explore
              </Text>
              <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
            </TouchableOpacity>
          </View>

          <View className=" px-4 mt-4  flex-row items-center justify-between flex-wrap">
            {mainData?.length > 0 ? (
              <>
                {mainData?.map((data, i) => (
                  <ItemContainer
                    key={i}
                    imageSrc={
                        data?.photo?.images?.medium?.url
                        ?data?.photo?.images?.medium?.url
                      :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhk9pot4Rerw0YRa1AP-0T8wlRNnWGmA-q6Q&usqp=CAU"
                    }
                    title={data?.name}
                    location={data?.location_string}
                    data={data}
                  />
            ))}
              </>
            ) : (
              <>
                <View className="w-full h-[400px] items-center justify-center">
                  <Image source={NotFound} className="w-32 h-32 object-cover" />
                  <Text className="text-xl text-[#428288] font-semibold mt-4">
                    OOps..Not Data Found
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
