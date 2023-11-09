window.onload = function() {
    var dateElement = document.getElementById('date');
    var currentDate = new Date();
    var dateString = currentDate.toDateString();
  
    dateElement.textContent = dateString;
  };

