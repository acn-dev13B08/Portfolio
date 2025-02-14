import React from 'react';
import { SocialData } from '../data/social';
import './social-contact.css'
function SocialContact() {
    const data = SocialData;
    console.log("social Data:   ", data);
    return (
        <div className="social-contact">
            {data.map((item) => {
                return (
                    <a href={item.link}>
                        <div className="social-icon-div">
                            <img src={item.icon} className="social-icon"/>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}
 
export default SocialContact
