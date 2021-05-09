import {UPDATE_OKRS, UPDATE_LOADER_STATUS} from '../actions/types';

const initialState = {
  parentObjectivesIds: [],
  parentObjectivesRelationalChildrenRef: {},
  okrRef: {},
  showLoader: true,
  filterValues: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_OKRS: {
      const okrs = action.okrResults;
      const parentObjectivesIds = [];
      const parentObjectivesRelationalChildrenRef = {};
      const okrRef = {};
      const filterValues = new Set();
      if (okrs) {
        okrs.forEach(okr => {
          okrRef[okr.id] = okr;
          if (okr.parent_objective_id === '') {
            parentObjectivesIds.push(okr.id);
            filterValues.add(okr.category);
          } else {
            parentObjectivesRelationalChildrenRef[okr.parent_objective_id] =
              parentObjectivesRelationalChildrenRef[okr.parent_objective_id]
                ? [...parentObjectivesRelationalChildrenRef[okr.parent_objective_id], okr.id] : [okr.id]
          }
        })
      }
      return {
        ...state,
        parentObjectivesIds,
        parentObjectivesRelationalChildrenRef,
        okrRef,
        filterValues: [...filterValues]
      }
    }
    case UPDATE_LOADER_STATUS: {
      return {...state, showLoader: action.viewMode}
    }
    default:
      return state;
  }
}
