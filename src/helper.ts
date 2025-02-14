import { DataImage, Image } from "./features/searchSlice";

export const mapFlickrData = (data: Image[] | []): DataImage[] => {
  if (data.length === 0) return [];
  return data.map((item) => {
    return {
      images: item.media.m,
      author: item.author.replace(/nobody@flickr\.com \("(.*)"\)/, "$1"), // Extract author name
      tag: item.tags,
      link: item.link,
    };
  });
};
