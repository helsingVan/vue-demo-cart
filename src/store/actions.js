import * as types from './mutation-type';
import { playMode } from 'common/js/config';
import {shuffle} from 'common/js/util';

function findIndex(list,song) {
  return list.findIndex((item)=> {
  	return item.id === song.id;
  })
}

const selectPlay = ({commit,state},{list,index}) => {
  commit(types.setSequenceList,list);

  if(state.mode === playMode.random) {
  	// 随机播放
  	let randomList = shuffle(list);
  	commit(types.setPlayList,randomList);
  	index = findIndex(randomList,list[index]);
  }else {
  	commit(types.setPlayList,list);
  }
  commit(types.setCurrentIndex,index);
  commit(types.setFullScreen,true);
  commit(types.setPlaying,true);
};

const randomPlay = ({commit,state},{list}) => {
  commit(types.setMode,playMode.random);
  commit(types.setSequenceList,list);
  let randomList = shuffle(list);
  commit(types.setPlayList,randomList);
  commit(types.setCurrentIndex,0);
  commit(types.setPlaying,true);
  commit(types.setFullScreen,true);
}

export { selectPlay,randomPlay };