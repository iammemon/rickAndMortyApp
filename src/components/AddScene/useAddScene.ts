import { useState } from "react";
import {
  AddSceneViewCharacterFragment,
  AddSceneViewLocationFragment,
  useAddSceneFilterCharacterQuery,
  useAddSceneFilterLocationQuery,
} from "../../services/api.generated";
import { debounce } from "@mui/material";
import { AddSceneViewValues } from "./AddSceneView";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { Scene } from "./type";

const useAddScene = () => {
  const navigate = useNavigate();
  const [characterSearch, setCharacterSearch] = useState<string | null>(null);
  const [locationSearch, setLocationSearch] = useState<string | null>(null);

  const [{ fetching: characterLoading, data: characterData }] =
    useAddSceneFilterCharacterQuery({
      pause: characterSearch === null,
      variables: { name: characterSearch },
    });

  const [{ fetching: locationLoading, data: locationData }] =
    useAddSceneFilterLocationQuery({
      pause: locationSearch === null,
      variables: { name: locationSearch },
    });

  const handleSubmit = async (formValues: AddSceneViewValues) => {
    const values = {
      ...formValues,
      id: nanoid(),
      // location will always be there since it is required by rules
      location: formValues.location!,
    };

    const scenes = (await localforage.getItem<Scene[] | null>("scenes")) || [];
    scenes.unshift(values);
    await localforage.setItem("scenes", scenes);

    navigate(-1);
  };

  const handleCancel = () => navigate(-1);

  const handleCharacterSearch = (search: string) =>
    debounce((search: string) => {
      setCharacterSearch(search);
    }, 300)(search);

  const handleLocationSearch = (search: string) =>
    debounce((search: string) => {
      setLocationSearch(search);
    }, 300)(search);

  // The schema is not correct in the API the character shouldn't be null in an array
  const characters = (characterData?.characters?.results || []).filter(
    (character) => character !== null
  ) as AddSceneViewCharacterFragment[];

  // The schema is not correct in the API the location shouldn't be null in an array
  const locations = (locationData?.locations?.results || []).filter(
    (location) => location !== null
  ) as AddSceneViewLocationFragment[];

  return {
    characters,
    characterLoading,
    locations,
    locationLoading,
    handleCharacterSearch,
    handleLocationSearch,
    handleSubmit,
    handleCancel,
  };
};

export { useAddScene };
