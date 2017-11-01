import * as types from './mutation-types';
import { randomArr } from '@/common/js/tool';

function findIndex(list,song) {
  let index = list.findIndex((v)=> {
  	return v.id === song.id;
  });
  return index;
}


// 点击歌曲列表播放action
export const playStartAction = ({commit,state},{list,index}) => {
  if(state.playMode === 2) {
  	let randomList = randomArr(list);
  	index = findIndex(randomList,list[index]);
  	commit(types.SET_PLAYLIST,randomList);
  }else {
  	commit(types.SET_PLAYLIST,list);
  }
  commit(types.SET_PLAYING,true);
  commit(types.SET_FULLSCREEN,true);
  commit(types.SET_SEQUENCELIST,list);
  commit(types.SET_CURRENTINDEX,index);
};

// 随机播放全部
export const playRandomAction = ({commit,state},{list}) => {
  list = randomArr(list);
  commit(types.SET_PLAYING,true);
  commit(types.SET_FULLSCREEN,true);
  commit(types.SET_SEQUENCELIST,list);
  commit(types.SET_CURRENTINDEX,0);
  commit(types.SET_PLAYMODE,2);
  commit(types.SET_PLAYLIST,list);
}