import { expect, test } from "vitest";
import { jc } from "../src/utils/joinClasses";

test("join classes - [fc]", () => {
	expect(jc("class1", "class2 class3")).toBe("class1 class2 class3");
});
