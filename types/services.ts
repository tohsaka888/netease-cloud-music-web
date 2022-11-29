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

type HotDjToplist = {
  id: number;
  name: string;
  picUrl: string;
  programCount: number;
  subCount: number;
  createTime: number;
  categoryId: number;
  category: string;
  rcmdtext: null | string;
  radioFeeType: number;
  feeScope: number;
  playCount: number;
  lastRank: number;
  score: number;
  dj: Dj;
  creatorName: string;
  rank: number;
};
type Dj = {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags: null;
  experts: null;
  djStatus: number;
  vipType: number;
  remarkName: null;
  authenticationTypes: number;
  avatarDetail: null;
  backgroundImgIdStr: string;
  avatarImgIdStr: string;
  anchor: boolean;
  avatarImgId_str: string;
};

export type HotDjResponse = {
  updateTime: number;
  toplist: HotDjToplist[];
  code: number;
};

export type AccountInfoResponse = {
  level?: number;
  listenSongs?: number;
  userPoint?: UserPoint;
  mobileSign?: boolean;
  pcSign?: boolean;
  profile?: Profile;
  peopleCanSeeMyPlayRecord?: boolean;
  bindings?: Binding[];
  adValid?: boolean;
  code: number;
  newUser?: boolean;
  recallUser?: boolean;
  createTime?: number;
  createDays?: number;
  profileVillageInfo?: ProfileVillageInfo;
};
type ProfileVillageInfo = {
  title: string;
  imageUrl: string;
  targetUrl: string;
};
type Binding = {
  refreshTime: number;
  bindingTime: number;
  tokenJsonStr: null;
  expiresIn: number;
  url: string;
  userId: number;
  expired: boolean;
  id: number;
  type: number;
};
type Profile = {
  privacyItemUnlimit: PrivacyItemUnlimit;
  avatarDetail: null;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  nickname: string;
  gender: number;
  mutual: boolean;
  remarkName: null;
  accountStatus: number;
  vipType: number;
  djStatus: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  userType: number;
  defaultAvatar: boolean;
  province: number;
  city: number;
  followed: boolean;
  authStatus: number;
  detailDescription: string;
  experts: Experts;
  expertTags: null;
  createTime: number;
  avatarImgId: number;
  description: string;
  userId: number;
  birthday: number;
  signature: string;
  authority: number;
  followeds: number;
  follows: number;
  blacklist: boolean;
  eventCount: number;
  allSubscribedCount: number;
  playlistBeSubscribedCount: number;
  avatarImgId_str: string;
  followTime: null;
  followMe: boolean;
  artistIdentity: any[];
  cCount: number;
  inBlacklist: boolean;
  sDJPCount: number;
  playlistCount: number;
  sCount: number;
  newFollows: number;
};
type Experts = {};
type PrivacyItemUnlimit = {
  area: boolean;
  college: boolean;
  gender: boolean;
  age: boolean;
  villageAge: boolean;
};
type UserPoint = {
  userId: number;
  balance: number;
  updateTime: number;
  version: number;
  status: number;
  blockBalance: number;
};
