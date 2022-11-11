import { getBanner, url as bannerUrl } from "@services/useBanner";
import {
  getHotRecommend,
  url as hotRecommendUrl,
} from "@services/useHotRecommend";
import { url as newAlbumUrl, getNewAlbum } from "@services/useNewAlbum";
import { getPlaylistDetail } from "@services/usePlaylistDetail";
import Navbar from "components/Common/Navbar";
import Banner from "components/HomePage/Banner";
import Content from "components/HomePage/Content";
import { newId, originId, solarId } from "config/toplistIds";
import { NextPage } from "next";
import { SWRConfig } from "swr";

const Home: NextPage<{ fallback: Promise<any> }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Navbar />
      <Banner />
      <Content />
    </SWRConfig>
  );
};

export const getServerSideProps = async () => {
  const bannerData = await getBanner();
  const hotRecommendData = await getHotRecommend();
  const newAlbumData = await getNewAlbum();
  const soarListData = await getPlaylistDetail({ id: +solarId! });
  const newListData = await getPlaylistDetail({ id: +newId! });
  const originListData = await getPlaylistDetail({ id: +originId! });
  return {
    props: {
      fallback: {
        [bannerUrl]: bannerData,
        [hotRecommendUrl]: hotRecommendData,
        [newAlbumUrl]: newAlbumData,
        [`${solarId}`]: soarListData,
        [`${newId}`]: newListData,
        [`${originId}`]: originListData,
      },
    },
  };
};

export default Home;
