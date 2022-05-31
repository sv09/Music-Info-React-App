import React from "react";

const List = (props) => {
    const trackSelected = e => {
        e.preventDefault();
        props.listClicked(e.target.value);
    }
    return (
        <div>
            { props.data.map((item, idx) => 
                <button key={idx} 
                        value={item.track.id} 
                        onClick={trackSelected}>{item.track.name}
                </button> )
            }
        </div>
    );
}

export default List;