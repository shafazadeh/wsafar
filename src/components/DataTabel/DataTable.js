import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
// import {dataUser} from "../constants/dataUser";
import sr from "../../assests/img/searchRed.svg"
import sg from "../../assests/img/searchGreen.svg"

const Table = props => {
  const columns = [
    {
      name: "شناسه",
      selector: "id",
      sortable: true,
      grow: 2
    },
    {
      name: "عنوان",
      selector: "title",
      sortable: true
    },
    {
      name: "محتوا",
      selector: "content",
      sortable: true
    },
    {
      name: "وضعیت",
      selector: "status",
      sortable: true,
    },
    {
      name: "زمان ایجاد",
      selector: "created_at",
      sortable: false
    },
    {
      name: "زمان آپدیت",
      selector: "updated_at",
      sortable: false
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [field, setField] = React.useState("");

  
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const onChangePage=(e)=>{
    props.handlePageChange(e);
  }

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  
  let t=[];
  for(let i=0;i<columns.length;i++){
    t.push(<option value={columns[i].selector} selected={field == columns[i].selector} >{columns[i].name}</option>)
  }

  console.log(field,search)
  return (
    <>
    <div className="advanceSearch">
      
      <select className="selectedSearch" onChange={(e)=>setField(e.target.value)}>
        <option   >جستجو پیشرفته</option>
        {t}
        <option value={"all"} selected={field == "all"} >همه</option>
      </select>
      <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      <button className="searchBtn" disabled={!field || !search} onClick={()=>{props.advaneSearch(field,search)}}>
         <img src={!field || !search ? sr :sg} style={{color:"red"}} />
      </button>
    </div>
    
    <DataTable
      title="نمایش اطلاعات"
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      paginationServer
      onChangePage={onChangePage}
      paginationTotalRows={props.totalCount}
      paginationComponentOptions ={{rangeSeparatorText:""}}
      onChangeRowsPerPage={(n,p)=>props.handlePerRowsChange(n,p)}
    />
    </>
  );
};

export default Table;
