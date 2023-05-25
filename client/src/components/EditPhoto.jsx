import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import DisplayNav from './NavBars/DisplayNav'

const EditPhoto = (props) => {

  const { droneDetails, setDroneDetails } = props;

  const { id } = useParams()

  const [photo, setPhoto] = useState({
    title: '',
    description: '',
    imageUploaded: null,
  })

  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get(`http://172.18.70.191:8000/api/${id}`)
      .then((res) => {

        setPhoto(res.data.photo)

      })
      .catch(err => console.log(err))
  }, [id])

  const changeHandler = (e) => {
    setPhoto({ ...photo, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    axios.put(`http://172.18.70.191:8000/api/${id}/edit`, photo)
      .then((res) => {
        console.log("Post data: ", res.data)
        setDroneDetails([...droneDetails, res.data])
        navigate('/')
      })
      .catch((err) => {
        console.log("Error posting photo: ", err)
        setErrors(err.response.data.errors)
      })
  }

  return (
    <>
    <DisplayNav />
    <div className="row">
      <div className="mx-auto col-10 col-md-8 col-lg-6 border mt-3">

        <h1 className="text-center"> Edit {photo.title}: </h1>

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
              {errors.title ?
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
              {errors.description ?
                // <p className="text-danger"> {errors.description.message} </p>
                console.log(errors.description.message)
                : null}
            </div>

            <div className="img-prev" style={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src={`http://172.18.70.191:8000/${photo.imageUploaded}`}
                style={{ width: "200px", height: "140px", margin: "1rem auto" }}
              />
            </div>

            <br />
            {/* Was getting error "value" type on input should not be null */}
            {/* <input type="hidden" name="user_id" value={photo.user_id} /> */}
            <input className="btn btn-primary" type="submit" />

          </div>
        </form>

      </div>
    </div>
    </>
  );
  
}

export default EditPhoto