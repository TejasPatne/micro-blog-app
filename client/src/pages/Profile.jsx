import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase";

export const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);

  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleFileUpload = (image) => {
    const storage = getStorage(app); 
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => setFormData({...formData, profilePicture: downloadURL})
        )
      }
    );
  }

  useEffect(() => {
    if(image){
      handleFileUpload(image);
    }
  }, [image]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 hover:border-2 border-neutral-300 transition-all" />
        <p className="text-sm self-center">
          {
            imageError ? 
            <span className="text-red-700">Error Uploading Image (file size must be less that 2 MB)</span> :
            (imagePercent > 0 && imagePercent < 100) ? 
            <span className="text-slate-700">{`Uploading ${imagePercent}%`}</span> :
            (imagePercent === 100) ?
            <span className="text-green-700">Image uploaded successfully</span> :
            ''
          }
        </p>
        <input defaultValue={currentUser.username} type="text" placeholder="Username" id="username" className="bg-neutral-100 rounded-lg p-3" />
        <input defaultValue={currentUser.email} type="email" placeholder="Email" id="email" className="bg-neutral-100 rounded-lg p-3" />
        <input type="password" placeholder="Password" id="password" className="bg-neutral-100 rounded-lg p-3" />
        <button className="bg-neutral-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}