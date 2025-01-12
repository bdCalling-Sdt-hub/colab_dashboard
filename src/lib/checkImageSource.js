import { imageUrl } from "../redux/api/baseApi";

export function checkImageSource(url) {
    if (url && url.includes("cloudinary.com")) {
      return url;
    } else {
      return `${imageUrl}${url}`;
    }
  }