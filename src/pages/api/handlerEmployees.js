import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const { body } = req;
  let baseURL = `${process.env.API_URL}employees`;

  const options = {
    method: method,
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
        response = await axios.get(baseURL, options);
        break;
      default:
        break;
    }
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(error.response.status)
      .json({ error: error.response.data.err });
  }
}
