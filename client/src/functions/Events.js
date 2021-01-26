import axios from "axios";

export function createEvent(eventName,eventLocation,eventDescription) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: `${process.env.VUE_APP_API}/event/`,
            data: {
                eventName: eventName,
                eventLocation: eventLocation,
                eventDescription: eventDescription,
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