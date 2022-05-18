import styled from 'styled-components';
import { Grid } from '@mui/material';
import { WeatherCard } from './FavoriteWeatherCard';
import { useEffect, useState } from 'react';
import { getParsedLocalStorageData } from '../utils/functions';
import { FAVORITE_WEATHER_KEY } from '../utils/constants';

const Container = styled(Grid)`
  margin-top: 2rem;
  padding: 2rem 4rem;
`;

export const Favorite = ({ onCardClick }) => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    setFavorites(getParsedLocalStorageData(FAVORITE_WEATHER_KEY));
  }, []);
  return (
    <Container container rowSpacing={6} spacing={6}>
      {favorites?.length &&
        favorites.map((item) => (
          <Grid key={item.key} item xs={12} sm={6} md={3}>
            <WeatherCard
              {...item}
              itemKey={item.key}
              onCardClick={onCardClick}
            />
          </Grid>
        ))}
    </Container>
  );
};
