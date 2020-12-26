module.exports = function userInformation(data) {
    return {
        id: data._id,
        username: data.username,
        fullName: data.fullName,
        profileImage: data.profileImage,
        voice: data.voice,
        instrument: data.instrument,
        contact: data.contact,
        email: data.email,
        residence: data.residence,
    };
};
