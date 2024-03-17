import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import Company from "../../components/jobdetails/company/Company";
import JobTabs from "../../components/jobdetails/tabs/Tabs";
import { COLORS, SIZES, icons, images } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";

const JobDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  console.log(params.id);
  const onRefresh = () => {
    refetch();
    
  };

  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} />
          }
        >
          {!isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text> Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
              />

              <JobTabs />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
