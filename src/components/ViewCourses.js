import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const ViewCourses = () => {
  const [myCourses, setMyCourses] = useState([]);

  const getCourses = async () => {
    const courseeee = [];
    const q = query(collection(db, "courses"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      courseeee.push(doc.data());
      setMyCourses(courseeee);
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="courses-container">
      <h1 className="viewCourses-heading">View Courses</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {myCourses.map((course, index) => (
          <>
            <div className="course">
              <div className="new-course-container">
                <h1>{course.courseName}</h1>
                <h4>Duration: {course.courseDuration}</h4>
                <h6>{course.courseFaculty}</h6>
                <button>Enroll</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ViewCourses;
