import {offStat} from './offStat'
import {defStat} from './defStat'

var minApps = 8;
console.log(offStat);
//var teamNames = []; //массив с названиями команд
var teamNames = ["Stoke", "Manchester City", "Watford", "Manchester United", "Huddersfield", "Chelsea", "Tottenham",
  "Arsenal", "Southampton", "Liverpool", "Burnley", "Leicester", "Crystal Palace", "Newcastle United",
  "Everton", "Brighton", "West Bromwich Albion", "Bournemouth", "West Ham", "Swansea"];
var allPlayers = [];
var teamHash = {};

//обработаем див с турнирной таблицей, чтобы получить хэш с командами, в котором будут хранится игроки по амплуа, а также дополнительные показатели по 
//командам(очки, пропущенные мячи..). Ключом хэша - является название команды.
///var stringTable = document.getElementById('table');
//var teams = stringTable.textContent.split('\n');
//teams.splice(0,1);
//teams.splice(teams.length-1, 1);
teamNames.forEach((v, i, a)=>{
  teamHash[v] = {'m':[], 'f':[], 'd':[], 'g':[], 'teamName':v};
});


//функция вывода в консоль показателей игроков в массиве
function playersToConsole(array){
  array.forEach(v=>
    console.log(v.name + ' ' + v.tempgapg + ' ' + v.total + ' ' + v.rating + ' ' + v.initialGameDefPower + ' ' + v.initialGameOffPower+ ' ' + v.tempdefensive + ' ' +v.tempoffensive+ ' '+ 
      v.mainTotal));
}

/*//создадим хэши команд согласно их именам
var teamHash = {};
teamNames.forEach(v => {
  //debugger;
  var teamName = v;
  teamHash[teamName] = {'m':[], 'f':[], 'd':[], 'g':[]};
});
*/
allPlayers = combineTeamArr(defStat, offStat);
function combineTeamArr(defStat:Array<any>, offStat:Array<any>):Array<any>{
    //объединим в один массив защитные и атакующие показатели игроков
    //var allPlayers = JSON.parse(JSON.stringify(defStat));
    var allPlayers = defStat;
    allPlayers.forEach(v=> {
      offStat.forEach(v2=> {
        if (v.name==v2.name){
          v.assistTotal = v2.assistTotal;
          v.dispossessedPerGame = v2.dispossessedPerGame;
          v.dribbleWonPerGame = v2.dribbleWonPerGame;
          v.foulGivenPerGame = v2.foulGivenPerGame;
          v.goal = v2.goal;
          v.keyPassPerGame = v2.keyPassPerGame;
          v.offsideGivenPerGame = v2.offsideGivenPerGame;
          v.shotsPerGame = v2.shotsPerGame;
          v.turnoverPerGame = v2.turnoverPerGame;
        }
      });
    });
  return allPlayers;
  }

console.log(allPlayers);

//каждому игроку добавляем защитный и атакующий показатель
allPlayers.forEach( v => v.defensive = v.tacklePerGame + v.interceptionPerGame + v.foulsPerGame/2 - v.wasDribbledPerGame);
allPlayers.forEach( v => {
  /*console.log(v.name);
  console.log(v.goal);
  console.log(v.shotsPerGame);
  console.log(v.assistTotal/2);
  console.log(v.keyPassPerGame/2);*/
  v.offensive = v.goal+ v.shotsPerGame + v.assistTotal/2 + v.keyPassPerGame/2;
});

//создадим функцию, которая возвращает массив из игроков данного амплуа, попутно добавляя игрока в хэш его команды, при условии, что игрок провел 
//минимальное количество матчей
//M-midfielder, F-forward, D-defender, G-goalkeaper
function getPlayersByPosition(position){
  position.toLowerCase();
  return allPlayers.filter(v=> {
    try{
      //debugger;
      if(v.playedPositions.indexOf(position) !== -1 && v.apps >= minApps){
        var teamName = v.teamName;
        teamHash[teamName][position.toLowerCase()].push(v);
        return true;
      } 
    } catch(e){
        //debugger;
        console.log('ERROR');
        console.log(v); 
    }
  });
}
var mfs = getPlayersByPosition('M');
console.log(mfs);

//сортируем полузащитников по защитному показателю
mfs.sort((a, b)=> b.defensive-a.defensive);
//присваеваем начальный игровой защитный показатель полузащитникам
mfs.forEach((v, i)=> {
  v.initialGameDefPower = 100-i;
  v.initialGameDefPower = v.initialGameDefPower >=20? v.initialGameDefPower : 20;
});

//сортируем полузащитников по атакуещему показателю
mfs.sort((a, b)=> b.offensive-a.offensive);
//присваеваем начальный игровой атакующий показатель полузащитникам
mfs.forEach((v, i)=> {
  v.initialGameOffPower = 100-i;
  v.initialGameOffPower = v.initialGameOffPower >=20? v.initialGameOffPower : 20;
});

//получаем начальный тотал скилов
mfs.forEach((v)=> v.total = v.initialGameOffPower + v.initialGameDefPower );

//сортируем полузащитников по тоталу
mfs.sort((a, b)=> b.total-a.total);
mfs.forEach(v => {console.log(v.name + ' ' + v.total + ' ' + v.initialGameDefPower + ' ' + v.initialGameOffPower );});

//сортируем полузащитников по тоталу в командах
for(var team in teamHash){
  teamHash[team].m.sort((a,b)=> b.total-a.total);
}

//найдем нападающих
var fws = getPlayersByPosition('F');
//сортируем нападающих по атакуещему показателю
fws.sort((a, b)=> b.offensive-a.offensive);
//сортируем нападающих по атакующему показателю в командах
for(var team in teamHash){
    teamHash[team].f.sort((a,b)=> b.offensive-a.offensive);
}

//найдем голкиперов
var gks = getPlayersByPosition('G');
//сортируем голкиперов по рейтингу
gks.sort((a, b)=> b.rating-a.rating);
//сортируем голкиперов по рейтингу в командах
for(var team in teamHash){
    teamHash[team].g.sort((a,b)=> b.rating-a.rating);
}

//найдем защитников
var dfs = getPlayersByPosition('D');
//сортируем защитников по рейтингу;
dfs.sort((a, b)=> b.rating-a.rating);
//сортируем защитников по рейтингу в командах
for(var team in teamHash){
    teamHash[team].d.sort((a,b)=> b.rating-a.rating);
}

//создадим массив из teamHash, чтобы его использовать его дальше
var teamArr = [];
teamNames.forEach((v, i, a)=>{
  teamArr.push(teamHash[v]);
  teamHash[v].name=v;
});

  
assignPositions(teamArr);

function assignPositions(teamArr: Array<any>){
  teamArr.forEach((v,i,a)=>{
    v.m.forEach((vara)=>{
      vara.checked=true;
    });
    v.f.forEach((vara)=>{
      vara.checked=true;
    });
    v.d.forEach((vara)=>{
      vara.checked=true;
    });
    v.g.forEach((vara)=>{
      vara.checked=true;
    });
  });  
}
export let teamArray = teamArr;