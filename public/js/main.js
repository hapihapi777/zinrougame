'use strict';
{
  let btn0 = document.getElementById('select');
  btn0.addEventListener('click', setNinzuu);
  let btn1 = document.getElementById('menber_list');
  btn1.disabled = true;
  btn1.addEventListener('click', addName);
  let btn2 = document.getElementById('job_btn');
  btn2.disabled = true;
  btn2.addEventListener('click', GetJob);


  // テスト中なので８人入った状態です
  // テスト終了後は空にする
  let menber_list = [
    "ウメハラ",
    "マゴ",
    "ふ〜ど",
    "ボンちゃん",
    "どぐら",
    "ナウマン",
    "シュート",
    "えいた",
  ];

  // ボタン１を押したら実行
  function addName() {
    // 配列を返す関数
    let namelist = GetMenber();

    let input = document.getElementById("text_name");
    let output = document.getElementById("output");
    // namelist.push(input.value);// 配列に要素を追加
    output.textContent = "";

    // 配列の要素を先頭から順番にすべて出力
    let i = 0;


    let ninzuu = setNinzuu();
    console.log(setNinzuu());
    while (i < namelist.length) {
      output.textContent += (i + 1) + ":" + namelist[i] + " ";
      i = i + 1;
      if (namelist.length >= ninzuu) {
        btn1.disabled = true;
        btn2.disabled = false;
      }
    }
    // console.log(namelist);
    input.value = "";
  }

  // 人数セット
  // ラジオボタンの操作
  // function setNinzuu() {
  // 
  // }

  // セレクトメニュー
  function setNinzuu() {
    btn0.disabled = true;
    let obj = document.getElementById('hito');
    // // 選択されている値の番号を取得
    let idx = obj.selectedIndex;
    // // 値を取得
    let txt = obj.options[idx].text;
    // // 表示
    document.getElementById('ninzuu').textContent = "今回は" + txt + "人村となります";
    btn1.disabled = false;
    return parseInt(txt);
  }

  // 配列の更新
  function GetMenber() {
    let p = document.getElementById('text_name').value;
    menber_list.push(p);
    console.log(menber_list);
    return menber_list;
  }

  // btn2実行
  function GetJob() {
    let menber = shuffle(menber_list);
    console.log(menber_list);

    let kisi = document.getElementById('kisi');
    let reibai = document.getElementById('reibai');
    let kyouzin = document.getElementById('kyouzin');
    let uranai = document.getElementById('uranai');
    let zinrou = document.getElementById('zinrou');

    // let junban = document.getElementById('junban');

    kisi.textContent = "騎士: " + menber[0];
    reibai.textContent = "霊媒: " + menber[1];
    kyouzin.textContent = "狂人: " + menber[2];

    let N = menber.length;
    if (N > 10) {
      let uranaisaki = Math.floor(Math.random() * (N - 4));
      console.log(uranaisaki);
      uranai.textContent = "占い: " + menber[N - 4] + "  [占い先 > " + menber[uranaisaki] + "]";
      zinrou.innerHTML = "人狼: " + "<span class= 'dis'>" + menber[N - 3] + ", " + menber[N - 2] + ", " + menber[N - 1] + '</span>' + "←隠してます";
    } else {
      let uranaisaki = Math.floor(Math.random() * (N - 3));
      console.log(uranaisaki);
      uranai.textContent = "占い: " + menber[N - 3] + "  [占い先 > " + menber[uranaisaki] + "]";
      zinrou.innerHTML = "人狼: " + menber[N - 2] + ", " + menber[N - 1];
      // zinrou.innerHTML = "人狼: " + "<span class= 'dis'>" + menber[N - 2] + ", " + menber[N - 1] + '</span>' + "←隠してます" ;
    }

    GetJunban(menber_list);
  }

  function GetJunban(array) {
    let junban = document.getElementById('junban');
    let menber = shuffle(array);
    let result = [];

    for (let i = 0; i < array.length; i++) {
      result.push(" " + (i + 1) + ":" + menber[i]);
    }
    junban.textContent = result;
    // return result;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
}