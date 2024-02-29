const yearAndMonth = document.getElementById("yearAndMonth");
const weekTitle = document.getElementById("weekTitle");
const days = document.getElementById("days");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

previous.addEventListener("click", () => showMonth("Prev"));
next.addEventListener("click", () => showMonth("Next"));

//獲取年、月、日期、星期
const now = new Date();
const nowObj = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  day: now.getDate(),
};
// const nowYear = now.getFullYear();
// const nowMonth = now.getMonth() + 1; //回傳為0-11
// const nowDate = now.getDate();
const weekdayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// 用map的方式展開weekdayList
weekTitle.innerHTML = `<tr>${weekdayList
  .map((value) => `<th>${value}</th>`)
  .join("")}</tr>`;

// 根據年份和月份顯示
function showCalendar(year = nowObj.year, month = nowObj.month) {
  // //讓月份能呈現兩位數
  const nowMonthStr = month < 10 ? "0" + month : month;
  yearAndMonth.innerText = `${year} / ${nowMonthStr}`;

  // // ${nowY}/${nowM}/1 是一個日期字串的模板，其中的 /1 表示該日期字串的日部分被設置為 1。
  // // 透過 .getDay() 方法獲取這一天是星期幾。
  const firstDay = new Date(`${year}/${nowMonthStr}/1`).getDay();
  // 要得到月份有幾天，可以用`new Date(y, m, 0).getDate()`
  const allDays = new Date(year, month, 0).getDate();

  const frontEmptyData = [];
  for (let i = 0; i < firstDay; i++) {
    frontEmptyData.push("");
  }

  const valueData = [];
  for (let i = 0; i < allDays; i++) {
    valueData.push(String(i + 1));
  }

  const backEmptyData = [];
  for (let i = 0; i < 42 - firstDay - allDays; i++) {
    backEmptyData.push("");
  }

  //const allData = [...frontEmptyData, ...valueData, ...backEmptyData];
  const allData = [...frontEmptyData, ...valueData];

  let display = "<tr>";
  for (let i = 0; i < allData.length; i++) {
    display += `<td>${allData[i]}</td>`;
    if ((i + 1) % 7 === 0) {
      display += "</tr><tr>";
    }
  }
  display += "</tr>";
  days.innerHTML = display;
}

const showMonth = (method = "Prev") => {
  const newMonth = method === "Prev" ? nowObj.month - 1 : nowObj.month + 1;

  nowObj.month = newMonth;

  if (newMonth < 1) {
    nowObj.year = nowObj.year - 1;
    nowObj.month = 12;
  }

  if (newMonth > 12) {
    nowObj.year = nowObj.year + 1;
    nowObj.month = 1;
  }

  showCalendar(nowObj.year, nowObj.month);
};

// //上個月
// function showPreviousMonth() {
//   const newMonth = nowObj.month - 1;
//   // nowMonth -= 1;
//   if (newMonth < 1) {
//     nowObj.year = nowObj.year - 1;
//     nowObj.month = 12;

//     showCalendar(nowObj.year, nowObj.month);

//     return;
//   }

//   // nowObj.year = nowYear;
//   nowObj.month = newMonth;

//   showCalendar(nowObj.year, nowObj.month);
// }

// //下個月
// function showNextMonth() {
//   const newMonth = nowObj.month + 1;
//   // nowMonth += 1;
//   if (newMonth > 12) {
//     nowObj.year = nowObj.year + 1;
//     nowObj.month = 1;

//     showCalendar(nowObj.year, nowObj.month);

//     return;
//   }

//   // nowObj.year = nowYear;
//   nowObj.month = newMonth;

//   showCalendar(nowObj.year, nowObj.month);
// }

showCalendar();
