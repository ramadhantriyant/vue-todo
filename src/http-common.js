import axios from "axios"

export default axios.create({
  baseURL: "https://z0dl5q9pr7.execute-api.ap-southeast-1.amazonaws.com/prd",
  headers: {
    "Content-type": "application/json"
  }
})