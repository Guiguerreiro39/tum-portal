import axios from "axios";

export function createEvent(eventName,eventDate,eventLocation,eventDescription) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: `${process.env.VUE_APP_API}/event/`,
            data: {
                eventName: eventName,
                eventDate: eventDate,
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