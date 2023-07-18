/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, Mock } from "vitest";
import { useAddScene } from "./useAddScene";
import {
  useAddSceneFilterCharacterQuery,
  useAddSceneFilterLocationQuery,
} from "../../services/api.generated";

vi.mock("localforage");
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));
vi.mock("../../services/api.generated", () => ({
  useAddSceneFilterCharacterQuery: vi.fn(),
  useAddSceneFilterLocationQuery: vi.fn(),
}));

const mockNavigate = vi.fn();

type SetupOptions = {
  useAddSceneFilterCharacterQueryImplementation: typeof useAddSceneFilterCharacterQuery;
  useAddSceneFilterLocationQueryImplementation: typeof useAddSceneFilterLocationQuery;
};

const setup = (options?: Partial<SetupOptions>) => {
  const setupOptions: SetupOptions = {
    useAddSceneFilterCharacterQueryImplementation: () => [
      {
        data: { __typename: "Query", characters: null },
        fetching: false,
        stale: false,
      },
      () => undefined,
    ],
    useAddSceneFilterLocationQueryImplementation: () => [
      {
        data: { __typename: "Query", locations: null },
        fetching: false,
        stale: false,
      },
      () => undefined,
    ],
    ...options,
  };

  (useAddSceneFilterCharacterQuery as Mock).mockImplementation(
    setupOptions.useAddSceneFilterCharacterQueryImplementation
  );
  (useAddSceneFilterLocationQuery as Mock).mockImplementation(
    setupOptions.useAddSceneFilterLocationQueryImplementation
  );

  return renderHook<ReturnType<typeof useAddScene>, void>(() => useAddScene());
};

describe("useAddScene", () => {
  it("return as expected", () => {
    const { result } = setup();

    expect(result.current).toMatchObject({
      characters: [],
      characterLoading: false,
      locations: [],
      locationLoading: false,
      handleCharacterSearch: expect.any(Function),
      handleLocationSearch: expect.any(Function),
      handleSubmit: expect.any(Function),
      handleCancel: expect.any(Function),
    });
  });

  describe("handleCharacterSearch", () => {
    it("triggers `useAddSceneFilterCharacterQuery after 300ms`", () => {
      const { result } = setup();

      const characterSearch = "Rick";
      act(() => {
        result.current.handleCharacterSearch(characterSearch);
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(useAddSceneFilterCharacterQuery).toHaveBeenCalledWith({
        pause: false,
        variables: { name: characterSearch },
      });
    });
  });

  describe("handleLocationSearch", () => {
    it("triggers `useAddSceneFilterLocationQuery after 300ms`", () => {
      const { result } = setup();

      const locationSearch = "Earth";
      act(() => {
        result.current.handleLocationSearch(locationSearch);
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(useAddSceneFilterLocationQuery).toHaveBeenCalledWith({
        pause: false,
        variables: { name: locationSearch },
      });
    });
  });

  describe("when handleCancel is trigger", () => {
    it("navigates back", () => {
      const { result } = setup();

      act(() => {
        result.current.handleCancel();
      });

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
