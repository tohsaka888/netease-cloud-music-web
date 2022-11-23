import { getBanner, url as bannerUrl } from "@services/useBanner";
import {
  getHotRecommend,
  url as hotRecommendUrl,
} from "@services/useHotRecommend";
import { url as newAlbumUrl, getNewAlbum } from "@services/useNewAlbum";
import Sider from "components/HomePage/Sider";
import Navbar from "components/Common/Navbar";
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
      <Navbar />
      <Banner />
      <Layout>
        <Content />
        <Sider />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps = async () => {
  const bannerData = await getBanner();
  const hotRecommendData = await getHotRecommend();
  const newAlbumData = await getNewAlbum();
  const hotArtistsData = await getHotArtists();
  const hotDjData = await getHotDj();
  return {
    props: {
      fallback: {
        [bannerUrl]: bannerData,
        [hotRecommendUrl]: hotRecommendData,
        [newAlbumUrl]: newAlbumData,
        hotArtists: hotArtistsData,
        hotDj: hotDjData,
      },
    },
  };
};

export default Home;
