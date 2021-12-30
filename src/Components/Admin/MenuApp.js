import React from "react";
import Cookie from "js-cookie"
import MenuAdmin from "./MenuAdmin";
import Menu from "../User/Menu";

function MenuApp (){
     if(Cookie.get("level") ==="admin"){
         return <MenuAdmin />
     }
     else{
         return <Menu/>
     }
}
export default MenuApp;