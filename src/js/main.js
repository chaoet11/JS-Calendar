const yearAndMonth = document.getElementById("yearAndMonth");
const weekTitle = document.getElementById("weekTitle");
const days = document.getElementById("days");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

previous.addEventListener("click", showPreviousMonth);
next.addEventListener("click", showNextMonth);

//獲取年、月、日期、星期
const now = new Date();
let nowYear = now.getFullYear();
let nowMonth = now.getMonth() + 1; //回傳為0-11
const nowDate = now.getDate();
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
function showCalendar(nowYear, nowMonth) {
  // //讓月份能呈現兩位數
  const nowMonthStr = nowMonth < 10 ? "0" + nowMonth : nowMonth;
  yearAndMonth.innerText = `${nowYear} / ${nowMonthStr}`;

  // // ${nowY}/${nowM}/1 是一個日期字串的模板，其中的 /1 表示該日期字串的日部分被設置為 1。
  // // 透過 .getDay() 方法獲取這一天是星期幾。
  const firstDay = new Date(`${nowYear}/${nowMonthStr}/1`).getDay();
  // 要得到月份有幾天，可以用`new Date(y, m, 0).getDate()`
  const allDays = new Date(nowYear, nowMonth, 0).getDate();

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

//上個月
function showPreviousMonth() {
  nowMonth -= 1;
  if (nowMonth < 1) {
    nowMonth = 12;
    nowYear -= 1;
  }
  showCalendar(nowYear, nowMonth);
}

//下個月
function showNextMonth() {
  nowMonth += 1;
  if (nowMonth > 12) {
    nowMonth = 1;
    nowYear += 1;
  }
  showCalendar(nowYear, nowMonth);
}

showCalendar(nowYear, nowMonth);
