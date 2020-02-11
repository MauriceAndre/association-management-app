import http from "./httpService";

const apiEndpoint = "/drivers-logs";

export async function save(driversLog) {
  if (driversLog._id) {
    const body = { ...driversLog };
    delete body._id;
    return await http.put(`${apiEndpoint}/${driversLog._id}`, body);
  }
  await http.post(apiEndpoint, driversLog);
}

export async function getAll() {
  return await http.get(apiEndpoint);
}

export default {
  saveDriversLog: save
};
