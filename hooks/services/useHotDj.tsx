import { baseUrl } from "config/baseUrl";
import typehole from "typehole";
import useImmutableSWR from "swr/immutable";
import { HotDjResponse } from "types";

export const getHotDj = async () => {
  const res = await fetch(`${baseUrl}/dj/toplist?type=hot&limit=5`);
  const data: HotDjResponse = typehole.t(await res.json());
  return data;
};

function useHotDj() {
  const response = useImmutableSWR("hotDj", getHotDj);
  return response;
}

export default useHotDj;
