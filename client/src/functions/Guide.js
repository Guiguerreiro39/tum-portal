import axios from "axios";

export function createGuide(name, instrument, file) {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("video", file);
        formData.append("name", name);
        formData.append("instrument", instrument);

        axios({
            method: "post",
            url: `${process.env.VUE_APP_API}/guide`,
            data: formData,
            withCredentials: true,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.data);
            });
    });
}

export function getAllGuides(instrument, page) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${process.env.VUE_APP_API}/guide/${instrument}?page=${page}`,
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
