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
