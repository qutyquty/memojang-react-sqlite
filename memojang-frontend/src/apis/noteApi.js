import apiClient from "./apiClient";

export const createNote = async (note) => {
  const response = await apiClient.post("/notes", note);
  return response.data;
};

export const getNotesByMonth = async (year, month) => {
  try {
    const response = await apiClient.get("/notes", {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    console.error("getNotes 에러: ", error);
    throw error;
  }
};

// export const getNotes = async () => {
//   const response = await apiClient.get("/notes");
//   return response.data;
// };

export const getNoteById = async (id) => {
  const response = await apiClient.get(`/notes/${id}`);
  return response.data;
};

export const updateNote = async (id, note) => {
  const response = await apiClient.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  try {
    await apiClient.delete(`/notes/${id}`);
  } catch (error) {
    console.error("deleteNote 에러: ", error);
    throw error;
  }
};

// 완료 여부 업데이트
export const updateCompleted = async (id, completed) => {
  try {
    const response = await apiClient.patch(`/notes/${id}/completed`, null, {
      params: { completed },
    });
    return response.data;
  } catch (error) {
    console.error("updateCompleted 에러: ", error);
    throw error;
  }
};
