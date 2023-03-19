import { useState, useEffect, useContext} from 'react';
import { getUserByUserId } from "../../services/firebase";
import { AuthContext } from "../context/AuthContext";


export default function useUser() {

    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {

        let mounted = true

        async function getUserObjByUserId() {

          const [response] = await getUserByUserId(user.uid)  
          setActiveUser(response)  

        }

        if(user?.uid && mounted === true) {
          getUserObjByUserId();
        }

        return () => mounted = false
        
    }, [user]);

    return { user: activeUser }

}
