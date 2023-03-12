import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../src/config/firebase";


export async function getUserByUserId(userId) {

    const result = query(collection(db, "users"), where("userId", "==", `${userId}`));

    const querySnapshot = await getDocs(result);
    /*
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
    */
    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return user

}