import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query;
  const { typePost } = req.query;
  const { paramsToURL } = req.query;
  const { body } = req;

  let baseURL = `${process.env.API_URL}${type}`;

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  let response;
  try {
    switch (method) {
      case "POST":
        baseURL += typePost ? typePost : `/new`;
        response = await axios.post(baseURL, body, options);
        break;
      case "PUT":
        response = await axios.put(baseURL, body, options);
        break;
      case "PATCH":
        response = await axios.patch(baseURL, body, options);
        break;
      case "DELETE":
        response = await axios.delete(baseURL, options);
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
