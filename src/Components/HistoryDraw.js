import React, { useState,useEffect} from "react";
import axios from 'axios';
import { connect } from "react-redux";
import {getDraw, deleteDrawFromHistory} from "../redux/action"
const HistoryDraw = (props) => {
  useEffect(()=>{
    props.getDraw()
  },[])
const {drawHistory,field, pixelSize, fieldSize, setDrawHistory, getFieldFromHistory,getDrawFromServer,deleteFromHistory} = props;
const [historyInp, setHistoryInp] = useState("");


const addToDrawHistory = () => {
  if (historyInp.trim() !== "") {


    let newDraw =  {name: historyInp, 
      field, 
      pixelSize,
      fieldSize,
      username:"Roman"
    }
    axios.post('https://draw-pixel-server.herokuapp.com/draw', newDraw)
    .then(function (res) {
      if (res.status === 200){
        props.getDraw()
      }
      })
      .catch((error)=>console.log(error))
}


    setHistoryInp("");

};

const deleteDraw = (id)=>{
  axios.delete(`https://draw-pixel-server.herokuapp.com/draw/${id}`)
          .then((res) =>{
          if (res.status === 200){
            props.getDraw()
          }
          })
          .catch((error)=>console.log(error))
}


  return <div className="drawHistory mg-10">

<input
    value={historyInp}
    maxlength="15"
    size="17"
    onChange={(e) => setHistoryInp(e.target.value)}
  />
  <button onClick={addToDrawHistory}>Save</button>
  <button onClick={getDraw}>GET draw</button>
 

        <ul className="list-ul">
    {drawHistory.map((item,i)=> 
    
    <li className="list-li">
      <div className= "item_wrap"> 
      <div className="child-grow" onClick={() => getFieldFromHistory(i)}>{item.name}</div> 
      
      <div><button className="btn" onClick={()=>deleteDraw(item._id)}>X</button></div>
      
      </div>
      
      </li>)}
    </ul>
    
</div>
  
    }

const mapStateToProps = (state) => ({
  drawHistory: state.drawHistory,
  field: state.field, 
  pixelSize: state.pixelSize,
  fieldSize: state.fieldSize,
});

const mapDispatchToProps = (dispatch) => ({
 
    getFieldFromHistory: (index) =>
    dispatch({
      type: "GET_FIELD_FROM_HISTORY",
      payload: {index},

    }),
  
  getDraw:()=>dispatch(getDraw()),
  //deleteDrawFromHistory:(id)=>dispatch(deleteDrawFromHistory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDraw);
