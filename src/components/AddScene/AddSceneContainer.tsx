import { AddSceneView } from "./AddSceneView";
import { useAddScene } from "./useAddScene";

const AddSceneContainer = () => {
  const {
    characters,
    characterLoading,
    locations,
    locationLoading,
    handleCharacterSearch,
    handleLocationSearch,
    handleSubmit,
    handleCancel,
  } = useAddScene();

  return (
    <AddSceneView
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      characters={characters}
      characterLoading={characterLoading}
      locations={locations}
      locationLoading={locationLoading}
      onCharacterSearch={handleCharacterSearch}
      onLocationSearch={handleLocationSearch}
    />
  );
};

export { AddSceneContainer };
