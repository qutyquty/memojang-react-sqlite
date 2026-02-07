import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // 스프링부트 서버 주소
});

export default apiClient;