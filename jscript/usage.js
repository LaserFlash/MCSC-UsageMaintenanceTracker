var dbRef = new Firebase("https://u23-breakages.firebaseio.com/");
var usageRef = dbRef.child('usage');

function validationFunction() {
  var number = /[0-9]+/;
  if (!number.test($('#time').val())){
    return false;
  }
  return true;
}

$('.addValue').on("click", function(event) {
  event.preventDefault();
  if (validationFunction()) {
    var boat;
    if (document.getElementById('option-1').checked) {
      boat = document.getElementById('option-1').value;
    }
    if (document.getElementById('option-2').checked) {
      boat = document.getElementById('option-2').value;
    }

    if (document.getElementById('option-3').checked) {
      boat = document.getElementById('option-3').value;
    }

    if (document.getElementById('option-4').checked) {
      boat = document.getElementById('option-4').value;
    }

    usageRef
      .push({
        use: {
          boatID: boat,
          duration: $('#time').val(),
          timestamp: new Date().getTime(),
        }
      })
    usageForm.reset();

    var snackbarContainer = document.querySelector('#toast');
    var data = {
      message: 'Usage Submited'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  } else {
    alert('Please fill in required fields');
  }
});
