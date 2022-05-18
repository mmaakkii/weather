import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { WEATHER_SYSTEMS } from '../utils/constants';
import { isFavorite } from '../utils/functions';

const Container = styled.div`
  height: 75vh;
  width: 75vw;
  border: 2px solid #1976d2;
  border-radius: 10px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
`;

export const BaseFontStyles = styled(Typography)`
  font-family: 'Lato';
  font-weight: 100;
`;

const Temperature = styled(BaseFontStyles)`
  font-size: 6rem;
  margin: 0 auto;
`;

const City = styled(BaseFontStyles)`
  font-size: 4rem;
  font-weight: 200;
  margin: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const WeatherStatus = styled(BaseFontStyles)`
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EmptyText = styled(BaseFontStyles)`
  font-size: 4rem;
  font-weight: 300;
  text-align: center;
`;

export const Home = ({ currentWeather, favoriteActionsHandler }) => {
  const [weatherSystem, setWeatherSystem] = useState(WEATHER_SYSTEMS.METRIC);
  const [favoriteBtnText, setFavoriteBtnText] = useState(null);

  const temperatureText =
    weatherSystem === WEATHER_SYSTEMS.METRIC
      ? currentWeather?.temperature.metric
      : currentWeather?.temperature.imperial;

  useEffect(() => {
    if (currentWeather && isFavorite(currentWeather.key)) {
      setFavoriteBtnText('Remove from favorite');
    } else {
      setFavoriteBtnText('Add to favorite');
    }
  }, [currentWeather]);

  const addToFavoriteHandler = () => {
    if (isFavorite(currentWeather.key)) {
      setFavoriteBtnText('Add to favorite');
    } else {
      setFavoriteBtnText('Remove from favorite');
    }
    favoriteActionsHandler();
  };

  return (
    <Container>
      {currentWeather ? (
        <>
          <TopContainer>
            {currentWeather && favoriteBtnText && (
              <Box margin={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FavoriteIcon />}
                  onClick={addToFavoriteHandler}
                >
                  {favoriteBtnText}
                </Button>
              </Box>
            )}
            <Box margin={2} sx={{ display: { md: 'flex', xs: 'none' } }}>
              <ToggleButtonGroup
                color="secondary"
                value={weatherSystem}
                exclusive
                onChange={(e) => setWeatherSystem(e.target.value)}
              >
                <ToggleButton value="metric">Metric System</ToggleButton>
                <ToggleButton value="imperial">Imperial System</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </TopContainer>
          <Temperature>{temperatureText}°</Temperature>
          <WeatherStatus>{currentWeather.weatherText}</WeatherStatus>
          <City>{currentWeather.city}</City>
          <Box margin={2} sx={{ display: { md: 'none', xs: 'flex' }, mb: 2 }}>
            <ToggleButtonGroup
              color="secondary"
              value={weatherSystem}
              exclusive
              onChange={(e) => setWeatherSystem(e.target.value)}
            >
              <ToggleButton value="metric">Metric System</ToggleButton>
              <ToggleButton value="imperial">Imperial System</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      ) : (
        <EmptyText>Try searching for a city!</EmptyText>
      )}
    </Container>
  );
};
