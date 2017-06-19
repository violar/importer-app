import * as Assert from "assert";

suite("Regex", () =>
{
    let reg = new RegExp("^[A-Za-z]([A-Za-z0-9]*_?)*[A-Za-z0-9]$");
    
    test("should return true when first character is a string", () =>
    {
        let str = "sku";
        
        let result = reg.test(str);
        
        Assert.strictEqual(result, true);
    });
    
    test("should return true when underscores are added after the initial character and before the last character", () =>
    {
        let str = "sku_sku";

        let result = reg.test(str);

        Assert.strictEqual(result, true);
    });
    
    test("should return true when numbers are used after the first character", () =>
    {
        let str = "sku2";

        let result = reg.test(str);

        Assert.strictEqual(result, true);
    });
    
    test("should return false when first character is a number", () =>
    {
        let str = "1sku";
        
        let result = reg.test(str);
        
        Assert.strictEqual(result, false);
    });
    
    test("should return false when first character is an underscore", () =>
    {
        let str = "_sku";
        
        let result = reg.test(str);
        
        Assert.strictEqual(result, false);
    });
    
    test("should return false when last character is an underscore", () =>
    {
        let str = "sku_";

        let result = reg.test(str);

        Assert.strictEqual(result, false);
    });
    
    test("should return false when first character is a whitespace", () =>
    {
        let str = " sku";

        let result = reg.test(str);

        Assert.strictEqual(result, false);
    });
    
    test("should return false when last character is a whitespace", () =>
    {
        let str = "sku ";

        let result = reg.test(str);

        Assert.strictEqual(result, false);
    });
    
    test("should return false when string is an empty string", () =>
    {
        let str = "";

        let result = reg.test(str);

        Assert.strictEqual(result, false);
    });
    
    test("should return false when string is a whitespace", () =>
    {
        let str = " ";

        let result = reg.test(str);

        Assert.strictEqual(result, false);
    });
    
    test("should return false when characters are split by whitespace", () =>
    {
        let str = "sku sku";

        let result = reg.test(str);

        Assert.strictEqual(result, false);
    });
});