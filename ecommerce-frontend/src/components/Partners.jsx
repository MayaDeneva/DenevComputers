import React from "react";
import gss from '../assets/gss.png'
import also from '../assets/also.png'

const Partners = ({partner}) => {

    const partners = [
        {
            image: "https://denevcomputers.weebly.com/uploads/1/3/5/7/135746533/b-4bbafbb44a3a690ed8ab41aafb5974ad_orig.png",
            title: "PCLIFE",
            url: "https://www.pclife.bg/",
        },
        {
            image: "https://denevcomputers.weebly.com/uploads/1/3/5/7/135746533/1204251148_orig.png",
            title: "Ardes",
            url: "https://ardes.bg/"
        },
        {
            image: "https://www.amd.com/content/dam/amd/en/images/logos/partners/559424-vali-logo.png",
            title: "Vali Computers",
            url: "https://vali.bg",
        },
        {
            image: gss,
            title: "Global System Solutions",
            url: "https://gss.bg"
        },
        {
            image: also,
            title: "Also",
            url: "https://www.also.com/ec/cms5/bg_5870/5870/index.jsp"
        },
        {
            image: "https://vami.bg/wp-content/uploads/2024/09/logo.svg",
            title: "Vami",
            url: "https://vami.bg"
        }
    ];
    return (
        <div className="carousel rounded-box flex flex-wrap gap-6 m-8 justify-center">
            {
                partners.map((partner, index) => {
                    return (
                        <div className="carousel-item h-20" key={index}>
                            <a 
                                href={partner.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block h-full"
                            >
                                <img 
                                    src={partner.image} 
                                    alt={partner.title} 
                                    className="h-full object-contain"
                                />
                            </a>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Partners;