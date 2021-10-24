import { testSum } from "../src/server.js";

describe("testing simple sum", () => {

    it("returns 3 for params (2,1) ", () => {
      const result = testSum(2, 1);
      expect(result).toEqual(3);
    });
     
  });