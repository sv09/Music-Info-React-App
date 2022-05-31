import React from "react";

const TrackInfo = ({artists, images, name}) => {
    return (
        <div>
            <img
                src = {images[1].url} id="img"
             >
            </img>
            <div> 
                <label htmlFor="artist" id="artist">
                    Artist: {artists[0].name}
                </label> 
            </div>
            <div> 
                <label htmlFor="album" id="album">
                    Album: {name}
                </label> 
            </div>
        </div>
    );
}

export default TrackInfo;