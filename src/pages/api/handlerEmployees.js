import axios from "axios";
import QueryString from "qs";

export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query;
  const { paramsToURL } = req.query;

  let baseURL = `${process.env.API_URL}${type}`;

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    options.body = JSON.stringify(req.body);
  }
  let response;
  try {
    switch (method) {
      case "POST":
        baseURL += `/new`;
        response = await axios.post(baseURL, body, options);
        break;
      case "PUT":
        break;
      case "PATCH":
        break;
      case "DELETE":
        break;
      case "GET":
        response = await axios.get(baseURL + "?" + paramsToURL, options);
        break;
      default:
        break;
    }
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ error });
  }
}
