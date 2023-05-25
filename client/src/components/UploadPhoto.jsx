import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPhoto = (props) => {
  
  // grabbing the user 
  // const [user, setUser] = useState(null);
  // const [userPhotos, setUserPhotos] = useState([]);

  const { droneDetails, setDroneDetails } = props;
  const [photo, setPhoto] = useState({
    title: '',
    description: '',
    imageUploaded: null,
    likes: 0,
    user_id: ''
  });
  
  const navigate = useNavigate();
  
  //errors for images and form 
  const [imageError, setImageError] =useState(null)
  const [errors, setErrors] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (photo.imageUploaded === null) {
      setImageError("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("title", photo.title);
    formData.append("description", photo.description);
    formData.append("imageUploaded", photo.imageUploaded);
    formData.append("user_id", photo.user_id);

    axios
      .post("http://172.18.70.191:8000/api/newPhoto", formData)
      .then((res) => {
        console.log("Post data:", res.data);
        setDroneDetails([...droneDetails, res.data]);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error posting photo:", err);
        // Handle the error appropriately
        console.log(err.response.data.errors)
        setErrors(err.response.data.errors)
      });
  };

     
  


  const changeHandler = (e) => {
    setPhoto({ ...photo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setPhoto({ ...photo, imageUploaded: e.target.files[0] });
    setImageError(null); // reset image error when a photo is selected
  };


    

 
  

  return (
    <div className="row">
      <div className="mx-auto col-10 col-md-8 col-lg-6 border mt-3">

        <h1 className="text-center"> Post a new photo: </h1>

        <form onSubmit={onSubmitHandler} encType="multipart/form-data" className="p-2">
          <div>
          <div className="form-group">
              <label className="form-label"> Title: </label>
              <input
                className="form-control"
                type="text"
                name="title"
                defaultValue={photo.title}
                onChange={changeHandler}
              />
              { errors.title ? 
                <p className="text-danger"> {errors.title.message} </p>
                  : null
              
              }
            </div>

            <div className="form-group">
              <label className="form-label"> Description: </label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={photo.description}
                onChange={changeHandler}
              />
              { errors.description ? 
                // <p className="text-danger"> {errors.description.message} </p>
                console.log(errors.description.message)
               : null}
            </div>

            
            <div className="form-group">
                <label className="form-label">Image (limit 20MB):</label>
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  onChange={handleImageUpload}
                />
                {imageError && <p className="text-danger">{imageError}</p>}

              </div>
                <br /> 
           
            <input type="hidden" name="user_id" value={photo.user_id} />
            <input className="btn btn-primary" type="submit" />
          </div>
        </form>

      </div>
    </div>
  );
};

export default UploadPhoto;
