/* TODO: break this file into smaller segments */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

import axios from "axios";


const firebaseConfig = {
  apiKey: "AIzaSyCU3XcDrZKAvF7CgkGc4gpul_Crzen5BqE",
  authDomain: "memsave-c0d28.firebaseapp.com",
  projectId: "memsave-c0d28",
  storageBucket: "memsave-c0d28.appspot.com",
  messagingSenderId: "830067013642",
  appId: "1:830067013642:web:d2c5a0e6a4d32bfcf987f3",
  measurementId: "G-ZD4M3DR1PR",
};
// Initialize Firebasez
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerEmail=new firebase.auth.EmailAuthProvider();

export const auth = firebase.auth();
export const signInWithGoogle = async () =>await auth.signInWithPopup(providerGoogle);
export const makeCredential=(email,password)=>{
  return firebase.auth.EmailAuthProvider.credential(email,password)
}

export const createUserProfileDocument = async (user, userInfo) => {
  //userinfo -- name and phone
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      const isSetup=auth.currentUser.providerData[0].providerId===providerGoogle.providerId? true:false
      await userRef.set({
        createdAt,
        name: displayName,
        email,
        photoURL,
        setup:isSetup,
        ...userInfo,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    return { uid, ...userDoc.data() };
  } catch (error) {
    console.log(error.message);
  }
};

//DIARY
export const retrieveDiaryNames = async (userName) => {
  console.log("retrieveDiaryNames function");
  const list = [];
  const dataSnapshot = await db
    .collection("users")
    .doc(userName)
    .collection("diaries")
    .get();
  dataSnapshot.forEach((doc) => {
    list.push(doc.id);
    // console.log(doc.id + "=>" + doc.data());
  });
  return list;
};


export const isDiaryNameUnique = async (diaryName, userName) => {
  console.log("isDiaryNameUnique function");
  const list = await retrieveDiaryNames(userName);
  if (!list.includes(diaryName)) return true;
  else return false;
};


export const makeDiary = async (diaryName, userName) => {
  console.log("makeDiary function");
  console.log(diaryName)
  var isUnique=await isDiaryNameUnique(diaryName,userName)
  if(!isUnique)
  {
    diaryName=diaryName+"1"
  }
  await db
    .collection("users")
    .doc(userName)
    .collection("diaries")
    .doc(diaryName)
    .set({ data: [] });
  return diaryName
};

//USED
export const addMessageToDiary = async (userName, diaryName, userInput) => {
  const docRef = db.doc(`users/${userName}/diaries/${diaryName}`);
  const doc = await docRef.get();
  const data = doc.data().data;
  // console.log(data);
  data.push({ time: Date.now(), data: userInput });
  await docRef.set({ data }, { merge: true });
  return data

  //add message to the diary's array
};

//USED
export const reviewDiary = async (userName, diaryName) => {
  // will give the content arrays
  const docRef = db.doc(`users/${userName}/diaries/${diaryName}`);
  const doc = await docRef.get();
  const data = doc.data().data;
  return data;
};


export const uploadAttachment = async (userName, result) => {
  console.log("uploadAttachment function");

  const name = result[0].name;
  const contentType = result[0].contentType;
  const contentUrl = result[0].contentUrl;

  const ref = storageRef.child(`users/${userName}/attachments/${name}`);

  const response = await axios.get(contentUrl, { responseType: "arraybuffer" });
  // If user uploads JSON file, this prevents it from being written as "{"type":"Buffer","data":[123,13,10,32,32,34,108..."
  if (response.headers["content-type"] === "application/json") {
    response.data = JSON.parse(response.data, (key, value) => {
      return value && value.type === "Buffer" ? Buffer.from(value.data) : value;
    });
  }

  console.log(response.data);
  let bytes = new Uint8Array(response.data);
  console.log("works");

  // here we needs to send a loading message
  ref.put(bytes).then((snapshot) => {
    console.log("Uploaded a file!");
  });
  // var metadata = {
  //   name,
  //   contentType
  // };
  // ref.put(basic,'base64').then((snapshot) => {
  //   console.log('Uploaded a base64 string!');
  // });
};


export const retrieveAttachments = async (userName) => {
  console.log("retrieve Attachments function");
  const ref = storageRef.child(`users/${userName}/attachments`);
  var ans=[]
  await ref
    .listAll()
    .then(async (res) => {
      console.log("pushing paths into array");
      const result = [];
      await res.items.forEach((itemRef) => {
        // console.log(itemRef._delegate._location.path_)
        result.push(itemRef._delegate._location.path_);
      });
      return result;
    })
    .then(async (arr) => {
      console.log(arr)
      const result=[]
      console.log("pushing urls into array");

      const promises = arr.map(async (path) => {
        const names=path.split("/")
        const fileName=names[names.length-1]
        const fileNameParts=fileName.split(".")
        const fileType=fileNameParts[fileNameParts.length-1]
        console.log("check after split")
        console.log(names)
        await storageRef.child(path).getDownloadURL()
          .then(async (url) => {
            await result.push({url,fileName,fileType})
          });

      })

      const contents = await Promise.all(promises)

   
      return result
    }).then((result)=>{
      console.log("checking final data sent")
      console.log(result)
      ans=result
      return result
    });
    console.log("ans is ")
    console.log(ans)
    return ans
};


//USED
export const retrieveChatDump = async (userName) => {
  // just get array of chats
    // will give the content arrays
    console.log("retrieve Chat Dump")
    const docRef = db.doc(`users/${userName}/chatDump/chatDump`);
    const doc = await docRef.get();
    if(!doc.exists)
    {
      console.log("doc does not exist")
      await docRef.set({data:[]})
    }
    const data = doc.data().data;
   
    return data;

};

//USED
export const addMessageToChatDump=async(userName,userInput)=>{
  console.log("add message to chat dump function ")
  const docRef = db.doc(`users/${userName}/chatDump/chatDump`);
  const doc = await docRef.get();
  // if(!doc.exists)
  // {
  //   await docRef.set({ data: [] });
  // }
  const data = doc.data().data;
  // console.log(data);
  data.push({ time: Date.now(), data: userInput });
  await docRef.set({ data }, { merge: true });
  return data
}


