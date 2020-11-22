import ApiService from "@/common/api.service";
import { 
QUES_INDEX,
QUES_DELETE,
QUES_VIEW,
QUES_CREATE,
QUES_SHOW
} from "../actions.type";


import {
SET_QUESTIONNAIRES
 } from "../mutations.type";

const state = {
 questionnaires: []
};

const getters = {
 questionnaires(state) {
 	return questionnaires.state
 }
};

const actions = {

  [QUES_INDEX](context, data){
    return ApiService.post("question/questionnaire", data).
    then( result => {
      context.commit(SET_QUESTIONNAIRES, result );
      return Promise.resolve(result)
    })
  },
  [QUES_DELETE](context, data){
    return ApiService.post("question/delete", data);
  },
  [QUES_VIEW](context, data){
    return ApiService.post("question/view", data);
  },
  [QUES_CREATE](context, data){
    return ApiService.post("question/create", data);
  },
  [QUES_SHOW](context, data){
    return ApiService.post("question/show", data);
  }
  
};

const mutations = {
 [SET_QUESTIONNAIRES](context, data){
 	context.questionnaires = data
 }
};

export default {
  state,
  actions,
  mutations,
  getters
};
