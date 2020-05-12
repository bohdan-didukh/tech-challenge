import * as firebase from "firebase/app";
import "firebase/functions";

export const getTotal = () => firebase.functions().httpsCallable("getTotal")();
