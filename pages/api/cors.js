import { BASE_QUERY_URL } from "../../lib/reddit";
import initMiddleware from "../../lib/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

const settings = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer my_authorization',
    },

}

export default async function handler(req, res) {

    settings.headers.Authorization = req.headers.authorization;
    const remoteServerUrl = `${BASE_QUERY_URL}api/vote?dir=${req.query.dir}&id=t3_${req.query.id}&rank=2`;

    await cors(req, res)
    const response = await fetch(remoteServerUrl, settings).then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    });
}