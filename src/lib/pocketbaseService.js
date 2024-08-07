import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.dev.industryapps.net/GNJU8/');

export const authenticate = async (email, password) => {
    pb.autoCancellation(false);
    await pb.admins.authWithPassword(email, password);
};

export const getPaginatedCollections = async (page, perPage, filter) => {
    pb.autoCancellation(false);
    return await pb.collections.getList(page, perPage, { filter });
};

export const getAllCollections = async (sort) => {
    pb.autoCancellation(false);
    return await pb.collections.getFullList({ sort });
};

export const getFirstCollection = async (filter) => {
    return await pb.collections.getFirstListItem(filter);
};

export const getAllRecords = async (collectionName) => {
    return await pb.collection(collectionName).getFullList();
};

// Function to filter records
export const filterRecords = async (collectionName, filterCriteria) => {
    try {
        const records = await pb.collection(collectionName).getFullList({
            filter: filterCriteria,
            perPage: 500,
        });
        return records;
    } catch (error) {
        console.error('Error filtering records:', error);
        return [];
    }
};

export const pocketLogout = async () => {
    pb.autoCancellation(false);
    pb.authStore.clear();
};
