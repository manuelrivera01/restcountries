import React, { useEffect, useState } from 'react';
import restCountries from '../api/restCountries';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { countrysearch } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsloading(true);
    let response = '';
    if (countrysearch) {
      response = await restCountries.get(`/name/${countrysearch}`);
    } else {
      response = await restCountries.get('/all');
    }
    // const response = await restCountries.get('/all');
    console.log(response.data);
    setCountries(response.data);
    setIsloading(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='flex justify-center  relative overflow-x-auto  sm:rounded-lg mx-20 mt-16'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-8'>
          <thead className='text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th className='py-2'>Country</th>
              <th>Capital</th>
              <th className='px-4'>Population</th>
              <th className='px-4'>Region</th>
              <th className='px-4'>Flag</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPosts &&
              currentPosts.map((country, index) => {
                return (
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    key={index}
                  >
                    <td className='px-6 py-4 font-medium text-gray-900 dark:text-white '>
                      {country.name.common}
                    </td>
                    <td>{country.capital}</td>
                    <td className='px-4'>{country.population}</td>
                    <td className='px-4'>{country.region}</td>
                    <td className='px-4'>
                      <img src={country.flags.png} alt='' className='w-14' />
                    </td>
                    <td className='px-4 py-4 text-right'>
                      <Link
                        to={`/countrydetails/${country.cca2}`}
                        className='px-4 py-2 font-semibold text-md bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow-md '
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className='my-10 flex justify-center'>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={countries.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default CountriesList;
