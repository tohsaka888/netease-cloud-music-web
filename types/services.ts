import { Album, Banner, HotRecommendProps, Playlist, Privilege } from "./";

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

export type NewAlbumResponse = {
  total: number;
  albums: Album[];
  code: number;
};

export type PlaylistDetailResponse = {
  code: number;
  relatedVideos: null;
  playlist: Playlist;
  urls: null;
  privileges: Privilege[];
  sharedPrivilege: null;
  resEntrance: null;
  fromUsers: null;
  fromUserCount: number;
  songFromUsers: null;
};
