import { handleResponse, handleError } from "./apiUtils";
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_API_URL + "/chores/";

export function getChores() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveChore(chore) {
  return fetch(baseUrl + (chore.id || ""), {
    method: chore.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(chore),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteChore(choreId) {
  return fetch(baseUrl + choreId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
