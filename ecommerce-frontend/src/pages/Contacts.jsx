
//AIzaSyD1ZjxirHIQC4hpJv1p0RiMAR_HWQO98po
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import ContactSurvey from '../components/ContactSurvey';
import photo from '../assets/office.jpg'

const ContactsPage = () => {
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: '50%',
    height: '400px'
  };

  const center = {
    lat: 43.34875811486782,  // Change these to your desired location
    lng: 26.22469033244008  // Change these to your desired location
  };
//43.34875811486782, 26.22469033244008
  const handleMapLoad = (map) => {
    setMap(map);
  };

  return (
    <div className="flex flex-col gap-y-6 items-center">
      <h1 className='text-3xl font-bold m-4'>Контакти</h1>
      <div className='flex flex-row justify-around w-full'>

      <LoadScript googleMapsApiKey="AIzaSyD1ZjxirHIQC4hpJv1p0RiMAR_HWQO98po">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={19}
          onLoad={handleMapLoad}
        >
          <MarkerF position={center}/>
        </GoogleMap>
      </LoadScript>

      <div className='container bg-neutral w-1/3 flex flex-col items-center justify-center'>
      <div className='w-3/4'>
      <p className='font-bold text-3xl mb-6 '>За контакт с компютърен сервиз Denev Computers:</p>
      <p>гр. Попово 7800 обл.Търговище</p>
      <p>Бул. "България" 78, ет.1 вх. Б</p>
      <p>​088 705 1389</p>
      <p>dd1@mail.bg </p>
      <p>​dd2@abv.bg</p>
      <p>Работно време: 09:00 - 17:00</p>
      <p>Неделя - почивен ден</p>
      </div>

      </div>
      </div>
      <div className='flex flex-row justify-around w-full ml-12'>
      <div className='w-1/2'>
      <ContactSurvey/>
      </div>
      <div className='container bg-neutral w-1/3'
                  style={{
                    backgroundImage: `url(${photo})`,
                    backgroundSize: "cover", 
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}>


      </div>
      </div>
      
    </div>
  );
};

export default ContactsPage;


