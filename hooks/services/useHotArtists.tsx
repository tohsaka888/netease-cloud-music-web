import { baseUrl } from "config/baseUrl";
import React from "react";

import useImmutableSWR from "swr/immutable";
import { HotArtistsResponse } from "types";

export const getHotArtists = async () => {
  const res = await fetch(`${baseUrl}/top/artists?offset=0&limit=5`, {
    mode: "cors",
  });
  const data: HotArtistsResponse = await res.json();
  return data;
};

function useHotArtists() {
  const response = useImmutableSWR("hotArtists", getHotArtists);
  return response;
}

export default useHotArtists;
