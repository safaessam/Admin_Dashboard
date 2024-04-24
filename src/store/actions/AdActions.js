export const addAd = (ad) => ({
    type: 'ADD_AD',
    payload: ad
});

export const updateAd = (ad) => ({
    type: 'UPDATE_AD',
    payload: ad
});


export const deleteAd = (ad) => ({
    type: 'DELETE_AD',
    payload: ad 
  });
  
export const listAds = (ads) => ({
    type: 'LIST_ADS',
    payload: ads
});