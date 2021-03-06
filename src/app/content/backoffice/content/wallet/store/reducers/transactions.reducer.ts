import { TRANSACTION_FAIL, TRANSACTION_REQUEST, TRANSACTION_SUCCESS } from '../actions/transaction.actions';

export const initialState: any = {
  isLoading: false,
  isLoaded: false,
  data: []
};

// tslint:disable-next-line: no-any
export function reducer(state: any = initialState, action: any): any {
  switch (action.type) {

    case TRANSACTION_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    case TRANSACTION_SUCCESS: {
      const data = action.payload && action.payload.transactions ? action.payload.transactions : [];

      return {
        ...state,
        isLoading: false,
        data
      };
    }

    case TRANSACTION_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
      };
    }

    default: {
      return state;
    }
  }
}
