import React from "react";

const List = (props) => {
    const trackSelected = e => {
        e.preventDefault();
        props.listClicked(e.target.value);
    }
    return (
        <div className="list">
            { props.data.map((item, idx) => 
                <button key={idx} 
                        value={item.track.id} 
                        onClick={trackSelected}
                        className="list-button">
                    {item.track.name}
                </button> )
            }
        </div>
    );
}

export default List;