import React from "react";

const Dropdown = (props) => {
    const DropdownSelected = (e) => {
        props.changed(e.target.value)
    }
    return (
       <div>
           <select value={props.selectedVal} onChange={DropdownSelected}>
               { props.data.map((val, idx) => 
                 <option key={idx} value={val.id}>{val.name}</option>)
               }
           </select>
       </div>
   );
}
export default Dropdown;