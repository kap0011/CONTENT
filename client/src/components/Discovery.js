import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Discovery({user}) {

  const [imgs, setImgs] = useState([]);
  const [showImg, setShowImg] = useState(false);
  const [showImgDetails, setShowImgDetails] = useState(null);

  const navigate = useNavigate();

  const getImgs = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getImgs`);
        setImgs(res.data.imgs)
    }catch(err){
        toast.error(err.response?.data.message || "Server Down!");
    }
  };

  const tagSearch = async (tag) => {
    navigate(`searchTag/${tag}`);
  };

  useEffect(()=>{
    getImgs();
  }, []);

  return (
    <>
      <ToastContainer/>
      { !showImg ?
        <div className="m-4 d-flex flex-wrap">
          {imgs.map((img, index)=>{
            return (
              <div key={index} className="p-4"><img src={img.url} alt={`img${index}`} onClick={()=>{setShowImg(true);setShowImgDetails(img)}}/></div>
            )})}
        </div>
      :
        <div className="container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header  bg-light">
                <h5 className="modal-title">{user.firstName} {user.lastName}</h5>
                <button type="button" className="btn-close" onClick={()=>{setShowImg(false);}}></button>
              </div>
              <div className="d-flex justify-content-center modal-body">
                <img src={showImgDetails.url} alt='Img' className="img-fluid"/>
              </div>
              <div className="modal-footer">
                {showImgDetails.tags.map((tag, index)=>{
                  return <p key={index} className="badge bg-light text-secondary" onClick={()=>tagSearch(tag)}>#{tag}</p>
                })}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Discovery;
