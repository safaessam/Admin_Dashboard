const INITIAL_STATE = {
    ads: [

    ]
};

const adReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_AD':
        return {
          ...state,
          ads: [...state.ads, action.payload]
        };
      case 'UPDATE_AD':
        const updatedAdIndex = state.ads.findIndex(ad => ad.id === action.payload.id);
        if (updatedAdIndex !== -1) {
          const updatedAds = [...state.ads];
          updatedAds[updatedAdIndex] = action.payload;
          return {
            ...state,
            ads: updatedAds
          };
        }
        return state;
      case 'DELETE_AD':
        const { id } = action.payload;
        return {
          ...state,
          ads: state.ads.filter(ad => ad.id !== id)
        };
      case 'LIST_ADS':
        return {
          ...state,
          ads: action.payload
        };
      default:
        return state;
    }
  };
  
  export default adReducer;