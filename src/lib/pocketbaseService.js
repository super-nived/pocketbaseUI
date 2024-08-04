// src/pocketbaseService.js

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.dev.industryapps.net/GNJU8');

export const authenticate = async (email, password) => {
    pb.autoCancellation(false) 
    await pb.admins.authWithPassword(email, password);
};

export const getPaginatedCollections = async (page, perPage, filter) => {
    pb.autoCancellation(false) 
    return await pb.collections.getList(page, perPage, { filter });
};

export const getAllCollections = async (sort) => {
    pb.autoCancellation(false) 
    return await pb.collections.getFullList({ sort });
};

export const getFirstCollection = async (filter) => {
    return await pb.collections.getFirstListItem(filter);
};

export const getAllRecords= async (collection_name) => {
  return await pb.collection(collection_name).getFullList({
});
};




export const pocketLogout = async () => {
     pb.autoCancellation(false) 
     pb.authStore.clear();
};
