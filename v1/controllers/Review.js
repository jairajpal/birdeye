const puppeteer = require("puppeteer");

module.exports.fetchReviews = async (req, res, next) => {
  try {
    let { url } = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.click("#reviewtab");
    const rightCol = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("#customerReviews>.review>.rightCol")
      ).map((x) => x.textContent);
    });

    const leftCol = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("#customerReviews>.review>.leftCol")
      ).map((x) => x.textContent);
    });
    let reviews = [];
    rightCol.map((name, index) => {
      let splitData = name.split("\n");
      let splitData2 = leftCol[index].split("\n");
      let obj = {
        comment: splitData[3],
        rating: splitData2[4],
        date: splitData2[19],
        reviewerName: splitData2[17],
      };
      reviews.push(obj);
    });
    await browser.close();
    return res.success("FETCHED_SUCCESSFULLY", reviews);
  } catch (error) {
    next(error);
  }
};
