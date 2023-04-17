let cnv;
let highlights;
let numRows;
let numCols;
let sidebar; //left hand side bar with info
let contentWidth; //width of area that contains pillars
let contentHeight;
let cnvPadding; //canvas padding
let wpadding; //padding between pillars
let headerHeight;
let numPillars;
let linePadding;
let lineSpace;
let lineHeight;
let centerX; //senter of content area
let centerX1; //center of first pillar
let centerY;
let pillarWidth;
let pillarHeight;
let dusp;
let aeroastro;
let not_reported;
let ua;
let sloan;
let media_lab;
let pillarTop;
let pillar1Left;
let pillar2Left;
let pillar3Left;
let pillar4Left;
let pillar5Left;
let pillar6Left;
let highlightMinWidth;
let checkCelebrated;
let checkFriction;
let checkChange;
let checkFuture;
let values = [
  "community trends",
  "institutions",
  "public health",
  "safety",
  "infrastructure",
  "housing",
  "community life",
  "education",
  "economic opportunity",
  "inequality",
];
let neighborhoods = [
  "allston",
  "back bay",
  "bay village",
  "beacon hill",
  "brighton",
  "chinatown-leather district",
  "dorchester",
  "downtown",
  "east boston",
  "fenway-kenmore",
  "hyde park",
  "jamaica plain",
  "mattapan",
  "mid-dorchester",
  "mission hill",
  "north end",
  "outside of boston",
  "prefer not to say",
  "roslindale",
  "roxbury",
  "south boston",
  "south end",
  "west end",
  "west roxbury",
];
let rectangles = [];
let totalRectangles = 0;
let audioFiles = [];
let spaceRemaining = 0;
let highlightWidth = 0;
let currentSound;
let ccc_ml_logo;
let sumPillarH;
let sumPillarH2;
let sumPillarH3;
let sumPillarH4;
let sumPillarH5;
let sumPillarH6;
let sumPillarH7;
let sumPillarH8;
let sumPillarH9;
let sumPillarH10;

/*
to do
1. clean up function where bars are drawn v1-6
2. find bug in bars drawing function
3. make a logic for when an object has multiple rects (make arrays for the split rect)
4. load sound in object
5. handle sound interaction

6. add a bar to multiple keywords
7. draw only bars in draw()

*/

function preload() {
  highlights = loadTable(
    "RTFC_highlight_out_2023-04-03 00:14:49.017537.csv",
    "csv",
    "header"
  );
  ccc_ml_logo = loadImage("CCC_ML_Logo.svg");
}

function setup() {
  numHighlights = highlights.getRowCount();

  //createCanvas(windowWidth, windowWidth*10);
  cnv = createCanvas(windowWidth*1.5, windowHeight * 3);

  cnvPadding = 25; //canvas padding
  sidebar = 300; //left hand side bar with info
  contentWidth = width - 3 * cnvPadding - sidebar; //width of area that contains pillars
  contentHeight = height - 2 * cnvPadding;
  wpadding = 1.5 * cnvPadding; //padding between pillars
  numPillars = values.length; //number of thematic codes
  headerHeight = 100;
  headerPadding = 20;
  linePadding = 2;
  lineSpace = 3;
  lineHeight = 5;
  pillarWidth = (contentWidth + wpadding) / numPillars - wpadding;
  pillarHeight = contentHeight - headerHeight;
  //centerX1 = contentX + pillarWidth/2;
  //centerX = contentWidth/2;
  //centerY = height / 2;
  //centerY = pillarHeight/2 +cnvPadding+headerHeight;
  pillarTop = headerHeight;

  //TODO to clean create an array of pillar coordinates, loop to populate
  pillar1Left = 2 * cnvPadding + sidebar;
  pillar2Left = pillar1Left + pillarWidth + wpadding;
  pillar3Left = pillar1Left + 2 * (pillarWidth + wpadding);
  pillar4Left = pillar1Left + 3 * (pillarWidth + wpadding);
  pillar5Left = pillar1Left + 4 * (pillarWidth + wpadding);
  pillar6Left = pillar1Left + 5 * (pillarWidth + wpadding);
  pillar7Left = pillar1Left + 6 * (pillarWidth + wpadding);
  pillar8Left = pillar1Left + 7 * (pillarWidth + wpadding);
  pillar9Left = pillar1Left + 8 * (pillarWidth + wpadding);
  pillar10Left = pillar1Left + 9 * (pillarWidth + wpadding);

  highlightMinWidth = 10;
  // maxPillarHeight = (lineHeight + linePadding)*numHighlights;
  // canvasHeight = maxPillarHeight*1.5;

  //key

  allston = color("#bedb39");
  back_bay = color("#CCCC27");
  bay_village = color("#DBA507");
  beacon_hill = color("#A04A88");
  brighton = color("#9C63FF");
  chinatown_leather_district = color("#3E2599");
  dorchester = color("#3F798E");
  downtown = color("#253D4A");
  east_boston = color("#07485B");
  fenway_kenmore = color("#0D6986");
  hyde_park = color("#57BDC7");
  jamaica_plain = color("#2BAF98");
  mattapan = color("#00796B");
  mid_dorchester = color("#1D4F35"); //change
  mission_hill = color("#168039");
  north_end = color("#518E44");
  outside_of_boston = color("#9DAF5B");
  roslindale = color("#E3E268");
  roxbury = color("#F9D885");
  south_boston = color("#FCD949");
  south_end = color("#FFBB00");
  west_end = color("#FF703E");
  west_roxbury = color("#DF4600");
  prefer_not_to_say = color("#5B5B5B");
  location_not_tagged = color("#ACACAC");

  setupDesign();
  setupPillars();
  displayPillars();
}

function draw() {
  updateDesign();
  displayPillars();
}

function setupPillars() {
  numHighlights = highlights.getRowCount();

  //storage for each pillar's previous rect
  p1Prev = createVector(pillar1Left, pillarTop);
  p1PrevW = highlightMinWidth;
  hasPrev1 = false;

  p2Prev = createVector(pillar2Left, pillarTop);
  p2PrevW = highlightMinWidth;
  hasPrev2 = false;
  p3Prev = createVector(pillar3Left, pillarTop);
  p3PrevW = highlightMinWidth;
  hasPrev3 = false;
  p4Prev = createVector(pillar4Left, pillarTop);
  p4PrevW = highlightMinWidth;
  hasPrev4 = false;
  p5Prev = createVector(pillar5Left, pillarTop);
  p5PrevW = highlightMinWidth;
  hasPrev5 = false;
  p6Prev = createVector(pillar6Left, pillarTop);
  p6PrevW = highlightMinWidth;
  hasPrev6 = false;
  p7Prev = createVector(pillar7Left, pillarTop);
  p7PrevW = highlightMinWidth;
  hasPrev7 = false;
  p8Prev = createVector(pillar8Left, pillarTop);
  p8PrevW = highlightMinWidth;
  hasPrev8 = false;
  p9Prev = createVector(pillar9Left, pillarTop);
  p9PrevW = highlightMinWidth;
  hasPrev9 = false;
  p10Prev = createVector(pillar10Left, pillarTop);
  p10PrevW = highlightMinWidth;
  hasPrev10 = false;

  for (i = 0; i < numHighlights; i++) {
    //width of highlight will always be scale*highlightMinWidth
    scl = highlights.get(i, "highlight_scale");
    scl_adj = scl / 30 > 1 ? scl / 30 : 1;
    highlightWidth = scl_adj * highlightMinWidth;

    //currentSound = audioFiles[i] // add the sound
    //audioFile = loadSound("./assets/audio/" + highlights.getRow(i).getString("highlight_id") + ".mp3")
    //console.log(audioFile.isLoaded)

    let hID = highlights.getRow(i).getString("highlight_id");

    var url =
      "https://app.lvn.org/api/highlights/play/" +
      highlights.getRow(i).getString("highlight_id");
    //console.log(url)
    audioFile = new Audio(url);
    //console.log(audioFile)
    //audioFile.play()
    // playPromise = audio.play();
    // console.log('play')

    transcript = highlights.get(i, "highlight_words");

    theme = highlights
      .get(i, "theme")
      .replace(/\['|'\]|'/g, "")
      .split(", ")[0]; //getting first theme

    neighborhood = highlights.get(i, "neighborhood");
    var unitColor = color(255);
    if (neighborhood == "allston") {
      unitColor = allston;
    } else if (neighborhood == "back bay") {
      unitColor = back_bay;
    } else if (neighborhood == "bay village") {
      unitColor = bay_village;
    } else if (neighborhood == "beacon hill") {
      unitColor = beacon_hill;
    } else if (neighborhood == "brighton") {
      unitColor = brighton;
    } else if (neighborhood == "chinatown-leather district") {
      unitColor = chinatown_leather_district;
    } else if (neighborhood == "dorchester") {
      unitColor = dorchester;
    } else if (neighborhood == "downtown") {
      unitColor = downtown;
    } else if (neighborhood == "east boston") {
      unitColor = east_boston;
    } else if (neighborhood == "fenway-kenmore") {
      unitColor = fenway_kenmore;
    } else if (neighborhood == "hyde park") {
      unitColor = hyde_park;
    } else if (neighborhood == "jamaica plain") {
      unitColor = jamaica_plain;
    } else if (neighborhood == "mattapan") {
      unitColor = mattapan;
    } else if (neighborhood == "mid-dorchester") {
      unitColor = mid_dorchester;
    } else if (neighborhood == "mission hill") {
      unitColor = mission_hill;
    } else if (neighborhood == "media lab") {
      unitColor = media_lab;
    } else if (neighborhood == "north end") {
      unitColor = north_end;
    } else if (
      neighborhood == "outside of boston" ||
      neighborhood == "afueras de boston"
    ) {
      unitColor = outside_of_boston;
    } else if (
      neighborhood == "z_prefer not to say" ||
      neighborhood == "prefiere no responder"
    ) {
      unitColor = prefer_not_to_say;
    } else if (neighborhood == "roslindale") {
      unitColor = roslindale;
    } else if (neighborhood == "roxbury") {
      unitColor = roxbury;
    } else if (neighborhood == "south boston") {
      unitColor = south_boston;
    } else if (neighborhood == "south end") {
      unitColor = south_end;
    } else if (neighborhood == "west end") {
      unitColor = west_end;
    } else if (neighborhood == "west roxbury") {
      unitColor = west_roxbury;
    } else if (neighborhood == "") {
      unitColor = location_not_tagged;
    }

    if (theme == values[0]) {
      let temp = drawBarParts(
        hasPrev1,
        p1Prev,
        p1PrevW,
        pillar1Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev1 = temp[0];
      p1Prev = temp[1];
      p1PrevW = temp[2];
      pillar1Left = temp[3];
      sumPillarH = p1Prev.y + lineHeight;
    } else if (theme == values[1]) {
      let temp = drawBarParts(
        hasPrev2,
        p2Prev,
        p2PrevW,
        pillar2Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev2 = temp[0];
      p2Prev = temp[1];
      p2PrevW = temp[2];
      pillar2Left = temp[3];
      sumPillarH2 = p2Prev.y + lineHeight;
    } else if (theme == values[2]) {
      let temp = drawBarParts(
        hasPrev3,
        p3Prev,
        p3PrevW,
        pillar3Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev3 = temp[0];
      p3Prev = temp[1];
      p3PrevW = temp[2];
      pillar3Left = temp[3];
      sumPillarH3 = p3Prev.y + lineHeight;
    } else if (theme == values[3]) {
      let temp = drawBarParts(
        hasPrev4,
        p4Prev,
        p4PrevW,
        pillar4Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev4 = temp[0];
      p4Prev = temp[1];
      p4PrevW = temp[2];
      pillar4Left = temp[3];
      sumPillarH4 = p4Prev.y + lineHeight;
    } else if (theme == values[4]) {
      let temp = drawBarParts(
        hasPrev5,
        p5Prev,
        p5PrevW,
        pillar5Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev5 = temp[0];
      p5Prev = temp[1];
      p5PrevW = temp[2];
      pillar5Left = temp[3];
      sumPillarH5 = p5Prev.y + lineHeight;
    } else if (theme == values[5]) {
      let temp = drawBarParts(
        hasPrev6,
        p6Prev,
        p6PrevW,
        pillar6Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev6 = temp[0];
      p6Prev = temp[1];
      p6PrevW = temp[2];
      pillar6Left = temp[3];
      sumPillarH6 = p6Prev.y + lineHeight;
    } else if (theme == values[6]) {
      let temp = drawBarParts(
        hasPrev7,
        p7Prev,
        p7PrevW,
        pillar7Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev7 = temp[0];
      p7Prev = temp[1];
      p7PrevW = temp[2];
      pillar7Left = temp[3];
      sumPillarH7 = p7Prev.y + lineHeight;
    } else if (theme == values[7]) {
      let temp = drawBarParts(
        hasPrev8,
        p8Prev,
        p8PrevW,
        pillar8Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev8 = temp[0];
      p8Prev = temp[1];
      p8PrevW = temp[2];
      pillar8Left = temp[3];
      sumPillarH8 = p8Prev.y + lineHeight;
    } else if (theme == values[8]) {
      let temp = drawBarParts(
        hasPrev9,
        p9Prev,
        p9PrevW,
        pillar9Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev9 = temp[0];
      p9Prev = temp[1];
      p9PrevW = temp[2];
      pillar9Left = temp[3];
      sumPillarH9 = p9Prev.y + lineHeight;
    } else if (theme == values[9]) {
      let temp = drawBarParts(
        hasPrev10,
        p10Prev,
        p10PrevW,
        pillar10Left,
        unitColor,
        audioFile,
        transcript,
        hID
      );
      hasPrev10 = temp[0];
      p10Prev = temp[1];
      p10PrevW = temp[2];
      pillar10Left = temp[3];
      sumPillarH10 = p10Prev.y + lineHeight;
    }
  }
}

function drawBarParts(
  hasPrev,
  pPrev,
  pPrevW,
  pillarLeft,
  col,
  currentSound,
  transcript,
  hID
) {
  // If it has a previous
  if (hasPrev) {
    pPrev.x += pPrevW + lineSpace; // Update the x pos
    spaceRemaining = pillarWidth - (pPrev.x - pillarLeft); // Calculate remaining space

    if (highlightWidth > spaceRemaining) {
      v = splitHighlight(
        pPrev.x,
        pPrev.y,
        pillarLeft,
        spaceRemaining,
        col,
        highlightWidth,
        currentSound,
        transcript,
        hID
      );

      pPrev = createVector(v.x, v.y);
      pPrevW = v.z;
    } else {
      highlightRect(
        pPrev.x,
        pPrev.y,
        highlightWidth,
        col,
        currentSound,
        transcript,
        hID
      );
      pPrevW = highlightWidth;
    }
  } else if (highlightWidth > pillarWidth) {
    v = splitHighlight(
      pillarLeft,
      pillarTop,
      pillarLeft,
      pillarWidth,
      col,
      highlightWidth,
      currentSound,
      transcript,
      hID
    );

    pPrev = createVector(v.x, v.y);
    pPrevW = v.z;
    hasPrev = true;
  } else {
    highlightRect(
      pillarLeft,
      pillarTop,
      highlightWidth,
      col,
      currentSound,
      transcript,
      hID
    );
    hasPrev = true;
    pPrevW = highlightWidth;
  }

  return [hasPrev, pPrev, pPrevW, pillarLeft];
}

function displayPillars() {
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].display();
    rectangles[i].detect(mouseX, mouseY);
    //rectangles[i].playAudio();
    rectangles[i].displayTranscript();
  }
}

function highlightRect(x, y, w, color, sound, transcript, hID) {
  // fill(red(color), green(color), blue(color), 50);
  // rectMode(CORNER);
  // rect(x, y, w, lineHeight);

  let r = new hRect([x], [y], [w], color, sound, transcript, hID);
  rectangles[totalRectangles] = r;
  totalRectangles++;
}

function splitHighlight(
  prevX,
  prevY,
  pillarLeft,
  spaceRemaining,
  color,
  highlightWidth,
  sound,
  transcript,
  hID
) {
  let Xs = [];
  let Ys = [];
  let Ws = [];

  // highlightRect(prevX, prevY, spaceRemaining, color);

  Xs[Xs.length] = prevX;
  Ys[Ys.length] = prevY;
  Ws[Ws.length] = spaceRemaining;
  highlightWidth -= spaceRemaining;

  while (highlightWidth - lineSpace > pillarWidth) {
    prevX = pillarLeft;
    prevY += lineHeight + linePadding;

    // highlightRect(prevX, prevY, pillarWidth, color);
    Xs[Xs.length] = prevX;
    Ys[Ys.length] = prevY;
    Ws[Ws.length] = pillarWidth;
    highlightWidth -= pillarWidth;
  }

  if (highlightWidth > 0) {
    prevX = pillarLeft;
    prevY += lineHeight + linePadding;
    // highlightRect(prevX, prevY, highlightWidth, color);
    Xs[Xs.length] = prevX;
    Ys[Ys.length] = prevY;
    Ws[Ws.length] = highlightWidth;
  }

  let r = new hRect(Xs, Ys, Ws, color, sound, transcript, hID);
  rectangles[totalRectangles] = r;
  totalRectangles++;

  return createVector(prevX, prevY, highlightWidth);
}

class hRect {
  constructor(x, y, w, color, audio, transcript, hID) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = color;
    this.audio = audio;
    this.hover = false;
    this.click = false;
    this.transcript = transcript;
    this.id = hID;
  }

  display() {
    for (let i = 0; i < this.x.length; i++) {
      //fill(this.color);
      if (this.hover) {
        fill(this.color);
      } else {
        fill(red(this.color), green(this.color), blue(this.color), 150);
      }
      rectMode(CORNER);
      rect(this.x[i], this.y[i], this.w[i], lineHeight);
    }
  }

  detect(detectX, detectY) {
    this.hover = false;

    for (let i = 0; i < this.x.length; i++) {
      if (
        detectX > this.x[i] &&
        detectX <= this.x[i] + this.w[i] + lineSpace &&
        detectY > this.y[i] &&
        detectY <= this.y[i] + lineHeight + linePadding
      ) {
        this.hover = true;
      }
    }
  }

  playAudio() {
    if (this.hover) {
      if (this.audio.readyState != 4) {
        this.audio.load();
        this.audio.play();
      } else {
        this.audio.play();
      }
    } else {
      //if (this.audio != undefined) {
      this.audio.pause();
      // }
    }
  }

  displayTranscript() {
    // let div = createElement('div','');
    // let transcriptX = this.x;
    if (this.hover) {
      //       rectMode(CORNER)
      //       fill(255)
      //       transcriptX = this.x[0];
      //       if(this.x[0] < pillar2Left){
      //         transcriptX = pillar2Left;
      //       } else if(this.x[0] < pillar3Left){
      //         transcriptX = pillar3Left;
      //       } else if (this.x[0] < pillar4Left) {
      //         transcriptX = pillar4Left;
      //       } else if (this.x[0] < pillar5Left) {
      //         transcriptX = pillar5Left;
      //       } else if (this.x[0] < pillar6Left) {
      //         transcriptX = pillar6Left;
      //       } else if (this.x[0] < pillar7Left) {
      //         transcriptX = pillar7Left;
      //       } else if (this.x[0] < pillar8Left) {
      //         transcriptX = pillar8Left;
      //       } else if (this.x[0] < pillar9Left) {
      //         transcriptX = pillar7Left;
      //       } else if (this.x[0] < pillar10Left) {
      //         transcriptX = pillar8Left;
      //       }
      // div.position(transcriptX,this.y[0]);
      // div.style('padding', '10px');
      // div.style('background-color', 'white');
      // div.html('<iframe src="https://embed.lvn.org/?hid=' + this.id + ' width="100%" height="425" scrolling="no" frameborder="no" style="max-width: 850px; margin: 0 auto; display: block"></iframe>');
    } else {
      //div.html('');
    }
  }
}

class summaryRect {
  constructor(
    x,
    y,
    themeHeight,
    numHighlights,
    duration /*,audio, transcript*/
  ) {
    this.x = x;
    this.y = y;
    this.h = themeHeight;
    this.num = numHighlights;
    this.dur = duration;
  }

  display() {
    for (let i = 0; i < this.x.length; i++) {
      if (this.hover) {
        fill(this.color);
      } else {
        fill(red(this.color), green(this.color), blue(this.color), 150);
      }
      push();
      fill("#00A679");
      rectMode(CORNER);
      rect(this.x[i], this.y[i], pillarWidth, this.h);
      pop();

      push();
      fill("#FDF8F3");
      rectMode(CORNER);
      textWrap(WORD);
      textStyle(BOLD);
      textSize(24);
      //tectAlign(); //so can right justify
      text(this.duration, this.x, this.y);
      pop();
    }
  }

  hide() {
    //
  }
}

function setupDesign() {
  background("#FDF8F3");

  push();
  fill(255);
  rectMode(CORNER);
  fill(0);
  textWrap(WORD);
  textStyle(BOLD);
  textSize(60);
  textLeading(48);
  text("Real Talk For Change Boston", cnvPadding, cnvPadding, sidebar);
  pop();

  push();
  rectMode(CORNER);
  image(ccc_ml_logo, cnvPadding, height - 5 * cnvPadding);
  pop();

  rectMode(CORNER);
  fill(0);
  textWrap(WORD);

  push();
  textStyle(BOLD);
  textSize(24);
  for (i = 0; i < values.length; i++) {
    text(
      values[i],
      pillar1Left + i * (pillarWidth + wpadding),
      cnvPadding,
      pillarWidth
    );
  }
  pop();

  //key
  push();
  noStroke();
  textSize(16);
  textLeading(14);
  for (i = 0; i < neighborhoods.length; i++) {
    //if (i <= neighborhoods.length / 2 + 1) {
    //col 1
    push();
    text(
      neighborhoods[i],
      cnvPadding,
      sidebar + i * (20 + cnvPadding),
      pillarWidth
    );
    push();
    if (neighborhoods[i] == "allston") {
      fill(allston);
    } else if (neighborhoods[i] == "back bay") {
      fill(back_bay);
    } else if (neighborhoods[i] == "bay village") {
      fill(bay_village);
    } else if (neighborhoods[i] == "beacon hill") {
      fill(beacon_hill);
    } else if (neighborhoods[i] == "brighton") {
      fill(brighton);
    } else if (neighborhoods[i] == "chinatown-leather district") {
      fill(chinatown_leather_district);
    } else if (neighborhoods[i] == "dorchester") {
      fill(dorchester);
    } else if (neighborhoods[i] == "downtown") {
      fill(downtown);
    } else if (neighborhoods[i] == "east boston") {
      fill(east_boston);
    } else if (neighborhoods[i] == "fenway-kenmore") {
      fill(fenway_kenmore);
    } else if (neighborhoods[i] == "hyde park") {
      fill(hyde_park);
    } else if (neighborhoods[i] == "jamaica plain") {
      fill(jamaica_plain);
    } else if (neighborhoods[i] == "mattapan") {
      fill(mattapan);
    } else if (neighborhoods[i] == "mid-dorchester") {
      fill(mid_dorchester);
    } else if (neighborhoods[i] == "mission hill") {
      fill(mission_hill);
    } else if (neighborhoods[i] == "media lab") {
      fill(media_lab);
    } else if (neighborhoods[i] == "north end") {
      fill(north_end);
    } else if (
      neighborhoods[i] == "outside of boston" ||
      neighborhoods[i] == "afueras de boston"
    ) {
      fill(outside_of_boston);
    } else if (
      neighborhoods[i] == "z_prefer not to say" ||
      neighborhoods[i] == "prefiere no responder"
    ) {
      fill(prefer_not_to_say);
    } else if (neighborhoods[i] == "roslindale") {
      fill(roslindale);
    } else if (neighborhoods[i] == "roxbury") {
      fill(roxbury);
    } else if (neighborhoods[i] == "south boston") {
      fill(south_boston);
    } else if (neighborhoods[i] == "south end") {
      fill(south_end);
    } else if (neighborhoods[i] == "west end") {
      fill(west_end);
    } else if (neighborhoods[i] == "west roxbury") {
      fill(west_roxbury);
    } else if (neighborhoods[i] == "") {
      fill(location_not_tagged);
    }
    rect(
      //1.5 * cnvPadding + pillarWidth,
      250,
      sidebar + i * (20 + cnvPadding),
      20,
      20
    );
    pop();
    pop();
    //}

    // else {
    //   //col 2
    //   push();
    //   text(
    //     neighborhoods[i],
    //     2 * cnvPadding + pillarWidth,
    //     sidebar + (i - (neighborhoods.length / 2 + 2)) * 20,
    //     pillarWidth
    //   );
    //   pop();
    // }
  }
  pop();

  updateDesign();
}

function updateDesign() {
  fill("F3FAFC");
  noStroke();
  rectMode(CORNER);

  for (i = 0; i < values.length; i++) {
    rect(
      pillar1Left + i * (pillarWidth + wpadding),
      headerHeight,
      pillarWidth,
      pillarHeight
    );
  }
}

function mousePressed() {
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].playAudio();
  }
}

// function keyTyped() {
//   if (keyCode === RETURN) {
//     var filepath = `RTMIT Highlights - Values ${year()}-${month()}-${day()}-${hour()}:${minute()}:${second()}`;
//     saveCanvas(filepath, "png");
//   }
// }
