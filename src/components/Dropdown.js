import React from "react";

const Dropdown = (props) => {
    const DropdownSelected = (e) => {
        props.changed(e.target.value)
    }
    return (
       <div className="dropdown">
           <select 
                value={props.selectedVal} 
                onChange={DropdownSelected} 
                className="dropdown-select">
               { props.data.map((val, idx) => 
                    <option 
                        key={idx} 
                        value={val.id}>
                        {val.name}
                    </option> )
               }
           </select>
       </div>
   );
}
export default Dropdown;