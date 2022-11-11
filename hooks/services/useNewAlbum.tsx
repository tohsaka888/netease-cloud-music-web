import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWRImmutable from "swr/immutable";

import { NewAlbumResponse } from "types";

export const url = `${baseUrl}/album/new?offset=0&limit=10`;

export const getNewAlbum = async () => {
  const res = await fetch(url, {
    mode: "cors",
  });
  const data: NewAlbumResponse = await res.json();
  return data;
};

function useNewAlbum() {
  const response = useSWRImmutable(url, getNewAlbum);
  return response;
}

export default useNewAlbum;
