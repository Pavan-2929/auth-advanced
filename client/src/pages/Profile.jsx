import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  userSignOut
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [FormData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userUpdateStart());
      const res = await fetch(
        `/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(userUpdateFailure(data));
        return;
      }
      dispatch(userUpdateSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(userUpdateFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(userDeleteStart());
      const res = await fetch(
        `/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(userDeleteFailure(data));
        return;
      }
      dispatch(userDeleteSuccess(data));
    } catch (error) {
      dispatch(userDeleteFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(userSignOut())
    } catch (error) {
      console.log(error);
    }
  }
  console.log(FormData);
  return (
    <div className="p-3 max-w-lg mx-auto bg-gray-200 mt-16 rounded-lg">
      <h1 className="text-3xl font-semibold text-center my-3">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileref}
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={FormData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileref.current.click()}
        />
        <p className="font-semibold text-center">
          {imageError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span>{`uploading: ${imagePercentage}%`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">Image uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Update"}
        </button>
      </form>
      <p className="text-red-700 font-semibold mt-5">
        {error && "Something went wrong"}
      </p>
      <p className="text-green-700 font-semibold mt-5">
        {updateSuccess && "User updated Successfully"}
      </p>
      <div className="flex justify-between mt-5 font-semibold text-[1.2rem]">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  );
}

export default Profile;
