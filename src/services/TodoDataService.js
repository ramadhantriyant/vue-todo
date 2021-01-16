import http from "../http-common";

class TodoDataService {
  getAll() {
    return http.get("/");
  }
  create(data) {
    return http.post("/", data);
  }
  update(data) {
    return http.put('/', data);
  }
  delete(data) {
    return http.delete('/', {data: data});
  }
}

export default new TodoDataService();