import React from 'react';
import Cookie from 'js-cookie'
import MenuAdmin from '../../Admin/MenuAdmin'
import Seller from '../Page/Seller'
import Category from '../Categoty'
export default class RouteMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trangthai: Cookie.get("level")
        }
    }
    displayCheck = () => {
        if(this.state.trangthai==='buyer'){
            return <div><Category /></div>
            
        }else if(this.state.trangthai==='admin'){
            return <MenuAdmin />
        }else {
            return <div><Seller /></div>
        }
       
    }
    render(){
        return(
            <div>    
                <this.displayCheck></this.displayCheck>
            </div>
        )
    }
}