import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../axios-config";
import { Image } from "../features/searchSlice";
import { mapFlickrData } from "../helper";
import { ENDPOINTS } from "./../../endpoints";

export const getListPhoto = async (
  params: string
): Promise<{ data: { items: Image[] } }> => {
  return axiosClient.get(ENDPOINTS.photo.search(params));
};

export const useFlickrSearch = (query: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flickr", ENDPOINTS.photo.search(query)],
    queryFn: () => getListPhoto(query),
    enabled: !!query,
  });

  return { data: mapFlickrData(data?.data?.items || []), isLoading, error };
};
