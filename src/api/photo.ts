import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../axios-config";
import { Image } from "../features/searchSlice";
import { ENDPOINTS } from "./../../endpoints";

export const getListPhoto = async (params: string): Promise<Image[]> => {
  return axiosClient.get(ENDPOINTS.photo.search(params));
};

export const useFlickrSearch = (query: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flickr", query],
    queryFn: () => getListPhoto(query),
    enabled: !!query,
  });

  return { data: data?.data || [], isLoading, error };
};
