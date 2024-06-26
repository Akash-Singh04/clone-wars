'use client'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firbase';
import './rightSidebar.css';
const RightSidebar = () => {
  const [usersInfoList, setUsersInfoList] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details from Firebase
        const userRef = collection(db, 'users');
        const docSnap = await getDocs(userRef);
        // const userDoc = await db.collection('users').doc(userid).get();
        if (docSnap) {
          docSnap.forEach((doc) => {
            setUsersInfoList(prevList => [...prevList, doc.data()]);
          })

          // setUsersInfo(docSnap.data());
        } else {
          //   console.log("User not found", error);
        }
      } catch (error) {
        console.log("Error", error)
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      <div className="right-side-bar">

        <input type="text" placeholder="Search" class="outline-none w-full my-2 border border-white bg-black rounded br-4 p-2 text-black::placeholder" />

        <div className="user-card">

          <div className="heading mb-8  ">You might like</div>
          <div className="flex flex-col gap-4">
            {usersInfoList.length !== 0 && usersInfoList.map((user, index) => (
              <div key={index} className="profile-card gap-2">
                <img src={user.profileImage} alt="profile" />
                <div className="info">
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-username">{user.username}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="bg-black-200 p-4 my-4">
          <div class="flex justify-center">
            <div class="grid grid-cols-3 gap-4">
              <a href="#" class="text-gray-600 text-sm  hover:border-white-500">Terms of service</a>
              <a href="#" class="text-gray-600 text-sm">Privacy Policy</a>
              <a href="#" class="text-gray-600 text-sm">Cookie Policy</a>
              <a href="#" class="text-gray-600 text-sm">Accessibility</a>
              <a href="#" class="text-gray-600 text-sm">
                © 2024 X Corp.</a>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSidebar