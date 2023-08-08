import './Bg.css';

import { useState, useRef } from "react";
import axios from 'axios';

import logo from './assets/logo.png'
import banner from './assets/banner.png'

import Original from './Original'

import No_bg from './No_bg'

import Eula from './Eula'

function Bg() {

  const inputElement = useRef();

  const [display_no_bg_tab, setdisplay_no_bg_tab] = useState("no");


  const [show_eula, setshow_eula] = useState(false);


  function change_tab(e) {

    if(e.target.classList.value == 'no_bg') {
        setdisplay_no_bg_tab('no');
    } else {
        setdisplay_no_bg_tab('yes');
    }
   
  }

  function upload_file() {
      inputElement.current.click();
  }

  function open_eula() {
    setshow_eula(true);
  }

  function close_popup_fun() {
    setshow_eula(false);
  }

  function send_file_to_back(e) {

    let data = e.target.files[0];
    
    debugger;

    if(data.type=='image/png' || data.type=='image/jpg' || data.type=='image/jpeg') {
      debugger;
        const formData = new FormData();
        
      const config = {     
          headers: { 'content-type': 'multipart/form-data' }
      }

      
        formData.append(
            "myFile",
            data,
            data.name
        );

      axios.post(`http://localhost:5000/upload_file`, formData, config)
        .then(res => {
            console.log(res);
      })

    } else{
        alert('file type not suported');
    }
  


    
  }

  return (
  <div className="Bg">
     <div className="header">
        <span className='header_text'> העלאת תמונה כדי להסיר את הרקע </span>
        <button className="header_btn"  onClick={upload_file} > העלאת תמונה</button>

        <input type="file" ref={inputElement} onChange={send_file_to_back} className="input_file"/>

        <span className="header_subtext"> פורמטים נתמכים png, jpeg</span>

     </div>

    <div className="main_div">

      <div className="left_div"> 

          <div className='main_div_tabs_header' >
              <span onClick={change_tab} className='no_bg' style={{ borderBottom: display_no_bg_tab=="yes" ? "" : "3px solid #9C27B0" }}> הסר רקע</span>
              <span onClick={change_tab} className='original' style={{ borderBottom: display_no_bg_tab=="yes" ? "3px solid #9C27B0" : "" }}> מקורי </span>
          </div>

          {display_no_bg_tab=="yes" ?  
             <Original/>
          :
             <No_bg/>
          }
      
          <div className='left_div_footer'>
              <button className="eula_btn"  onClick={open_eula} >תקנון החברה</button>
              <span className="eula_text"> על ידי העלאת תמונה אתה מסכים לתנאים וההגבלות </span>
              {show_eula ? <Eula  irena="irena" close_popup={close_popup_fun} /> : '' }
              
          </div>

      </div>

      <div className="right_div">
        <div className="right_div_middle_div">

          <div className="right_div_top">
              <div className="right_div_top_text"> תמונה חינם </div>
              <div className="right_div_top_subtext">  612x408 תצוגה מקדימה של תמונה </div>
              <button className="right_div_top_btn"> הורד </button>
              <div className="right_div_top_sub_sub_text"> איכות טובה עד 0.25 מגה פיקסל </div>
          </div>

          <div className="right_div_bottom">
              <div className="right_div_bottom_text">Pro</div>
              <div className="right_div_bottom_subtext">  תמונה מלאה 1280x1920
              </div>
              <button className="right_div_top_btn">HD הורד </button>
              <div className="right_div_top_sub_sub_text"> האיכות הטובה ביותר עד 25 מגה פיקסל</div>

          </div>

        </div>
      </div>

    </div>

    <div className='footer'>
      
          <img src={logo} className="logo_img" />

          <img src={banner}  className="banner_img"/>

    </div>

    </div>


  );
}

export default Bg;
