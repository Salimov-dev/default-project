import httpService from "@services/http.service";

const todoEndPoint = "/todos";

const todoService = {
  getAll: async () => {
    const { data } = await httpService.get(todoEndPoint);
    return data;
  }
};

export default todoService;
