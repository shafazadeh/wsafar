
import React, { useState, useEffect } from "react";
import MainContainer from "containers/MainContainer";
import Axios from "axios";
import { navigate } from "hookrouter";
import Table from "components/DataTabel/DataTable";
import {dataUser} from "../constants/dataUser";

const Dashboard = (props: any) => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<dataUser[]>([]);
  const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const [totalCount, settotalCount] = useState(0);

  
  useEffect(() => {
    
    fetchUsers(1);
    
  },[])



  const fetchUsers = async (page:any) => {
		setLoading(true);
    Axios.get(`https://front-api-test.wsafar.com/posts?page=${page}&per-page=${perPage}&access-token=${localStorage.getItem("LOGINTOKEN")}`).then((res:any)=>{
      setLoading(false)
      console.log(res)
      if(res && res.data && res.data.result && res.data.result.items){
        setData(res.data.result.items)
        setTotalRows(res.data.result._meta.perPage);
        settotalCount(res.data.result._meta.totalCount)
        setLoading(false);
      }
    });
		
	
	};

	const handlePageChange = (page:any) => {

		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage:any, page:any) => {
		setLoading(true);
     
    Axios.get(`https://front-api-test.wsafar.com/posts?page=${page}&per-page=${newPerPage}&access-token=${localStorage.getItem("LOGINTOKEN")}`).then((res:any)=>{
      setLoading(false)
      console.log(res)
      if(res && res.data && res.data.result && res.data.result.items){
        setData(res.data.result.items)
        setTotalRows(newPerPage);
      }
    });

	};
  const advaneSearch=(filed:string,searchText:string)=>{
    setLoading(true);
    if(filed == "all"){
      fetchUsers(1)
    }else
    Axios.get(`http://front-api-test.wsafar.com/posts?filter[${filed}]=${searchText}&access-token=${localStorage.getItem("LOGINTOKEN")}`).then((res:any)=>{
      setLoading(false)
      console.log(res)
      if(res && res.data && res.data.result && res.data.result.items){
        setData(res.data.result.items)
        // setTotalRows(newPerPage);
        setLoading(false);
      }
    });
  }

  const logOut=()=>{
    let config = {
      headers: {
        token: localStorage.getItem("LOGINTOKEN"),
      
      }
    }
    Axios.delete(`http://front-api-test.wsafar.com/users/logout`,config).then((res:any)=>{
      setLoading(false)
      console.log(res)
      if(res ){
        MainContainer.setIsLogin(false);
        localStorage.setItem("LOGINTOKEN","")
        navigate('/login',true)
      }
    });
   
  }

  return (
    <div className="dashboard">
      <div className="header-dashboard">
        <p onClick={()=>logOut()}>خروج</p>
      </div>
      <div className="mainContent">
      <Table totalCount={totalCount} advaneSearch={(f:string,s:string)=>advaneSearch(f,s)} handlePerRowsChange={(n:any,p:any)=>handlePerRowsChange(n,p)} data={data} handlePageChange={(e:any)=>handlePageChange(e)} />
      </div>
    </div>
  );
};

export default Dashboard;
