import styled from 'styled-components';

import { Button, ButtonGroup } from '@mui/material';
import { ResponsiveAppBar } from './AppBar';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { Home } from './Home';
import { Favorite } from './Favorite';
import { SearchInput } from './SearchInput';
import axios from 'axios';
import { ACCU_WEATHER_BASE_URL, PAGES } from '../utils/constants';
import {
  handleFavoriteActions,
  parseLocationSearchData,
  parseWeatherData,
  searchLocationFromLocal,
  searchWeatherFromLocal,
} from '../utils/functions';

const StyledButton = styled(Button)`
  color: black;
  background-color: ${({ selected }) => (selected ? '#fc5c65' : '#26de81')};
  &:focus {
    background-color: ${({ selected }) => (selected ? '#fc5c65' : '#26de81')};
  }
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.5rem;
`;

const StyledSearchContainer = styled.div`
  width: 25rem;
  margin: 0 auto;
`;

export const AppContainer = () => {
  const [selectedPage, setSelectedPage] = useState(PAGES.HOME);
  const [locationResponses, setLocationResponses] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleSearchInput = async (e) => {
    const {
      target: { value },
    } = e;
    const useCachedResponse = eval(process.env.REACT_APP_USE_CACHE);

    const localResponses = searchLocationFromLocal(value);
    if (localResponses.length && useCachedResponse) {
      console.log('using cached');
      setLocationResponses(localResponses);
    } else {
      try {
        const url = `${ACCU_WEATHER_BASE_URL}/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${value}`;
        const response = await axios.get(url);
        const { data } = response;
        const parsedData = parseLocationSearchData(data);
        setLocationResponses(parsedData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectLocation = async (location) => {
    const { key, name } = location;
    const localResponse = searchWeatherFromLocal(key);
    const useCachedResponse = eval(process.env.REACT_APP_USE_CACHE);
    if (localResponse && useCachedResponse) {
      setCurrentWeather(localResponse);
    } else {
      try {
        const url = `${ACCU_WEATHER_BASE_URL}/currentconditions/v1/${key}?apikey=${process.env.REACT_APP_API_KEY}`;
        const response = await axios.get(url);
        const parsedWeatherData = parseWeatherData(response.data, name, key);
        setCurrentWeather(parsedWeatherData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const favoriteActionsHandler = () => {
    const payload = { ...currentWeather, timestamp: Date.now() };
    handleFavoriteActions(payload);
  };

  const onCardClick = (data) => {
    handleSelectLocation(data);
    setSelectedPage(PAGES.HOME);
  };

  useEffect(() => {
    // Showing weather for Paris as default.
    const location = { key: '623', name: 'Paris' };
    handleSelectLocation(location);
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <StyledButtonContainer>
        <ButtonGroup variant="contained">
          <StyledButton
            selected={selectedPage === PAGES.HOME}
            startIcon={<HomeIcon />}
            onClick={() => setSelectedPage(PAGES.HOME)}
          >
            Home
          </StyledButton>
          <StyledButton
            selected={selectedPage === PAGES.FAVORITE}
            startIcon={<FavoriteIcon />}
            onClick={() => setSelectedPage(PAGES.FAVORITE)}
          >
            Favorites
          </StyledButton>
        </ButtonGroup>
      </StyledButtonContainer>

      {selectedPage === PAGES.HOME ? (
        <>
          <StyledSearchContainer>
            <SearchInput
              searchHandler={handleSearchInput}
              handleSelectLocation={handleSelectLocation}
              locationResponses={locationResponses}
            />
          </StyledSearchContainer>
          <Home
            currentWeather={currentWeather}
            favoriteActionsHandler={favoriteActionsHandler}
          />
        </>
      ) : (
        <Favorite onCardClick={onCardClick} />
      )}
    </>
  );
};
