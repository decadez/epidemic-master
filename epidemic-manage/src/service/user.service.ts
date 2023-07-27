import request from '@/utils/request';

const baseUrl = 'http://localhost:8080';

export async function login(params: {
  username?: string;
  email?: string;
  password: string;
}) {
  const res = await request(`/api/login`, {
    method: "GET",
    params,
    noAccess: true,
  });
  if (res) {
    return res;
  }
  return false;
}

export async function getUserInfo() {
  const res = await request(`/user/info`, {
    method: "GET",
  });
  if (res) {
    return res;
  }
  return false;
}

export async function editUser(user: any) {
  const res = await request(`/user/edit`, {
    method: "POST",
    params: user,
  });
  if (res) {
    return res;
  }
  return false;
}

