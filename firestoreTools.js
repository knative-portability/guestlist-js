const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    // replace with your projectId and path to json key
    projectId: 'gabrielmukobi-intern-2019',
    keyFilename: './keys/gServiceAccountKey.json'
})

module.exports = {
    addGuestToList: function (guestName) {
        db.collection('allGuestsList').add({
                name: guestName
            })
            .then(function (docRef) {
                console.log("Firestore document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    },

    getAllGuests: function (callback) {
        /* returns all guests as an array */
        guestList = []
        db.collection('allGuestsList').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    //console.log(doc.data())
                    guestList.push(doc.data().name);
                });
                guestList = guestList.length === 0 ? ["No guests found"] : guestList
                // console.log("Guestlist:")
                // console.log(guestList)
                callback(guestList)
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
    }
}