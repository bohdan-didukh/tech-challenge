import * as firebase from "@firebase/testing";
import * as fs from "fs";

const projectId = "tech-challenge-test-emulator";
const rules = fs.readFileSync("firestore.rules", "utf8");

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the Firestore.
 */
// @ts-ignore
export const authedApp = (auth?: object): firebase.firestore.Firestore =>
  firebase
    .initializeTestApp({
      projectId,
      auth,
    })
    .firestore();

/**
 * returns an initialized admin Firebase app.
 */
export function getAdmin() {
  return firebase.initializeAdminApp({ projectId }).firestore();
}

export const loadRules = () =>
  firebase.loadFirestoreRules({ projectId, rules }).catch(console.error);

/**
 * Clear the database
 */
export const clearData = () => firebase.clearFirestoreData({ projectId });
