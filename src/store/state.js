import { playMode } from 'common/js/config'

const state = {
  singer: {},   // 选择的歌手
  playing: false,   // 播放器状态
  fullScreen: false,  // 全屏
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
};

export default state;