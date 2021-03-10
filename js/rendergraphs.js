queue()
  .defer(d3.csv, "data/smogon.csv")
  .await(makeGraphs);

function makeGraphs(error, data){
  var i = crossfilter(data);
  pokemon_selector(i);
  show_numselected(i);
  pokemonBST(i);
  showHP(i);
  showAttack(i);
  showDefense(i);
  showSpAtk(i);
  showSpDef(i);
  showSpd(i);
  showTotal(i);
  pokemonType(i);
  pokemon2ndType(i);
  show_gen(i);
  show_legendary(i);
  show_mega(i);
  show_tier(i);

  dc.renderAll();
}

function pokemon_selector(i){
  var dim = i.dimension(dc.pluck('Name'));
  var group = dim.group();

  dc.selectMenu('#select-pokemon')
    .title(d => d.key)
    .dimension(dim)
    .group(group);
}

function show_numselected(i){
  var total = i.groupAll('#');
  dc.numberDisplay("#number-selected")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d) {
        return (+d);})
    .group(total);
}

function pokemonBST(i){
  var statDim = i.dimension(dc.pluck('Total'));
  var statGroup = statDim.group().reduceCount();
  dc.barChart('#BST-chart')
    .width(768)
    .height(250)
    .x(d3.scale.linear().domain([200,800]))
    .xAxisLabel('Base Stat Total')
    .yAxisLabel('Number of Pokemon')
    .useViewBoxResizing(true)
    .transitionDuration(500)
    .elasticY(true)
    .dimension(statDim)
    .group(statGroup);
}


function showHP(i){
  var hp = i.groupAll().reduceSum(dc.pluck("HP"));
  dc.numberDisplay("#HP")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(hp)
    .formatNumber(d3.format(".3s"));
}

function showAttack(i){
  var atk = i.groupAll().reduceSum(dc.pluck("Attack"));
  dc.numberDisplay("#Atk")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(atk)
    .formatNumber(d3.format(".3s"));
}

function showDefense(i){
  var def = i.groupAll().reduceSum(dc.pluck("Defense"));
  dc.numberDisplay("#Def")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(def)
    .formatNumber(d3.format(".3s"));
}

function showSpAtk(i){
  var spatk = i.groupAll().reduceSum(dc.pluck("Sp..Atk"));
  dc.numberDisplay("#SpAtk")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(spatk)
    .formatNumber(d3.format(".3s"));
}

function showSpDef(i){
  var spdef = i.groupAll().reduceSum(dc.pluck("Sp..Def"));
  dc.numberDisplay("#SpDef")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(spdef)
    .formatNumber(d3.format(".3s"));
}

function showSpd(i){
  var spd = i.groupAll().reduceSum(dc.pluck("Speed"));
  dc.numberDisplay("#Spd")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(spd)
    .formatNumber(d3.format(".3s"));
}

function showTotal(i){
  var tot = i.groupAll().reduceSum(dc.pluck("Total"));
  dc.numberDisplay("#Total")
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(tot)
    .formatNumber(d3.format(".3s"));
}

function pokemonType(i){
  var typeDim = i.dimension(dc.pluck('Type.1'));
  var typeGroup = typeDim.group().reduceCount();
  dc.rowChart('#Type-chart')
    .width(900)
    .height(500)
    .elasticX(true)
    .renderTitleLabel(true)
    .dimension(typeDim)
    .group(typeGroup)
    .useViewBoxResizing(true)
    .transitionDuration(500);
}

function pokemon2ndType(i){
  var type2Dim = i.dimension(dc.pluck('Type.2'));
  var type2Group = type2Dim.group().reduceCount();
  dc.rowChart('#Type2-chart')
    .width(900)
    .height(500)
    .elasticX(true)
    .renderTitleLabel(true)
    .dimension(type2Dim)
    .group(type2Group)
    .useViewBoxResizing(true)
    .transitionDuration(500);
}

function show_gen(i){
  var genDim = i.dimension(dc.pluck('Generation'));
  var genGroup = genDim.group();
  dc.pieChart('#generation')
    .height(300)
    .radius(90)
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .dimension(genDim)
    .group(genGroup);
}

function show_legendary(i){
  var legDim = i.dimension(dc.pluck('Legendary'));
  var legGroup = legDim.group();
  dc.pieChart('#legendary')
    .height(300)
    .radius(90)
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .externalLabels(20)
    .drawPaths(true)
    .ordinalColors(['#E3242B', 'green'])
    .dimension(legDim)
    .group(legGroup);
}

function show_mega(i){
  var megaDim = i.dimension(dc.pluck('Mega'));
  var megaGroup = megaDim.group();
  dc.pieChart('#mega')
    .height(300)
    .radius(90)
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .externalLabels(20)
    .drawPaths(true)
    .ordinalColors(['#E3242B', 'green'])
    .dimension(megaDim)
    .group(megaGroup);
}

function show_tier(i){
  var tierDim = i.dimension(dc.pluck('Tier'));
  var tierGroup = tierDim.group();
  dc.pieChart('#tier')
    .height(300)
    .radius(90)
    .minAngleForLabel(0.01)
    .externalLabels(15)
    .drawPaths(true)
    .cap(7)
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .dimension(tierDim)
    .group(tierGroup);
}
