"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Listen for updates to any `boatUsage` document.
exports.calculateDuration = functions.firestore
    .document('boatUsage/{id}')
    .onWrite((change, context) => {
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const data = change.after.exists ? change.after.data() : null;
    if (!data) {
        console.log("Document Deleted");
        return null; // If was deletion we can stop
    }
    // Get an object with the previous document value (for update)
    const oldDocument = change.before.data();
    // We'll only update if the start or end time has changed
    // This is crucial to prevent infinite loops.
    if (oldDocument && (data.startTime === oldDocument.startTime || data.endTime === oldDocument.endTime)) {
        console.log("Document was updated but times did not change");
        return null;
    }
    //Calculate duration
    const duration = (data.endTime.toDate() - data.startTime.toDate()) / (3600000);
    console.log("The duration is: ", duration);
    // Then return a promise of a set operation to update the count
    return change.after.ref.set({
        duration: duration
    }, { merge: true });
});
exports.createProfile = functions.auth.user()
    .onCreate((userRecord, context) => {
    admin.auth().getUser(userRecord.uid)
        .then(function (userData) {
        console.log("Successfully fetched user data:", userData.toJSON());
        return admin.database().ref(`/userProfile/${userData.uid}`).set({
            email: userData.email,
            name: userData.displayName,
            role: "user"
        });
    })
        .catch(function (error) {
        console.log("Error fetching user data:", error);
    });
});
exports.updateUserClaims = functions.database.ref('/userProfile/{uid}/role').onWrite((snapshot, context) => {
    const role = snapshot.after.val();
    console.log("Updating custom claims: ", role);
    if (role === 'admin') {
        return admin.auth().setCustomUserClaims(context.params.uid, { admin: true });
    }
    return admin.auth().setCustomUserClaims(context.params.uid, { admin: false });
});
//# sourceMappingURL=index.js.map