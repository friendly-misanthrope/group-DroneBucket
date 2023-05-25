import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayOne = () => {

  const { id } = useParams();
  const [photo, setPhoto] = useState([]);

  const [likes, setLikes] = useState(0);
  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get(`http://172.18.70.191:8000/api/${id}`)
      .then((res) => {
        setPhoto(res.data.photo);
      })
      .catch((err) => console.log(err));
  }, []);

  //deletes from the database when user buys the item
  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure you want to delete ${photo.title}? This action cannot be undone!`)){
      axios
      .delete(`http://172.18.70.191:8000/api/delete/${id}`)
      .then((res) => {
        console.log(res);
        const updatedPhoto = photo.filter((photos) => photos._id !== id);
        setPhoto(updatedPhoto);
      })
      .catch((err) => {
        console.log(err);
        navigate('/')
      });
    } 
    
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-evenly">
        <div className=" row">
          <img
            src={`http://172.18.70.191:8000/${photo.imageUploaded}`}
            style={{ width: "500px", height: "350px" }}
          />
          
        </div>
        <div>
          <h1> Title: {photo.title} </h1>
          <p> Description : {photo.description} </p>
          <Link
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              deleteHandler(photo._id);
            }}
            to={"/"}
          >
            Delete {photo.title}
          </Link>
          <br></br>
          <Link className="btn btn-warning"
          to={`/photo/${id}/edit`}>Edit Photo</Link>
          <br></br>
          <button
              className="btn btn-success"
              onClick={() => setLikes(likes + 1)}
            >
              {likes} Likes
            </button>
        </div>

        <div></div>
      </div>
      <br />
    </div>
  );
};

export default DisplayOne;
