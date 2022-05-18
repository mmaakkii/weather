import { Autocomplete, TextField } from '@mui/material';

export const SearchInput = ({
  searchHandler,
  locationResponses,
  handleSelectLocation,
}) => {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={locationResponses}
      onChange={(event, value) => handleSelectLocation(value)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.key}>
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={searchHandler}
          label="Location search"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
};
