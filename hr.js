let p = require("puppeteer");

let browser;
let page;
let code;

p.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
  //   slowMo: 50,
})
  .then(function (b) {
    browser = b;
    return b.pages();
  })
  .then(function (pages) {
    page = pages[0];
    return page.goto(
      "https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"
    );
  })
  .then(function () {
    return page.type("#input-1", "jidago4645@tlhao86.com");
  })
  .then(function () {
    return page.type("#input-2", "123456");
  })
  .then(function () {
    return Promise.all([
      page.waitForNavigation(),
      page.click(
        ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
      ),
    ]);
  })
  .then(function () {
    return Promise.all([
      page.waitForNavigation(),
      page.click("[title = 'Interview Preparation Kit'] a"),
    ]);
  })
  .then(function () {
    return waitClickNavigate("[data-attr1='warmup']");
  })
  .then(function () {
    return waitClickNavigate(
      " .ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"
    );
  })
  .then(function () {
    return waitClickNavigate("[data-attr2='Editorial']");
  })
  .then(function () {
    return handleLockBtn();
  })
  .then(function () {
    return page.waitForSelector("pre");
  })
  .then(function () {
    return page.evaluate(function () {
      return document.querySelector("pre").textContent;
    });
  })
  .then(function (v) {
    code = v;
    return page.click("[data-attr2='Problem']");
  })
  .then(function () {
    return page.waitForSelector(".custom-checkbox.inline");
  })
  .then(function () {
    return page.click(".custom-checkbox.inline");
  })
  .then(function () {
    return page.type(".custominput", code);
  })
  .then(function () {
    return page.keyboard.down("Control");
  })
  .then(function () {
    return page.keyboard.press("A");
  })
  .then(function () {
    return page.keyboard.press("X");
  })
  .then(function () {
    return page.click(".monaco-editor.no-user-select.vs");
  })
  .then(function () {
    return page.keyboard.press("A");
  })
  .then(function () {
    return page.keyboard.press("V");
  })
  .then(function () {
    return page.keyboard.up("Control");
  })
  .then(function () {
    return page.click(".pull-right.btn.btn-primary.hr-monaco-submit");
  });

function handleLockBtn() {
  return new Promise(function (resolve, reject) {
    page
      .waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled", {
        visible: true,
      })
      .then(function () {
        return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        resolve();
      });
  });
}

function waitClickNavigate(selector) {
  return new Promise(function (resolve, reject) {
    page
      .waitForSelector(selector, { visible: true })
      .then(function () {
        return Promise.all([page.waitForNavigation(), page.click(selector)]);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}