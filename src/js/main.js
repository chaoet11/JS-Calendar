const yearAndMonth = document.getElementById("yearAndMonth");
const weekTitle = document.getElementById("weekTitle");
const days = document.getElementById("days");

//獲取年、月、日期、星期
const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth() + 1; //回傳為0-11
const nowDate = now.getDate();

//讓月份能呈現兩位數
const nowMonthStr = nowMonth < 10 ? "0" + nowMonth : nowMonth;

//顯示當年與當月
yearAndMonth.innerText = `${nowYear} / ${nowMonthStr} `;

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

// ${nowY}/${nowM}/1 是一個日期字串的模板，其中的 /1 表示該日期字串的日部分被設置為 1。
// 透過 .getDay() 方法獲取這一天是星期幾。
const firstDay = new Date(`${nowYear}/${nowMonth}/1`).getDay();

// 要得到月份有幾天，可以用`new Date(y, m, 0).getDate()`
const allDays = new Date(nowYear, nowMonth, 0).getDate();

//第一天前面的空白格子的陣列
const frontEmptyData = [];
for (let i = 0; i < firstDay; i++) {
  frontEmptyData.push("");
}

//產生表示本月日期
const valueData = [];
for (let i = 0; i < allDays; i++) {
  valueData.push(String(i + 1));
}

//月曆最後一天後面的空白格子
const backEmptyData = [];
for (let i = 0; i < 42 - firstDay - allDays; i++) {
  backEmptyData.push("");
}

const allData = [...frontEmptyData, ...valueData, ...backEmptyData];

// 開頭tr標籤
let display = "<tr>";

// 用迴圈將日期資料加入data
for (let i = 0; i < allData.length; i++) {
  display += `<td>${allData[i]}</td>`;

  // 每7個要換列
  if ((i + 1) % 7 === 0) {
    display += "</tr><tr>";
  }
}
// 結尾tr標籤
display += "</tr>";

days.innerHTML = display;

previous.addEventListener("click", showPreviousMonth);
next.addEventListener("click", showNextMonth);

// 根據年份和月份更新
function updateCalendar(year, month) {
  yearAndMonth.innerText = `${year} / ${month < 10 ? "0" + month : month}`;

  const firstDay = new Date(`${year}/${month}/1`).getDay();
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

  const allData = [...frontEmptyData, ...valueData, ...backEmptyData];

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

// 上個月
function showPreviousMonth() {
  now.setMonth(now.getMonth() - 1);
  updateCalendar(now.getFullYear(), now.getMonth() + 1);
}

// 下個月
function showNextMonth() {
  now.setMonth(now.getMonth() + 1);
  updateCalendar(now.getFullYear(), now.getMonth() + 1);
}

updateCalendar(now.getFullYear(), now.getMonth() + 1);
