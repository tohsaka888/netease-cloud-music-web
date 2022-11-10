import { Banner, HotRecommendProps } from "./";

export type HotRecommendResponse = {
  hasTaste: boolean;
  code: number;
  category: number;
  result: HotRecommendProps[];
};

export type BannerResponseProps = {
  banners: Banner[];
  code: number;
};
