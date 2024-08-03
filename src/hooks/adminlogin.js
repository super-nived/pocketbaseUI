import PocketBase from 'pocketbase';

const pb = new PocketBase('http://your-pocketbase-url');

async function adminLogin() {
  try {
    const authData = await pb.admins.authWithPassword('nivedchandran7@gmail.com', '0987654321');
    pb.authStore.save(authData.token, authData.admin); // Save the admin token
    console.log('Admin authenticated:', authData);
  } catch (error) {
    console.error('Admin authentication failed:', error);
  }
}

export { pb, adminLogin };
