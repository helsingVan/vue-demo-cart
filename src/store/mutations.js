import * as types from './mutation-type';

const mutation = {
  [types.setSinger](state,singer) {
  	state.singer = singer;
  }
}

export default mutation;