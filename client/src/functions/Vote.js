import axios from "axios";

export function getVote(id) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${process.env.VUE_APP_API}/vote/${id}`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.error) {
                    reject(res.data.error);
                }

                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

export function getAllVotes(page) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${process.env.VUE_APP_API}/vote?page=${page}`,
            withCredentials: true,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

export function createVote(question, options, date) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: `${process.env.VUE_APP_API}/vote`,
            data: {
                question,
                date,
                options: options.map((o) => {
                    return {
                        text: o,
                    };
                }),
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

export function updateVote(id, vote) {
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: `${process.env.VUE_APP_API}/vote/${id}`,
            data: {
                vote,
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
