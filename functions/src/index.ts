import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();


// Listen for updates to any `boatUsage` document.
exports.calculateDuration = functions.firestore
  .document('boatUsage/{id}')
  .onWrite((change, context) => {
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const data = change.after.exists ? change.after.data() : null;
    if (!data) return null; // If was deletion we can stop

    // Get an object with the previous document value (for update)
    const oldDocument = change.before.data();

    // We'll only update if the start or end time has changed
    // This is crucial to prevent infinite loops.
    if (oldDocument && (data.startTime === oldDocument.startTime || data.endTime === oldDocument.endTime)) return null;


    // Then return a promise of a set operation to update the count
    return change.after.ref.set({
      duration: (data.endTime - data.startTime) / (3600000)
    }, { merge: true });
  });

exports.createProfile = functions.auth.user()
  .onCreate((userRecord, context) => {
    return admin.database().ref(`/userProfile/${userRecord.uid}`).set({
      email: userRecord.email,
      name: userRecord.displayName,
      role: "user"
    });
  });