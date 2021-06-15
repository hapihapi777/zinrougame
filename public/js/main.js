'use strict';
{
  // let member_list = GetMember();

  const select = document.getElementById('select');
  select.addEventListener('click', Initial_action);
  const addmember = document.getElementById("addmember");
  addmember.addEventListener('click', ButtonMotion);
  const member_decision = document.getElementById("member_decision");
  member_decision.addEventListener('click', GameStart);
  const casting_1 = document.getElementById("casting_1");
  casting_1.addEventListener('click', GetJob);

  // チェックボックスと<div>要素と削除ボタンをn人数分IDかclass付きで作る
  // チェックが入ったら削除ボタンを有効にする
  // 削除ボタンを押した人を削除して配列を詰める

  // ボタンの関数を分ける

  // 初動
  function Initial_action() {
    const setting = document.getElementById("setting");
    setting.classList.add("nodisp");

    const ninzuu = parseInt(document.getElementById("hito").value);
    document.getElementById('number_of_people').textContent = "今回は" + ninzuu + "人村";
    for (let i = 1; i <= ninzuu; i++) {
      addForm(i);
    }

    MakeList("verification");
    MakeList("first_member");

    member_decision.disabled = true;

    const select = document.getElementById("select");
    select.disabled = true;
    const parent = document.getElementById("parent");
    parent.classList.remove('nodisp');
  }

  function MakeList(id) {
    const place = document.getElementById(id);
    const ninzuu = parseInt(document.getElementById("hito").value);

    for (let i = 0; i < ninzuu; i++) {
      const new_li = document.createElement("li");
      // new_li.id = "li" + i;
      // new_li.classList.add("item5");
      place.appendChild(new_li);
    }

  }

  // input作成関数
  function addForm(num) {
    const input_data = document.createElement('input');
    input_data.type = 'search';
    input_data.id = 'inputform_' + num;
    input_data.classList.add("item5");
    input_data.name = "member_name";
    // input_data.placeholder = num + "人目";
    input_data.value = num + "人目"; //テスト用入力値の設定

    const parent = document.getElementById('parent');
    const member_btns = document.getElementById('member_btns');
    parent.insertBefore(input_data, member_btns);
  }

  // ボタン関数(人数確定とliに書き込み)
  function ButtonMotion() {
    const verification = document.getElementById("verification");

    const member_list = GetMember();
    let str = "";
    for (let i = 0; i < member_list.length; i++) {
      str = (i + 1) + ": " + member_list[i];
      let list = verification.querySelectorAll("li")[i];
      list.textContent = str;
    }

    casting_1.disabled = true;
  }

  function GetMember() {
    const ninzuu = parseInt(document.getElementById("hito").value);

    const member_list = [];
    for (let i = 0; i < ninzuu; i++) {
      let p_i = document.getElementsByName("member_name")[i].value;
      member_list.push(p_i);
    }
    if (member_list.indexOf("") !== -1) {
      console.log("kara");
      member_decision.disabled = true;
    } else {
      member_decision.disabled = false;
    }
    console.log(member_list);

    return member_list;
    // console.log(member_list);
  }

  function GameStart() {
    const first_village = document.getElementById("first_village");
    first_village.classList.remove('nodisp');

    member_decision.disabled = true;
    casting_1.disabled = false;
  }

  function GetJob() {
    let member_list = GetMember();
    member_decision.disabled = true;
    let this_member_list = [];
    this_member_list = this_member_list.concat(shuffle(member_list));
    console.log(this_member_list);

    let N = this_member_list.length;
    let zinrou = ["【人狼】"];
    zinrou.push(this_member_list[0], this_member_list[1]);
    this_member_list.splice(0, 2);
    if (N > 10) {
      zinrou.push(this_member_list[0]);
      this_member_list.shift();
    }

    let this_job = [["【騎士】"], ["【ハンター】"], ["【サイコキラー】"], ["【占い師】"]];
    shuffle(this_job);

    const text_place = ["job_1_0", "job_1_1", "job_1_2", "job_1_3"];
    for (let i = 0; i < this_job.length; i++) {
      let str = "";
      this_job[i].push(this_member_list[i]);
      if (this_job[i][0] === "【占い師】") {
        this_member_list.splice(i, 1);
        console.log(this_member_list);
        this_job[i].push("(占い先 > " + this_member_list[Math.floor(Math.random() * (this_member_list.length - 1))] + ")");
      }
      for (let j = 0; j < this_job[i].length; j++) {
        str += " " + this_job[i][j];
      }
      document.getElementById(text_place[i]).textContent = str;
    }
    shuffle(this_job);

    let zinrou_member = "";
    zinrou.forEach(e => zinrou_member += " " + e);
    document.getElementById("zinrou").textContent = zinrou_member;

    console.log(zinrou);
    console.log(this_member_list);
    console.log(this_job);


    member_list = shuffle(member_list);

    const first_member = document.getElementById("first_member");
    let str = "";
    for (let i = 0; i < member_list.length; i++) {
      str = (i + 1) + ": " + member_list[i];
      let list = first_member.querySelectorAll("li")[i];
      list.textContent = str;
    }


  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

}