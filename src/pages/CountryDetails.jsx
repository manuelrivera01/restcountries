import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import restCountries from '../api/restCountries';

const CountryDetails = () => {
  const { cca2 } = useParams();
  const [country, setCountry] = useState([]);
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const [languages, setLanguages] = useState({});
  const [currencies, setCurrencies] = useState({});
  const [demonyms, setdemonyms] = useState('');
  const [tld, setTled] = useState([]);
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await restCountries.get(`/alpha/${cca2}`);
      console.log(response.data[0].name.common);
      setCountry(response.data[0]);
      setName(response.data[0].name.common);
      setFlag(response.data[0].flags.png);
      setLanguages(response.data[0].languages);
      setCurrencies(response.data[0].currencies);
      setdemonyms(response.data[0].demonyms.eng.m);
      setTled(response.data[0].tld);
      setBorders(response.data[0].borders);
      //console.log(response.data[0].languages);
      console.log(response.data[0].demonyms.eng.m);
    };
    fetchData();
  }, []);

  return (
    <div className='flex justify-center mx-24 my-24'>
      <div className='image-container w-full ml-10 mr-0  flex justify-start'>
        <img src={flag} alt='' className='w-96 ml-12 img-shadow' />
      </div>
      <div className='info-container w-full m-0 mr-24'>
        <div className='info-header mb-5'>
          <h2 className='font-bold text-2xl'>{name}</h2>
        </div>
        <div className='details-container flex justify-between '>
          <div className='left-info'>
            <p>
              Capital:{' '}
              <span>{country.capital ? country.capital : 'No data'}</span>
            </p>
            <p>
              Population:{' '}
              <span>{country.population ? country.population : 'No data'}</span>
            </p>
            <p>
              Region: <span>{country.region ? country.region : 'No data'}</span>
            </p>
            <p>
              Subregion:{' '}
              <span>{country.subregion ? country.subregion : 'No data'}</span>
            </p>
          </div>
          <div className='right-info'>
            <p>
              Languages:
              {languages ? (
                Object.keys(languages).map((value, index) => {
                  return (
                    <span key={index}>
                      {(index ? ', ' : '') + ' ' + languages[value]}
                    </span>
                  );
                })
              ) : (
                <span> No data</span>
              )}
            </p>
            <p>
              Currencies:
              {currencies ? (
                Object.keys(currencies).map((value, index) => {
                  return (
                    <span key={index}>
                      {(index ? ', ' : '') + ' ' + currencies[value].name}
                    </span>
                  );
                })
              ) : (
                <span> No data</span>
              )}
            </p>
            <p>
              Demonym: <span> {demonyms}</span>
            </p>
            <p>
              Top Level Domain:
              {tld?.map((el, index) => {
                return <span key={index}> {el}</span>;
              })}
            </p>
          </div>
        </div>
        <div className='borders-container mt-8 flex'>
          <p className='font-bold'>Borders: </p>

          {borders ? (
            borders.map((border, index) => {
              return (
                <div
                  key={index}
                  className='border-2 border-cyan-600 mx-2 p-2 shadow-md'
                >
                  <p>{border}</p>
                </div>
              );
            })
          ) : (
            <span className='ml-2'>No data</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
