/**
*   Create firebase reference
**/
var dbRef = new Firebase("https://u23-breakages.firebaseio.com/");
var issueRef = dbRef.child('issues');

var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
  console.log("register dialog");
}

/**
*   Keep the 3 displayed breakages upto date
**/
issueRef.limitToLast(3).on("value", function(snapshot) {
  updateThreeBreakages(snapshot);
});


/**
*   Prevent enter key from submitting form with out all fields filled in
**/
$(document).ready(function() {
    $(window).keydown(function(event) {
        if ((event.keyCode == 13) && (validationFunction() == false)) {
            event.preventDefault();
            return false;
        }
    });
});
function validationFunction() {
    if ($('#name').val() == '') {
        return false;
    }
    if ($('#email').val() == '') {
        return false;
    }
    if ($('#boatID').val() == '') {
        return false;
    }
    if ($('#category').val() == '') {
        return false;
    }
    if ($('#details').val() == '') {
        return false;
    }
    return true;

}

//add breakage
$('.addValue').on("click", function(event) {
    event.preventDefault();
    if ($('#name').val() != '' && $('#email').val() != '') {
        issueRef
            .push({
                breakage: {
                    boatID: $('#boatID').val(),
                    name: $('#name').val(),
                    email: $('#email').val(),
                    category: $('#category').val(),
                    details: $('#details').val(),
                    timestamp: new Date().getTime(),
                }
            })
        breakageForm.reset();

        var snackbarContainer = document.querySelector('#toast');
        var data = {
            message: 'Breakage Submited'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);

    } else {
        alert('Please fill in at least name or email!');
    }
});

/**
*   Remove a breakage
*   Intended use is for removing a breakage that was submitted incorrectly
**/
$('#breakages').on("click", '.removeBreakage', function(event) {

    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

    dialog.querySelector('.remove').addEventListener('click', function() {
        issueRef.child(event.target.id).remove();
        dialog.close();
        console.log("Remove " + event.target.id + " from database");
    });

});

/**
*   Create a card to display breakage
**/
function breakageHtmlFromObject(data) {
    var html = '';
    var issue = data.val();
    var key = data.key();
    var date = new Date(issue.breakage.timestamp);

    html += '<div class= "breakages-added mdl-card mdl-cell mdl-shadow--4dp mdl-cell--12-col-phone mdl-cell--12-col-tablet mdl-cell--12-col-desktop">';
    html += '<div class= "breakage-card mdl-card__title mdl-card--expand mdl-color--blue">' + '<h2 class="mdl-card__title-text">' + "Boat " + issue.breakage.boatID + '</h2>' + '</div>';
    html += '<div class="mdl-card__supporting-text mdl-color-text--grey-600">' +
        "Category: " + issue.breakage.category +
        '</br>' +
        "Breakage Details: " + issue.breakage.details.substr(0, 100) +
        '<br />' +
        "Reported by: " + issue.breakage.name +
        '<br />' +
        "Date Reported: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
        '<br />' +
        '<br />' +
        '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent removeBreakage" id=' + key + '>Remove</button>' +
        '</div>';
    html += '</div>';
    html += '<div class="separator"></div>';
    console.log(issue);
    $('#breakages').append(html);
}

function updateThreeBreakages(snap) {
    $('.breakages-added').remove();
    $('.separator').remove();

    snap.forEach(function(childSnap){
        breakageHtmlFromObject(childSnap);
    });
}
