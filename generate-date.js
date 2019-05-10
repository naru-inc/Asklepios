function randomDate() {
    end =new Date();
    start = end.setDate(d.getDate() - 1);

    startHour=0;
    endHour=23;
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  console.log(date);
  return date;
}

var d = new Date();
var date1= d.setDate(d.getDate() - 1);

randomDate(date1,d,0,23);