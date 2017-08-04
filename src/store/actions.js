import * as types from './mutation-type';

const selectPlay = ({commit,state},{list,index}) => {
  commit(types.setSequenceList,list);
  commit(types.setPlayList,list);
  commit(types.setCurrentIndex,index);
  commit(types.setFullScreen,true);
  commit(types.setPlaying,true);
};

export { selectPlay };