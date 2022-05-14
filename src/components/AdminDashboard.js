import React, { useState } from "react";
import { GoGraph } from "react-icons/go";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlinePersonAddAlt, MdOutlineSchool } from "react-icons/md";
import { BsKey } from "react-icons/bs";
import { Button, Modal } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import swal from "sweetalert";

const AdminDashboard = () => {
  const [resetShow, setresetShow] = useState(false);
  const [adminShow, setadminShow] = useState(false);
  const [courseShow, setcourseShow] = useState(false);
  const [courseshow, setcourseshow] = useState(false);

  const [resetemail, setResetemail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [newPasswordd, setNewPassword] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseFaculty, setCourseFaculty] = useState("");

  const [adminEmail, setadminEmail] = useState("");
  const [adminPassword, setadminPassword] = useState("");

  const resethandleClose = () => setresetShow(false);
  const resethandleShow = () => setresetShow(true);

  const adminhandleClose = () => setadminShow(false);
  const adminhandleShow = () => setadminShow(true);

  const coursehandleClose = () => setcourseShow(false);
  const coursehandleShow = () => setcourseShow(true);

  const resetPasswordHandler = () => {
    console.log("resetPassword");
    swal({
      title: "Fields are empty",
      text: "Please fill the all fields",
      icon: "warning",
      dangerMode: true,
    });

    signInWithEmailAndPassword(auth, resetemail, resetPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const newUser = auth.currentUser;
        const newPassword = newPasswordd;

        updatePassword(newUser, newPassword)
          .then(() => {
            // Update successful.
            swal({
              title: "Password changed successfully!",
              // text: "You clicked the button!",
              icon: "success",
              button: "Awesome!",
            });
          })
          .catch((error) => {
            // An error ocurred
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const addAnotherAdmin = () => {
    console.log("add another admin");
    swal({
      title: "Fields are empty",
      text: "Please fill the all fields",
      icon: "warning",
      dangerMode: true,
    });

    createUserWithEmailAndPassword(auth, adminEmail, adminPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        swal({
          title: "New Admin Registered successfully",
          // text: "You clicked the button!",
          icon: "success",
          button: "Awesome!",
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const addCourseHandler = async () => {
    if (!courseName || !courseDuration || !courseFaculty) {
      return swal({
        title: "Fields are empty",
        text: "Please fill the all fields",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      swal({
        title: "New course add successfully",
        // text: "You clicked the button!",
        icon: "success",
        button: "Awesome!",
      });
    }
    console.log("add new courses");

    try {
      const docRef = await addDoc(collection(db, "courses"), {
        courseName: courseName,
        courseDuration: courseDuration,
        courseFaculty: courseFaculty,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact_main">
    <h1 className="admin-dashboard-heading admin-container">Admin Dashboard</h1>
      <div className="contact">
        <div className="contact_info_item">
          <BsKey style={{ fontSize: "37px ", color: "white" }} />
          <div className="contact_info_content" onClick={resethandleShow}>
            <div className="contact_heading">Reset Password</div>
          </div>
        </div>
        <div className="contact_info_item">
          <MdOutlinePersonAddAlt
            style={{ fontSize: "35px ", color: "white" }}
          />
          <div className="contact_info_content" onClick={adminhandleShow}>
            <div className="contact_heading">Add Another Admin</div>
          </div>
        </div>
        <div className="contact_info_item">
          <FaRegAddressCard style={{ fontSize: "35px ", color: "white" }} />
          <div className="contact_info_content">
            <div className="contact_heading">Add User</div>
          </div>
        </div>
        <div className="contact_info_item">
          <MdOutlineSchool style={{ fontSize: "35px ", color: "white" }} />
          <div className="contact_info_content">
            <div className="contact_heading">Student Status</div>
          </div>
        </div>
        <div className="contact_info_item">
          <GoGraph style={{ fontSize: "35px ", color: "white" }} />
          <div className="contact_info_content" onClick={coursehandleShow}>
            <div className="contact_heading">Course Status</div>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <Modal show={resetShow} onHide={resethandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-inputs">
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            id="email"
            autoComplete="off"
            value={resetemail}
            onChange={(e) => setResetemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            id="currentPassword"
            autoComplete="off"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            name="email"
            id="email"
            autoComplete="off"
            value={newPasswordd}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resethandleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={resetPasswordHandler}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Another Admin Modal */}
      <Modal show={adminShow} onHide={adminhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Another Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-inputs">
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            id="email"
            autoComplete="off"
            value={adminEmail}
            onChange={(e) => setadminEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="currentPassword"
            id="currentPassword"
            autoComplete="off"
            value={adminPassword}
            onChange={(e) => setadminPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={adminhandleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addAnotherAdmin}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Course Modal */}
      <Modal show={courseShow} onHide={coursehandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-inputs">
          <input
            type="email"
            placeholder="Course Name"
            name="email"
            id="email"
            autoComplete="off"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Current Duration"
            name="Course Duration"
            id="currentPassword"
            autoComplete="off"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Faculty"
            name="email"
            id="email"
            autoComplete="off"
            value={courseFaculty}
            onChange={(e) => setCourseFaculty(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={coursehandleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addCourseHandler}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
