import styled from 'styled-components';
import { BaseFontStyles } from './Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Icon, Typography } from '@mui/material';

const Container = styled.div`
  height: 18rem;
  width: 13rem;
  border: 2px solid #1976d2;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
`;
const Temperature = styled(BaseFontStyles)`
  font-size: 4rem;
  font-weight: 300;
  text-align: center;
  margin-top: 1rem;
`;
const City = styled(Temperature)`
  margin-top: 0.5rem;
  font-size: 2rem;
`;
const Weather = styled(Temperature)`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  color: #1976d2;
  font-size: 1.5rem;
  cursor: pointer;
`;
const UpdatedOnText = styled(Typography)`
  color: #5d5d5d;
  font-family: 'Lato';
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;
const UpdatedOnTime = styled(UpdatedOnText)`
  margin-top: 0.25rem;
`;

export const WeatherCard = ({
  temperature,
  city,
  weatherText,
  timestamp,
  onCardClick,
  itemKey,
}) => {
  const handleCardClick = () => onCardClick({ name: city, key: itemKey });

  const timeDifference = Math.round((Date.now() - timestamp) / 1000 / 60);
  const updatedOnText =
    timeDifference > 1 ? `${timeDifference} minutes ago` : 'About a minute ago';
  return (
    <Container onClick={handleCardClick}>
      <Icon component={StyledRefreshIcon} />
      <Temperature>{temperature.metric}°</Temperature>
      <City>{city}</City>
      <Weather>{weatherText}</Weather>
      <UpdatedOnText>Updated:</UpdatedOnText>
      <UpdatedOnTime>{updatedOnText}</UpdatedOnTime>
    </Container>
  );
};
