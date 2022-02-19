export interface TikTokMetadata {
  readonly statusCode: number;
  readonly itemInfo: ItemInfo;
  readonly shareMeta: ShareMeta;
}

interface ItemInfo {
  readonly itemStruct: ItemStruct;
}

type ItemStruct = Readonly<{
  id: string;
  desc: string;
  createTime: number;
  video: Video;
  author: Author;
  music: Music;
  challenges: Challenge[];
  stats: Stats;
  isActivityItem: boolean;
  duetInfo: DuetInfo;
  originalItem: boolean;
  officalItem: boolean;
  textExtra: TextExtra[];
  secret: boolean;
  forFriend: boolean;
  digged: boolean;
  itemCommentStatus: number;
  showNotPass: boolean;
  vl1: boolean;
  itemMute: boolean;
  authorStats: AuthorStats;
  privateItem: boolean;
  duetEnabled: boolean;
  stitchEnabled: boolean;
  shareEnabled: boolean;
  stickersOnItem: StickersOnItem[];
  isAd: boolean;
  duetDisplay: number;
  stitchDisplay: number;
}>;

type Author = Readonly<{
  id: string;
  uniqueId: string;
  nickname: string;
  avatarThumb: string;
  avatarMedium: string;
  avatarLarger: string;
  signature: string;
  verified: boolean;
  secUid: string;
  secret: boolean;
  ftc: boolean;
  relation: number;
  openFavorite: boolean;
  commentSetting: number;
  duetSetting: number;
  stitchSetting: number;
  privateAccount: boolean;
  isADVirtual: boolean;
}>;

type AuthorStats = Readonly<{
  followingCount: number;
  followerCount: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
  heart: number;
}>;

type Challenge = Readonly<{
  id: string;
  title: string;
  desc: string;
  profileThumb: string;
  profileMedium: string;
  profileLarger: string;
  coverThumb: string;
  coverMedium: string;
  coverLarger: string;
  isCommerce: boolean;
}>;

interface DuetInfo {
  readonly duetFromId: string;
}

type Music = Readonly<{
  id: string;
  title: string;
  playUrl: string;
  coverThumb: string;
  coverMedium: string;
  coverLarge: string;
  authorName: string;
  original: boolean;
  duration: number;
  album: string;
}>;

type Stats = Readonly<{
  diggCount: number;
  shareCount: number;
  commentCount: number;
  playCount: number;
}>;

interface StickersOnItem {
  readonly stickerType: number;
  readonly stickerText: string[];
}

type TextExtra = Readonly<{
  awemeId: string;
  start: number;
  end: number;
  hashtagName: string;
  hashtagId: string;
  type: number;
  userId: string;
  isCommerce: boolean;
  userUniqueId: string;
  secUid: string;
  subType: number;
}>;

type Video = Readonly<{
  id: string;
  height: number;
  width: number;
  duration: number;
  ratio: string;
  cover: string;
  originCover: string;
  dynamicCover: string;
  playAddr: string;
  downloadAddr: string;
  shareCover: string[];
  reflowCover: string;
  bitrate: number;
  encodedType: string;
  format: string;
  videoQuality: string;
  encodeUserTag: string;
  codecType: string;
  definition: string;
}>;

interface ShareMeta {
  readonly title: string;
  readonly desc: string;
}

export type NodeEnv = 'production' | 'development' | 'testing';

export type ShazamResponse = Readonly<{
  matches: Match[];
  timestamp: number;
  timezone: string;
  tagid: string;
  track?: Track;
}>;

type Match = Readonly<{
  id: string;
  offset: number;
  channel: string;
  timeskew: number;
  frequencyskew: number;
}>;

type Track = Readonly<{
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  images?: TrackImages;
  share: Share;
  hub: Hub;
  url: string;
  artists: Artist[];
  isrc: string;
  genres: Genres;
  urlparams: Urlparams;
  myshazam: Myshazam;
  albumadamid: string;
  sections: Section[];
}>;

interface Artist {
  readonly id: string;
  readonly adamid: string;
}

interface Genres {
  readonly primary: string;
}

type Hub = Readonly<{
  type: string;
  image: string;
  actions: HubAction[];
  options: Option[];
  providers: Provider[];
  explicit: boolean;
  displayname: string;
}>;

type HubAction = Readonly<{
  name?: string;
  type: string;
  id?: string;
  uri?: string;
  share?: Share;
}>;

type Share = Readonly<{
  subject: string;
  text: string;
  href: string;
  image: string;
  twitter: string;
  html: string;
  avatar: string;
  snapchat: string;
}>;

type Option = Readonly<{
  caption: string;
  actions: HubAction[];
  beacondata: OptionBeacondata;
  image: string;
  type: string;
  listcaption: string;
  overflowimage: string;
  colouroverflowimage: boolean;
  providername: string;
}>;

interface OptionBeacondata {
  readonly type: string;
  readonly providername: string;
}

type Provider = Readonly<{
  caption: string;
  images: ProviderImages;
  actions: HubAction[];
  type: string;
}>;

interface ProviderImages {
  readonly overflow: string;
  readonly default: string;
}

type TrackImages = Readonly<{
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}>;

interface Myshazam {
  readonly apple: Apple;
}

interface Apple {
  readonly actions: HubAction[];
}

type Section = Readonly<{
  type: string;
  metapages?: Metapage[];
  tabname: string;
  metadata?: Metadatum[];
  text?: string[];
  footer?: string;
  beacondata?: SectionBeacondata;
  youtubeurl?: Youtubeurl;
  avatar?: string;
  id?: string;
  name?: string;
  verified?: boolean;
  actions?: SectionAction[];
}>;

interface SectionAction {
  readonly type: string;
  readonly id: string;
}

interface SectionBeacondata {
  readonly lyricsid: string;
  readonly providername: string;
  readonly commontrackid: string;
}

interface Metadatum {
  readonly title: string;
  readonly text: string;
}

interface Metapage {
  readonly image: string;
  readonly caption: string;
}

interface Youtubeurl {
  readonly caption: string;
  readonly image: Image;
  readonly actions: HubAction[];
}

interface Image {
  readonly dimensions: Dimensions;
  readonly url: string;
}

interface Dimensions {
  readonly width: number;
  readonly height: number;
}

interface Urlparams {
  readonly '{tracktitle}': string;
  readonly '{trackartist}': string;
}
