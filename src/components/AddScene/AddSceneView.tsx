import Typography from "@mui/material/Typography";
import {
  AddSceneViewCharacterFragment,
  AddSceneViewLocationFragment,
} from "../../services/api.generated";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { useForm, Controller } from "react-hook-form";

type Values = {
  episode: string;
  characters: AddSceneViewCharacterFragment[];
  location: AddSceneViewLocationFragment | null;
  scene: string;
};

type Props = {
  characterLoading: boolean;
  characters: AddSceneViewCharacterFragment[];
  locations: AddSceneViewLocationFragment[];
  locationLoading: boolean;
  onCharacterSearch: (searchTerm: string) => void;
  onLocationSearch: (searchTerm: string) => void;
  onSubmit: (data: Values) => Promise<void>;
  onCancel: () => void;
};

const AddSceneView = ({
  characterLoading,
  characters,
  locations,
  locationLoading,
  onCharacterSearch,
  onLocationSearch,
  onSubmit,
  onCancel,
}: Props) => {
  const { spacing } = useTheme();

  const { handleSubmit, control } = useForm<Values>({
    defaultValues: { characters: [], episode: "", scene: "" },
  });

  const handleCharacterInputChange = (_: SyntheticEvent, value: string) =>
    onCharacterSearch(value);

  const handleLocationInputChange = (_: SyntheticEvent, value: string) =>
    onLocationSearch(value);

  return (
    <Box p={2} component={Paper}>
      <Typography variant="h6">New Scene</Typography>
      <form id="new-scene" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box display="grid" gap={spacing(1)} mb={1}>
          <Controller
            rules={{
              required: "Episode is Required",
              maxLength: {
                value: 15,
                message:
                  "Episode should be less than or equal to 15 characters",
              },
            }}
            control={control}
            name="episode"
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                id="episode"
                inputRef={ref}
                margin="dense"
                required
                variant="standard"
                label="Episode"
              />
            )}
          />
          <Controller
            rules={{ required: "Location is Required" }}
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete<AddSceneViewLocationFragment>
                onChange={(_, value) => field.onChange(value)}
                options={locations}
                loading={locationLoading}
                filterOptions={(x) => x}
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name || ""}
                onInputChange={handleLocationInputChange}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <ListItemText
                      primary={option.name}
                      secondary={option.type}
                    />
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Location"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {locationLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            rules={{ required: "Characters is Required" }}
            name="characters"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete<AddSceneViewCharacterFragment, true>
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                multiple
                filterSelectedOptions
                options={characters}
                loading={characterLoading}
                filterOptions={(x) => x}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name || ""}
                onInputChange={handleCharacterInputChange}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={option.name || "character image"}
                        src={option.image || ""}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={option.name}
                      secondary={`Status: ${option.status || "Unknown"}`}
                    />
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Characters"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {characterLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            rules={{ required: "Scene is Required" }}
            control={control}
            name="scene"
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                id="scene"
                multiline
                rows={4}
                inputRef={ref}
                margin="dense"
                required
                variant="standard"
                label="Scene"
              />
            )}
          />
        </Box>
      </form>
      <Box display="flex" gap={spacing(2)}>
        <Button
          form="new-scene"
          variant="contained"
          color="primary"
          type="submit"
        >
          Create
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export { AddSceneView };
export type { Values as AddSceneViewValues };
