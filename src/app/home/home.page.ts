import {Component, OnChanges, OnInit} from '@angular/core';
import {GenIService} from "../Pokemons/gen-i.service";
import {MovesService} from "../Moves/moves.service";
import {MoveDataClass} from "../MoveDATA/move-data-class";
import {MoveEff} from "../MoveDATA/move-eff";
import {UltraLeagueAllService} from "../Pokemons/ultra-league-all.service";
import {MasterLeagueAllService} from "../Pokemons/master-league-all.service";
import {GreatLeagueAllService} from "../Pokemons/great-league-all.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{


  leaguePokemon = [];

  pokemonGen1 = []; // -

  button1clicked= false;
  button2clicked= false;

  pokemon1Selected = 'My Pokemon';
  pokemon2Selected = 'Oponent Pokemon';
  pokemon1WasSelected = false;
  pokemon2WasSelected = false;


  pokemonNumber;
  pokemonNumber2;


  pokemon2Stab= 1;

  effectFaceOff1;
  effectFaceOff2;
  moveEff1;
  moveEff2;
  moveEffTotal;

  moveDamage;

  allMovesDamageArray = [];
  pokemonHPbyMoveArray = [];

  pokemonHPShow = [];

  pokemonHPafterDamage;
  pokemonHPProgressBarPercentage;
  pokemonHPProgressBarPercentageArray = [];

  tankItAwnserArray= [];

  tankItColor;

  width = 50;








  texto1 = 1;





  teste400;


olaola;






  constructor(private gen1: GenIService, private moves: MovesService, private moveData : MoveDataClass,private moveeff: MoveEff,private ultraLeagueAll: UltraLeagueAllService, private masterLeagueAll: MasterLeagueAllService,private greatLeagueAll:GreatLeagueAllService) {}


  ngOnInit(): void {
    this.pokemonGen1 = this.gen1.pokemonsgenIV;
  }


  checkIfTwoPokemonsSelected(){
    if(this.pokemon1WasSelected===true && this.pokemon2WasSelected===true){
      console.log("2 Pokemon Selected");
      this.createLifeArray();
    }
  }

  buttonOneSelected() {
    this.button1clicked= true;
    this.button2clicked=false;
    console.log("Button1");
  }

  buttonTwoSelected() {
    this.button1clicked= false;
    this.button2clicked=true;
    console.log("Button2");
  }

  createLifeArray(){


    for(let move of this.leaguePokemon[this.pokemonNumber2].moves){
      this.pokemonHPbyMoveArray.push(1);
      this.pokemonHPShow.push(this.leaguePokemon[this.pokemonNumber].hp);
      console.log("Pokemon 1 HP 0-1 Array: ",this.pokemonHPbyMoveArray);
      console.log("Pokemon 1 HP Array: ",this.pokemonHPShow);
    }
  }

  seeMatchTypeMovePokemon(move){
   if (move.type === this.leaguePokemon[this.pokemonNumber2].type){
     this.pokemon2Stab = 1.2;
     console.log("Pokemon 1 stab: ",this.pokemon2Stab);
   }
    if (move.type === this.leaguePokemon[this.pokemonNumber2].type2){
      this.pokemon2Stab = 1.2;
      console.log("Pokemon 2 stab: ",this.pokemon2Stab);
    }
  }

  seeMoveTypeEffectivess(move){
    this.effectFaceOff1 = move.type + this.leaguePokemon[this.pokemonNumber].type;
    this.effectFaceOff2 = move.type + this.leaguePokemon[this.pokemonNumber].type2;
    this.moveEff1 = this.moveeff.checkEffect(this.effectFaceOff1,this.moveEff1);
    this.moveEff2 = this.moveeff.checkEffect2(this.effectFaceOff2,this.moveEff2);
    this.moveEffTotal = this.moveEff1 * this.moveEff2;
    console.log("Pokemon 2 Move Efectivess: ",this.moveEffTotal);
  }

  afterDamage(){
    this.pokemonHPafterDamage = this.leaguePokemon[this.pokemonNumber].hp - this.moveDamage;
    if( this.pokemonHPafterDamage<0) {
      this.pokemonHPProgressBarPercentageArray.push(1);
    }
    else {
      this.pokemonHPProgressBarPercentage = (100 * this.pokemonHPafterDamage) / this.leaguePokemon[this.pokemonNumber].hp;
      this.pokemonHPProgressBarPercentage = 100- this.pokemonHPProgressBarPercentage;
      this.pokemonHPProgressBarPercentage = (1*this.pokemonHPProgressBarPercentage) / 100;
      this.pokemonHPProgressBarPercentageArray.push(this.pokemonHPProgressBarPercentage);
    }
  }

  calculateMoveDamage(move){
    this.moveDamage =   Math.floor(move.power * this.pokemon2Stab * ( this.leaguePokemon[this.pokemonNumber2].atk / this.leaguePokemon[this.pokemonNumber].def) * this.moveEffTotal * 0.5 * 1.3) + 1;
    this.allMovesDamageArray.push(this.moveDamage);
  }

  combineArraysOfProgressBar() {
    for (var i = 0; i<= this.pokemonHPProgressBarPercentageArray.length -1; i++  ){
      this.pokemonHPbyMoveArray[i] = (this.pokemonHPbyMoveArray[i]-this.pokemonHPProgressBarPercentageArray[i]);
    }
  }


  subtractDamageOnLife(){
    for (var i = 0; i<= this.allMovesDamageArray.length -1; i++  ){
      this.pokemonHPShow[i] = (this.pokemonHPShow[i]-this.allMovesDamageArray[i]);
      if (this.pokemonHPShow[i] <0){
        this.pokemonHPShow[i] = 0;
      }
    }
  }

  seeIfPokemonTanks(){
    for (let hp of this.pokemonHPbyMoveArray){
      if( hp >= 0.6) {
        this.tankItAwnserArray.push('YES!');
        this.tankItColor='green';
      }

      if (hp >= 0.3 && hp < 0.6){
        this.tankItAwnserArray.push('Optional');
        this.tankItColor=  '#ff9900';
      }
      if ( hp < 0.3){
        this.tankItAwnserArray.push('NO!');
        this.tankItColor=  'red';
      }
    }
  }

  calculate(){
    for ( let value of this.leaguePokemon[this.pokemonNumber2].moves) {
      for (let value1 of this.moves.moves) {
        if (value === value1.name){
          this.seeMatchTypeMovePokemon(value1);
          this.seeMoveTypeEffectivess(value1);
          this.calculateMoveDamage(value1);
          this.afterDamage();
        }
      }
    }
    this.combineArraysOfProgressBar();
    this.seeIfPokemonTanks();
    this.subtractDamageOnLife();
    }


    changeLeague(league){
    if (league === "GlAllPokemon"){
      this.leaguePokemon = this.greatLeagueAll.greatLeaguePokemonArray;
      console.log("Great League Selected");
    }
      if (league === "UlAllPokemon"){
        this.leaguePokemon = this.ultraLeagueAll.ultraLeaguePokemonArray;
        console.log("Ultra League Selected");
      }
      if (league === "MLAllPokemon"){
       // this.leaguePokemon = this.masterLeagueAll;
        console.log("Master League Selected");
      }
    }
  }




