import { useContext, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { storage } from "../../firebase";
const UserContext = createContext();
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userImageUrl, setUserImageUrl] = useState();

  const { currentUser } = useAuth();
  const ref = currentUser.email;
  const getUserImageUrl = () => {
    storage
      .ref(`${currentUser.email}`)
      .child(`${currentUser.email}`)
      .getDownloadURL()
      .then((url) => setUserImageUrl(url))
      .catch(() => {
        console.log("Error getting the image. Using default-image instead");
        storage
          .ref("default")
          .child("defaultProfilePic.svg")
          .getDownloadURL()
          .then((url) => setUserImageUrl(url));
      });
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Uploading pic...");
    storage
      .ref(`${ref}`)
      .child(`${ref}`)
      .getDownloadURL()
      .then(() => storage.ref(`${ref}`).child(`${ref}`).delete())
      .then(() => storage.ref(`${ref}`).child(`${ref}`).put(file))
      .then(() => getUserImageUrl())
      .then(console.log("Profile picture updated"))
      .catch(async () => {
        await storage.ref(`${ref}`).child(`${ref}`).put(file);
        console.log("No previous image detected. Path created");
        await getUserImageUrl();
      });
  };
  const values = { handleFileChange, getUserImageUrl, userImageUrl };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
