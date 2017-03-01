/**
 * Created by Błażej Dyrda on 12.02.2017.
 */

function drag(e) {
    e.dataTransfer.setData("Text",e.target.id);
}

function drop(e) {
    e.preventDefault();
    dragItem = e.dataTransfer.getData("Text");
    //e.target.textContent = document.getElementById(dragItem).textContent;
    e.target.appendChild(document.getElementById(dragItem));
}

function allowDrop(e) {
    e.preventDefault();
}

function zbudujPlansze(){
    var pole = "";

    for(i=0;i<225;i++){
    pole = pole + '<div class="poleplanszy" id="pol'+i+'" ondragover="allowDrop(event)" ondrop="drop(event)"></div>';
    if((i+1)%15==0) pole = pole + '<div style="clear:both;"></div>';
}

document.getElementById("plansza").innerHTML = pole;

    dodajLiteryGracza();
}

function losujLitery(){
   var litery = [];
   litery[0]="A";
   litery[1]="Ą";
   litery[2]="B";
   litery[3]="C";
   litery[4]="Ć";
   litery[5]="D";
   litery[6]="E";
   litery[7]="Ę";
   litery[8]="F";
   litery[9]="G";
   litery[10]="H";
   litery[11]="I";
   litery[12]="J";
   litery[13]="K";
   litery[14]="L";
   litery[15]="Ł";
   litery[16]="M";
   litery[17]="N";
   litery[18]="Ń";
   litery[19]="O";
   litery[20]="Ó";
   litery[21]="P";
   litery[22]="R";
   litery[23]="S";
   litery[24]="Ś";
   litery[25]="T";
   litery[26]="U";
   litery[27]="W";
   litery[28]="Y";
   litery[29]="Z";
   litery[30]="Ź";
   litery[31]="Ż";
   
   return litery[Math.floor((Math.random()*31))];
   
}

function dodajLiteryGracza() {
    var pole=""

    for(i=0;i<7;i++){
        pole = pole + '<div class="poleLiter" id="poll'+i+'" draggable="true" ondragstart="drag(event)">'+losujLitery()+'</div>';
    }

    document.getElementById("literyGracza").innerHTML = pole;
}

var slowaDoWyslania =[];
function wyslijSlowa() {
    var slowaPoziome = [];
    var slowaPionowe = [];
    var linia =0;

    slowaPoziome[0]="";
    slowaPionowe[0]="";
    var pusty =0;
    for(i=0;i<225;i++){
        var node = document.getElementById('pol' + i);
        pusty = 0;
        if(i%15==0){
            linia++;
            slowaPoziome[linia]="";
        }
        if(node.textContent !=0){
            slowaPoziome[linia] = slowaPoziome[linia] + node.textContent;
            pusty = 1;
        }
        if(pusty==0){
            linia++;
            slowaPoziome[linia]="";
        }

    }
    linia=0;
    for(i=0;i<15;i++) {
        for (j = i; j < 225; j = j+15) {
            pusty=0;
            var node = document.getElementById('pol' + j);
            if (node.textContent != 0) {
                slowaPionowe[linia] = slowaPionowe[linia] + node.textContent;
                pusty =1;
            }
            if(pusty==0){
                linia++;
            slowaPionowe[linia] = "";
            }

        }
        linia++;
            slowaPionowe[linia] = "";
    }
    for(i=0;i<slowaPoziome.length;i++){
        if(slowaPoziome[i].length >1){
            slowaDoWyslania.push(slowaPoziome[i]);
        }
    }
    for(i=0;i<slowaPionowe.length;i++){
        if(slowaPionowe[i].length >1){
            slowaDoWyslania.push(slowaPionowe[i]);
        }
    }
}

$("#Wysylacz").on('click',function(){
    
    $.ajax({
    url: "/Scrabble/webresources/slownik",
    type: "POST",
    data: JSON.stringify(slowaDoWyslania),
    contentType: "application/json",
        success: function () {
            console.log("awesome");
            alert(slowaDoWyslania);
            slowaDoWyslania = [];
        },
        complete: function () {
            console.log("odczyt skonczony")
        }
            
   })
})