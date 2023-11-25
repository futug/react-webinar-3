import { pluralize } from "./utils";

describe("pluralize function", () => {
    it("should return correct singular form", () => {
        const result = pluralize(1, "раз", "раза", "раз");
        expect(result).toBe("раз");
    });

    it("should return correct plural1 form", () => {
        const result = pluralize(2, "раз", "раза", "раз");
        expect(result).toBe("раза");
    });

    it("should return correct plural5 form", () => {
        const result = pluralize(5, "раз", "раза", "раз");
        expect(result).toBe("раз");
    });
    it("should return correct plural=100 form", () => {
        const result = pluralize(100, "раз", "раза", "раз");
        expect(result).toBe("раз");
    });
    it("should return correct plural>100 odd form", () => {
        const result = pluralize(101, "раз", "раза", "раз");
        expect(result).toBe("раз");
    });
    it("should return correct plural>100 even form", () => {
        const result = pluralize(102, "раз", "раза", "раз");
        expect(result).toBe("раза");
    });
    it("should return correct plural>9007199254740992 even form", () => {
        const result = pluralize(9007199254740992, "раз", "раза", "раз");
        expect(result).toBe("раза");
    });
});
