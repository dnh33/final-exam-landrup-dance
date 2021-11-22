import axios from "axios";

export function signupForClass(classId, userId, token) {
  return axios.post(
    `http://localhost:4000/api/v1/users/${userId}/activities/${classId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function signoutClass(classId, userId, token) {
  return axios.delete(
    `http://localhost:4000/api/v1/users/${userId}/activities/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
