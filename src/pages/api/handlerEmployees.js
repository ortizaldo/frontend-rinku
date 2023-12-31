import axios from "axios";
/**
 * Asynchronous function that handles an API request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The response data.
 */
export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query;
  const { typePost } = req.query;
  const { _id } = req.query;
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
        baseURL += `/${_id}`;
        response = await axios.put(baseURL, body, options);
        break;
      case "DELETE":
        baseURL += `/${_id}`;
        response = await axios.delete(baseURL, options);
        break;
      case "GET":
        baseURL += `?${paramsToURL}`;
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
