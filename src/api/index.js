import axios from 'axios';

import {
    url,
    port
} from '../etc/config.json';

export default {
    createFile(data) {
        const request = axios.create({
            headers: {
                'Accept': 'application/json',
                "Cache-Control": "no-store, no-cache, must-revalidate"
            }
        });
        return request.post(`${url}:${port}/files`, data);
    },
}