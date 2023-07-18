import { beforeAll, afterAll, vi } from "vitest";

import "@testing-library/jest-dom";

beforeAll(() => {
  vi.useFakeTimers("modern");
  vi.setSystemTime(new Date("2000-01-01T01:00:00.000Z"));
});

afterAll(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});
