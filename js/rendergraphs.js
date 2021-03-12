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

  var select = dc.selectMenu('#select-pokemon')

  select
    .title(d => d.key)
    .dimension(dim)
    .group(group);
}

function show_numselected(i){
  var total = i.groupAll('#');
  var numberDis = dc.numberDisplay("#number-selected")

  numberDis
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d) {
        return (+d);})
    .group(total);
}

function pokemonBST(i){
  var statDim = i.dimension(dc.pluck('Total'));
  var statGroup = statDim.group().reduceCount();
  var bst = dc.barChart('#BST-chart')

  bst
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
  var hpD = dc.numberDisplay("#HP")

  hpD
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(hp)
    .formatNumber(d3.format(".3s"));
}

function showAttack(i){
  var atk = i.groupAll().reduceSum(dc.pluck("Attack"));
  var atkD = dc.numberDisplay("#Atk")

  atkD
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(atk)
    .formatNumber(d3.format(".3s"));
}

function showDefense(i){
  var def = i.groupAll().reduceSum(dc.pluck("Defense"));
  var defD = dc.numberDisplay("#Def")

  defD
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(def)
    .formatNumber(d3.format(".3s"));
}

function showSpAtk(i){
  var spatk = i.groupAll().reduceSum(dc.pluck("Sp..Atk"));
  var spatkD = dc.numberDisplay("#SpAtk")

  spatkD
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(spatk)
    .formatNumber(d3.format(".3s"));
}

function showSpDef(i){
  var spdef = i.groupAll().reduceSum(dc.pluck("Sp..Def"));
  var spddefD = dc.numberDisplay("#SpDef")

  spddefD
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(spdef)
    .formatNumber(d3.format(".3s"));
}

function showSpd(i){
  var spd = i.groupAll().reduceSum(dc.pluck("Speed"));
  var spdD = dc.numberDisplay("#Spd")

  spdD
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
      return d;
    })
    .group(spd)
    .formatNumber(d3.format(".3s"));
}

function showTotal(i){
  var tot = i.groupAll().reduceSum(dc.pluck("Total"));
  var totD = dc.numberDisplay("#Total")

  totD
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
  var type1D = dc.rowChart('#Type-chart')

  type1D
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
  var type2D = dc.rowChart('#Type2-chart')

  type2D
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
  var genD = dc.pieChart('#generation')

  genD
    .height(400)
    .radius(125)
    .minAngleForLabel(0.1)
    .externalLabels(35)
    .drawPaths(true)
    .on('pretransition', function(chart){
      chart.selectAll('text.pie-slice').text(function(d){
        if(((d.endAngle - d.startAngle) / (2*Math.PI) * 100) > 0){
          return 'Generation ' + d.data.key + ': ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        }
        else{
          return;
        }
      })})
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .dimension(genDim)
    .group(genGroup);
}

function show_legendary(i){
  var legDim = i.dimension(dc.pluck('Legendary'));
  var legGroup = legDim.group();
  var legD = dc.pieChart('#legendary')

  legD
    .height(400)
    .radius(120)
    .on('pretransition', function(chart){
      chart.selectAll('text.pie-slice').text(function(d){
        if(((d.endAngle - d.startAngle) / (2*Math.PI) * 100) > 0){
          return d.data.key + ': ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        }
        else{
          return;
        }
      })})
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .externalLabels(35)
    .drawPaths(true)
    .ordinalColors(['#E3242B', 'green'])
    .dimension(legDim)
    .group(legGroup);
}

function show_mega(i){
  var megaDim = i.dimension(dc.pluck('Mega'));
  var megaGroup = megaDim.group();
  var megaD = dc.pieChart('#mega')

  megaD
    .height(400)
    .radius(120)
    .on('pretransition', function(chart){
      chart.selectAll('text.pie-slice').text(function(d){
        if(((d.endAngle - d.startAngle) / (2*Math.PI) * 100) > 0){
          return d.data.key + ': ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        }
        else{
          return;
        }
      })})
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .externalLabels(35)
    .drawPaths(true)
    .ordinalColors(['#E3242B', 'green'])
    .dimension(megaDim)
    .group(megaGroup);
}

function show_tier(i){
  var tierDim = i.dimension(dc.pluck('Tier'));
  var tierGroup = tierDim.group();
  var tierD = dc.pieChart('#tier')

  tierD
    .height(400)
    .radius(125)
    .minAngleForLabel(0.1)
    .externalLabels(45)
    .drawPaths(true)
    .cap(7)
    .on('pretransition', function(chart){
      chart.selectAll('text.pie-slice').text(function(d){
        if(((d.endAngle - d.startAngle) / (2*Math.PI) * 100) > 0){
          return d.data.key + ': ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        }
        else{
          return;
        }
      })})
    .useViewBoxResizing(true)
    .transitionDuration(1000)
    .dimension(tierDim)
    .group(tierGroup);
}
