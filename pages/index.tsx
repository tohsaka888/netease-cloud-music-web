import { getBanner, url } from "@services/useBanner";
import Navbar from "components/Common/Navbar";
import Banner from "components/HomePage/Banner";
import { NextPage } from "next";
import { SWRConfig } from "swr";

const Home: NextPage<{ fallback: Promise<any> }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Navbar />
      <Banner />
    </SWRConfig>
  );
};

export const getServerSideProps = async () => {
  const bannerData = await getBanner();
  return {
    props: {
      fallback: {
        [url]: bannerData,
      },
    },
  };
};

export default Home;
