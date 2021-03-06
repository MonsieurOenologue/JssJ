//Get the clock to work properly
function getTime () {
    var t = Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60);
    var minutes = Math.floor( (t/1000/60) % 60);
    var hours = Math.floor( (t/(1000*60*60) +1) % 24);
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock (id) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock () {
    var t = getTime();

    hoursSpan.innerHTML = ('0'+ t.hours).slice(-2);
    minutesSpan.innerHTML = ('0'+ t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if(t.total<=0){
      clearInterval(timeinterval);
    }
  }
  updateClock(); // run function once at first to avoid delay
  var timeinterval = setInterval(updateClock,1000);
}
initializeClock('temps');


function getWeather(){
    var myWeather = $.simpleWeather({
      location: 'Montpellier, France',
      woeid: '',
      unit: 'c',
    });
    return myWeather.temps;
}

//Function displaying a different background depending on the temperature (may add some conditions)
function displayDependingWeather () {
    var actualWeather = getWeather();

    if(actualWeather < 10) //Add toggle day/night button condition too
    {
        document.getElementById("background-image").style.WebkitFilter = "contrast(60%)";
    }
    else
    {
        document.getElementById("background-image").style.WebkitFilter = "contrast(120%)";
    }
}
displayDependingWeather();


//Function displaying a different background depending on the hour of the day
function displayDayNightBack () {
    var t = getTime().hours;
    if(t < 19)//Add toggle day/night button condition too
    {
        document.getElementById("background-image").style.WebkitFilter = "blur(5px)";
    }
    else
    {
        document.getElementById("background-image").style.WebkitFilter = "blur(2px)";
    }
}
displayDayNightBack();

//Weather management
function displayWeather(){
$(document).ready(function() {
  $.simpleWeather({
    location: 'Montpellier, France',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
 });
}

function getSound() {
    var actualWeather = getWeather();
    var audioSun = new Audio('sun.mp3');
    var audioRain = new Audio('rain.mp3')

    if (actualWeather.currently == "Sunny")
    {
        audioSun.play();
        audioRain.pause()
    }
    else if (actualWeather.currently == "Rain")
    {
        audioRain.play();
        audioSun.pause();
    }
}

//Functions for the buttons to work
$(function(){
  $(".sound").on('click', function() {
    if ($(this).attr("class") == "sound") {
      this.src = this.src.replace("soundoff","soundon");
      getSound();
    } else {
      this.src = this.src.replace("soundon","soundoff");
      Audio.pause();
    }
    $(this).toggleClass("on");
  });
});

$(function(){
  $(".meteo").on('click', function() {
    if ($(this).attr("class") == "meteo") {
      this.src = this.src.replace("rain","sun");
    } else {
      this.src = this.src.replace("sun","rain");
    }
    $(this).toggleClass("on");
  });
});

$(function(){
  $(".nightday").on('click', function() {
    if ($(this).attr("class") == "nightday") {
      this.src = this.src.replace("moon","sun");
    } else {
      this.src = this.src.replace("sun","moon");
    }
    $(this).toggleClass("on");
  });
});
