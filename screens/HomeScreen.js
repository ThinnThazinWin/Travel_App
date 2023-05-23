import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="flex-row items-center space-x-2 mt-8 mx-">
        <View className="w-12 h-12 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-3xl font-semibold">Go</Text>
        </View>

        <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel</Text>
      </View>

      <View className="mt-8 mx-4">
        <Text className="text-4xl text-[#2A2B4B]">Enjoy the trip with</Text>
        <Text className="text-3xl text-[#00BCC9] font-bold mt-2">
          Good Moments
        </Text>
        <Text className="text-[#2A2B4B] mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum{" "}
        </Text>
      </View>
      <View className="w-[350px] h-[360px] bg-[#00BCC9] rounded-full absolute bottom-40 -right-36"></View>
      <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation={"fadeIn"}
          easing="ease-in-out"
          source={HeroImage}
          className="w-full h-full object-cover"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}
          className="absolute bottom-28 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            className=" w-20 h-20 rounded-full items-center justify-center bg-[#00BCC9]"
          >
            <Text className="text-3xl text-[#fff] font-semibold">Go</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
