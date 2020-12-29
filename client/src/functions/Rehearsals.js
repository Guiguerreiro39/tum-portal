import axios from "axios";

export function getRehearsal(date) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${process.env.VUE_APP_API}/rehearsal`,
            params: {
                date: date,
            },
            withCredentials: true,
        })
            .then(async (res) => {
                if (res.data.error && res.data.error === "NotAvailable") {
                    try {
                        resolve(await createRehearsal(date));
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    resolve(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

export function createRehearsal(date) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: `${process.env.VUE_APP_API}/rehearsal`,
            data: {
                date: date,
                users: [],
            },
            withCredentials: true,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function updateRehearsal(id, users) {
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: `${process.env.VUE_APP_API}/rehearsal/${id}`,
            data: {
                users: users,
            },
            withCredentials: true,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
