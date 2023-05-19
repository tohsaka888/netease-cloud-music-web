import { getBanner, url as bannerUrl } from "@services/useBanner";
import {
  getHotRecommend,
  url as hotRecommendUrl,
} from "@services/useHotRecommend";
import { url as newAlbumUrl, getNewAlbum } from "@services/useNewAlbum";
import Sider from "components/HomePage/Sider";
import Banner from "components/HomePage/Banner";
import Content from "components/HomePage/Content";
import { NextPage } from "next";
import { SWRConfig } from "swr";
import { Layout } from "antd";
import { getHotArtists } from "@services/useHotArtists";
import { getHotDj } from "@services/useHotDj";

const Home: NextPage<{ fallback: Promise<any> }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Banner />
      <Layout>
        <Content />
        <Sider />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps = async () => {
  const results = await Promise.all([
    getBanner(),
    getHotRecommend(),
    getNewAlbum(),
    getHotArtists(),
    getHotDj(),
  ]);
  const bannerData = results[0];
  const hotRecommendData = results[1];
  const newAlbumData = results[2];
  const hotArtistsData = results[3];
  const hotDjData = results[4];
  // const loginStatus = await getLoginStatus();
  return {
    props: {
      fallback: {
        [bannerUrl]: bannerData,
        [hotRecommendUrl]: hotRecommendData,
        [newAlbumUrl]: newAlbumData,
        hotArtists: hotArtistsData,
        hotDj: hotDjData,
        // loginStatus,
      },
    },
  };
};

export default Home;
