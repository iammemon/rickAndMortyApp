import {
  AddSceneViewCharacterFragment,
  AddSceneViewLocationFragment,
} from "../../services";

export type Scene = {
  id: string;
  episode: string;
  characters: AddSceneViewCharacterFragment[];
  location: AddSceneViewLocationFragment;
  scene: string;
};
