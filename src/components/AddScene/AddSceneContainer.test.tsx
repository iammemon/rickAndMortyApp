/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { vi, Mock } from "vitest";
import { render } from "@testing-library/react";

import { AddSceneContainer } from "./AddSceneContainer";
import { AddSceneView } from "./AddSceneView";
import { useAddScene } from "./useAddScene";

vi.mock("./AddSceneView", () => ({ AddSceneView: vi.fn() }));
vi.mock("./useAddScene", () => ({ useAddScene: vi.fn() }));

type SetupOptions = {
  useAddSceneImplementation: typeof useAddScene;
};
const setup = () => {
  (AddSceneView as Mock).mockImplementation(() => null);

  const setupOptions: SetupOptions = {
    useAddSceneImplementation: () => ({
      characterLoading: false,
      characters: [],
      locationLoading: false,
      locations: [],
      handleCancel: vi.fn(),
      handleCharacterSearch: vi.fn(),
      handleLocationSearch: vi.fn(),
      handleSubmit: vi.fn(),
    }),
  };

  (useAddScene as Mock).mockImplementation(
    setupOptions.useAddSceneImplementation
  );

  return render(<AddSceneContainer />);
};

describe("AlarmRecipientContainer", () => {
  describe("hook", () => {
    it("invokes `useAddScene` hook", () => {
      setup();

      expect(useAddScene).toHaveBeenCalled();
    });
  });

  it("returns AddSceneView", () => {
    setup();

    expect(AddSceneView).toHaveBeenCalledWith(
      {
        onSubmit: expect.any(Function),
        onCancel: expect.any(Function),
        characters: [],
        characterLoading: false,
        locations: [],
        locationLoading: false,
        onCharacterSearch: expect.any(Function),
        onLocationSearch: expect.any(Function),
      },
      expect.anything()
    );
  });
});
