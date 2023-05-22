/* eslint-disable import/prefer-default-export */
import { httpGet, httpPut } from "../../../../components/Lib/RestTemplate";

export const getPreset = (
    authorization: any
) => {
    return httpGet(`/preset`, {
        headers: {
            Authorization: authorization.access_token,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.resolve([]);
        })
        .catch((error) => {
            return Promise.resolve([]);
        });
};

export const savePreset = (
    payload: any,
    authorization: any
) => {
    return httpPut(`/preset`, payload, {
        headers: {
            Authorization: authorization.access_token,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.resolve([]);
        })
        .catch((error) => {
            return Promise.resolve([]);
        });
};
