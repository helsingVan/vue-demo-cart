import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER](state,singer) {
  	state.singer = singer;
  },
  /*
   *	播放器mutation
   */
  [types.SET_PLAYING](state,flag) {
  	state.playing = flag;
  },
  [types.SET_FULLSCREEN](state,flag) {
  	state.fullscreen = flag;
  },
  [types.SET_PLAYLIST](state,list) {
  	state.playList = list;
  },
  [types.SET_SEQUENCELIST](state,list) {
  	state.sequenceList = list;
  },
  [types.SET_PLAYMODE](state,mode) {
  	state.playMode = mode;
  },
  [types.SET_CURRENTINDEX](state,index) {
  	state.currentIndex = index;
  }
};





export default mutations;