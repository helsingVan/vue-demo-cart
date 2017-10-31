import * as types from './mutation-types';

// 点击歌曲列表播放action
export const playStartAction = ({commit,state},{list,index}) => {
  commit(types.SET_PLAYING,true);
  commit(types.SET_FULLSCREEN,true);
  commit(types.SET_PLAYLIST,list);
  commit(types.SET_SEQUENCELIST,list);
  commit(types.SET_CURRENTINDEX,index);
};