
const state = {
  singer: {},
  playing: false,			// 播放器状态
  fullScreen: true,			// 播放器全屏
  playList: [],				// 播放列表
  sequenceList: [],			// 播放顺序列表
  playMode: 0,				// 播放模式  0：顺序播放  1：循环播放  2：随机播放
  currentIndex: 0			// 当前播放歌曲索引
};

export default state;