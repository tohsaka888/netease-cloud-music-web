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

type ArtistProps = {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  showPrivateMsg: null;
  isSubed: null;
  accountId: null | number;
  picId_str: string;
  img1v1Id_str: string;
  transNames: null;
  followed: boolean;
  mvSize: null;
  publishTime: null;
  identifyTag: null;
  alg: null;
  fansCount: number;
};

export type HotArtistsResponse = {
  code: number;
  more: boolean;
  artists: ArtistProps[];
};
